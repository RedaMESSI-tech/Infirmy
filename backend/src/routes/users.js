import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { validateId } from '../middleware/validation.js';
import { uploadAvatar, cleanupUploads } from '../middleware/upload.js';
import { uploadLimiter } from '../middleware/rateLimit.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Obtenir le profil de l'utilisateur connecté
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
    
    res.json({ user });
  })
);

// Mettre à jour le profil de l'utilisateur connecté
router.put('/me', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const { firstName, lastName, phone } = req.body;
    
    // Vérifier que les données sont valides
    if (!firstName || !lastName) {
      return res.status(400).json({
        message: 'Prénom et nom sont requis',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }
    
    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstName,
          lastName,
          phone,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      message: 'Profil mis à jour avec succès',
      user
    });
  })
);

// Changer le mot de passe
router.patch('/me/password', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Ancien et nouveau mot de passe requis',
        code: 'MISSING_PASSWORDS'
      });
    }
    
    // Récupérer l'utilisateur avec le mot de passe
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Vérifier l'ancien mot de passe
    const bcrypt = await import('bcryptjs');
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: 'Ancien mot de passe incorrect',
        code: 'INVALID_CURRENT_PASSWORD'
      });
    }
    
    // Hasher le nouveau mot de passe
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Mettre à jour le mot de passe
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();
    
    res.json({
      message: 'Mot de passe mis à jour avec succès'
    });
  })
);

// Upload d'avatar
router.post('/me/avatar', 
  requireAuth, 
  uploadLimiter,
  uploadAvatar,
  cleanupUploads,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'Aucun fichier uploadé',
        code: 'NO_FILE'
      });
    }
    
    // Mettre à jour l'avatar de l'utilisateur
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatarUrl: req.file.path,
          updatedAt: new Date()
        }
      },
      { new: true }
    ).select('-password');
    
    res.json({
      message: 'Avatar mis à jour avec succès',
      avatarUrl: req.file.path,
      user
    });
  })
);

// Supprimer l'avatar
router.delete('/me/avatar', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Supprimer l'ancien avatar s'il existe
    if (user.avatarUrl) {
      const fs = await import('fs');
      try {
        if (fs.existsSync(user.avatarUrl)) {
          fs.unlinkSync(user.avatarUrl);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'avatar:', error);
      }
    }
    
    // Mettre à jour l'utilisateur
    user.avatarUrl = null;
    user.updatedAt = new Date();
    await user.save();
    
    res.json({
      message: 'Avatar supprimé avec succès',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
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

// Désactiver le compte
router.patch('/me/deactivate', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          isActive: false,
          updatedAt: new Date()
        }
      },
      { new: true }
    ).select('-password');
    
    res.json({
      message: 'Compte désactivé avec succès',
      user
    });
  })
);

// Réactiver le compte
router.patch('/me/activate', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          isActive: true,
          updatedAt: new Date()
        }
      },
      { new: true }
    ).select('-password');
    
    res.json({
      message: 'Compte réactivé avec succès',
      user
    });
  })
);

// Obtenir un utilisateur public (pour les profils)
router.get('/:id', 
  validateId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id)
      .select('firstName lastName avatarUrl role isVerified isActive createdAt')
      .lean();
    
    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Ne pas exposer les utilisateurs inactifs
    if (!user.isActive) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    res.json({ user });
  })
);

export default router;
