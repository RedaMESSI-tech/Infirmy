import { Router } from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { validateMessage, validateId } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Obtenir la conversation avec un utilisateur
router.get('/:peerId', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { peerId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    // Vérifier que l'utilisateur avec qui on converse existe
    const peer = await User.findById(peerId).select('firstName lastName avatarUrl role');
    if (!peer) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Récupérer les messages
    const messages = await Message.find({
      $or: [
        { from: req.user._id, to: peerId },
        { from: peerId, to: req.user._id }
      ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();
    
    // Marquer les messages comme lus
    await Message.updateMany(
      { from: peerId, to: req.user._id, isRead: false },
      { 
        $set: { 
          isRead: true, 
          readAt: new Date() 
        } 
      }
    );
    
    // Compter le total
    const total = await Message.countDocuments({
      $or: [
        { from: req.user._id, to: peerId },
        { from: peerId, to: req.user._id }
      ]
    });
    
    res.json({
      messages: messages.reverse(), // Remettre dans l'ordre chronologique
      peer: {
        _id: peer._id,
        firstName: peer.firstName,
        lastName: peer.lastName,
        avatarUrl: peer.avatarUrl,
        role: peer.role
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  })
);

// Envoyer un message
router.post('/:peerId', 
  requireAuth, 
  validateId,
  validateMessage,
  asyncHandler(async (req, res) => {
    const { peerId } = req.params;
    const { body, attachment } = req.body;
    
    // Vérifier que l'utilisateur avec qui on converse existe
    const peer = await User.findById(peerId);
    if (!peer) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }
    
    // Créer le message
    const message = await Message.create({
      from: req.user._id,
      to: peerId,
      body,
      attachment
    });
    
    // Récupérer le message avec les informations de l'expéditeur
    const fullMessage = await Message.findById(message._id)
      .populate('from', 'firstName lastName avatarUrl')
      .lean();
    
    res.status(201).json({
      message: 'Message envoyé avec succès',
      data: fullMessage
    });
  })
);

// Obtenir la liste des conversations
router.get('/', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    
    // Trouver tous les utilisateurs avec qui on a échangé des messages
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { from: req.user._id },
            { to: req.user._id }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$from', req.user._id] },
              '$to',
              '$from'
            ]
          },
          lastMessage: { $last: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ['$to', req.user._id] },
                  { $eq: ['$isRead', false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      },
      {
        $skip: (parseInt(page) - 1) * parseInt(limit)
      },
      {
        $limit: parseInt(limit)
      }
    ]);
    
    // Récupérer les informations des utilisateurs
    const userIds = conversations.map(c => c._id);
    const users = await User.find({ _id: { $in: userIds } })
      .select('firstName lastName avatarUrl role')
      .lean();
    
    // Formater les conversations
    const formattedConversations = conversations.map(conv => {
      const user = users.find(u => u._id.toString() === conv._id.toString());
      return {
        userId: conv._id,
        user: user || { firstName: 'Utilisateur', lastName: 'Supprimé' },
        lastMessage: {
          body: conv.lastMessage.body,
          createdAt: conv.lastMessage.createdAt,
          from: conv.lastMessage.from.toString() === req.user._id.toString() ? 'me' : 'other'
        },
        unreadCount: conv.unreadCount
      };
    });
    
    // Compter le total
    const total = await Message.aggregate([
      {
        $match: {
          $or: [
            { from: req.user._id },
            { to: req.user._id }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$from', req.user._id] },
              '$to',
              '$from'
            ]
          }
        }
      },
      {
        $count: 'total'
      }
    ]);
    
    res.json({
      conversations: formattedConversations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total[0]?.total || 0,
        pages: Math.ceil((total[0]?.total || 0) / parseInt(limit))
      }
    });
  })
);

// Marquer un message comme lu
router.patch('/:messageId/read', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({
        message: 'Message non trouvé',
        code: 'MESSAGE_NOT_FOUND'
      });
    }
    
    // Vérifier que le message est bien destiné à l'utilisateur connecté
    if (message.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Marquer comme lu
    message.isRead = true;
    message.readAt = new Date();
    await message.save();
    
    res.json({
      message: 'Message marqué comme lu',
      data: message
    });
  })
);

// Supprimer un message
router.delete('/:messageId', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({
        message: 'Message non trouvé',
        code: 'MESSAGE_NOT_FOUND'
      });
    }
    
    // Vérifier que l'utilisateur connecté est l'expéditeur du message
    if (message.from.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Supprimer le message
    await Message.findByIdAndDelete(messageId);
    
    res.json({
      message: 'Message supprimé avec succès'
    });
  })
);

export default router;