import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { authLimiter, registrationLimiter } from '../middleware/rateLimit.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../services/emailService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Fonction de génération de token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role,
      email: user.email
    }, 
    process.env.JWT_SECRET || 'changeme', 
    { 
      expiresIn: '7d',
      issuer: 'infirmy',
      audience: 'infirmy-users'
    }
  );
};

// Inscription
router.post('/register', 
  registrationLimiter,
  validateRegistration,
  asyncHandler(async (req, res) => {
    const { email, password, role, firstName, lastName, phone } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: 'Un compte avec cet email existe déjà',
        code: 'EMAIL_ALREADY_EXISTS'
      });
    }
    
    // Hasher le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Créer l'utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      phone
    });
    
    // Générer le token
    const token = generateToken(user);
    
    // Envoyer l'email de bienvenue
    try {
      await sendWelcomeEmail(user);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
      // Ne pas bloquer l'inscription si l'email échoue
    }
    
    // Retourner la réponse
    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  })
);

// Connexion
router.post('/login', 
  authLimiter,
  validateLogin,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // Rechercher l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Vérifier si le compte est actif
    if (!user.isActive) {
      return res.status(401).json({ 
        message: 'Compte désactivé',
        code: 'ACCOUNT_DISABLED'
      });
    }
    
    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();
    
    // Générer le token
    const token = generateToken(user);
    
    // Retourner la réponse
    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin
      }
    });
  })
);

// Vérifier le token (route protégée)
router.get('/me', 
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  })
);

// Déconnexion (optionnel, côté client)
router.post('/logout', (req, res) => {
  res.json({ 
    message: 'Déconnexion réussie',
    code: 'LOGOUT_SUCCESS'
  });
});

// Réinitialisation de mot de passe
router.post('/forgot-password', 
  authLimiter,
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        message: 'Email requis',
        code: 'EMAIL_REQUIRED'
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe
      return res.json({ 
        message: 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé',
        code: 'RESET_EMAIL_SENT'
      });
    }
    
    // Générer un token de réinitialisation
    const resetToken = jwt.sign(
      { id: user._id, type: 'password-reset' },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );
    
    // Envoyer l'email de réinitialisation
    try {
      await sendPasswordResetEmail(user, resetToken);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
      return res.status(500).json({ 
        message: 'Erreur lors de l\'envoi de l\'email',
        code: 'EMAIL_SEND_ERROR'
      });
    }
    
    res.json({ 
      message: 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé',
      code: 'RESET_EMAIL_SENT'
    });
  })
);

// Réinitialisation de mot de passe avec token
router.post('/reset-password', 
  authLimiter,
  asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        message: 'Token et nouveau mot de passe requis',
        code: 'MISSING_DATA'
      });
    }
    
    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
      
      if (decoded.type !== 'password-reset') {
        return res.status(400).json({ 
          message: 'Token invalide',
          code: 'INVALID_TOKEN'
        });
      }
      
      // Rechercher l'utilisateur
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ 
          message: 'Utilisateur non trouvé',
          code: 'USER_NOT_FOUND'
        });
      }
      
      // Hasher le nouveau mot de passe
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      // Mettre à jour le mot de passe
      user.password = hashedPassword;
      await user.save();
      
      res.json({ 
        message: 'Mot de passe mis à jour avec succès',
        code: 'PASSWORD_UPDATED'
      });
      
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ 
          message: 'Token expiré',
          code: 'TOKEN_EXPIRED'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ 
          message: 'Token invalide',
          code: 'INVALID_TOKEN'
        });
      }
      
      throw error;
    }
  })
);

export default router;