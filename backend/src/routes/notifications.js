import { Router } from 'express';
import Notification from '../models/Notification.js';
import { requireAuth } from '../middleware/auth.js';
import { validateId } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Obtenir toutes les notifications de l'utilisateur connecté
router.get('/', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    // Construire la requête
    let query = { user: req.user._id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Récupérer les notifications
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Compter le total
    const total = await Notification.countDocuments(query);
    
    // Compter les notifications non lues
    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false
    });
    
    res.json({
      notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  })
);

// Obtenir une notification spécifique
router.get('/:id', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({
        message: 'Notification non trouvée',
        code: 'NOTIFICATION_NOT_FOUND'
      });
    }
    
    // Vérifier que la notification appartient à l'utilisateur connecté
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    res.json({ notification });
  })
);

// Marquer une notification comme lue
router.patch('/:id/read', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({
        message: 'Notification non trouvée',
        code: 'NOTIFICATION_NOT_FOUND'
      });
    }
    
    // Vérifier que la notification appartient à l'utilisateur connecté
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Marquer comme lue
    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();
    
    res.json({
      message: 'Notification marquée comme lue',
      notification
    });
  })
);

// Marquer toutes les notifications comme lues
router.patch('/read-all', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { 
        $set: { 
          isRead: true, 
          readAt: new Date() 
        } 
      }
    );
    
    res.json({
      message: 'Toutes les notifications ont été marquées comme lues'
    });
  })
);

// Supprimer une notification
router.delete('/:id', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({
        message: 'Notification non trouvée',
        code: 'NOTIFICATION_NOT_FOUND'
      });
    }
    
    // Vérifier que la notification appartient à l'utilisateur connecté
    if (notification.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Supprimer la notification
    await Notification.findByIdAndDelete(id);
    
    res.json({
      message: 'Notification supprimée avec succès'
    });
  })
);

// Supprimer toutes les notifications lues
router.delete('/read', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    await Notification.deleteMany({
      user: req.user._id,
      isRead: true
    });
    
    res.json({
      message: 'Toutes les notifications lues ont été supprimées'
    });
  })
);

// Supprimer toutes les notifications
router.delete('/all', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    await Notification.deleteMany({
      user: req.user._id
    });
    
    res.json({
      message: 'Toutes les notifications ont été supprimées'
    });
  })
);

export default router;
