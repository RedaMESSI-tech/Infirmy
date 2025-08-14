import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token d\'authentification requis',
        code: 'TOKEN_MISSING'
      });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    
    if (!payload.id) {
      return res.status(401).json({ 
        message: 'Token invalide',
        code: 'INVALID_TOKEN'
      });
    }
    
    const user = await User.findById(payload.id).lean();
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ 
        message: 'Compte désactivé',
        code: 'ACCOUNT_DISABLED'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expiré',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Token invalide',
        code: 'INVALID_TOKEN'
      });
    }
    
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ 
      message: 'Erreur d\'authentification',
      code: 'AUTH_ERROR'
    });
  }
}

export function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentification requise',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    next();
  };
}

export const requirePatient = requireRole(['patient']);
export const requireNurse = requireRole(['nurse']);
export const requireAdmin = requireRole(['admin']);