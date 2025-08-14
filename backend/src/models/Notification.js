import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['appointment_request', 'appointment_confirmed', 'appointment_cancelled', 'appointment_reminder', 'message_received', 'review_received', 'system']
  },
  title: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  message: { 
    type: String, 
    required: true,
    maxlength: 500
  },
  data: { 
    type: mongoose.Schema.Types.Mixed 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  readAt: { 
    type: Date 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  expiresAt: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true,
  minimize: false 
});

// Index pour la recherche
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 });

// Middleware pour mettre à jour updatedAt
notificationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Notification', notificationSchema);
