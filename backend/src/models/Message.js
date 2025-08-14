import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  to: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  body: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  readAt: { 
    type: Date 
  },
  attachment: { 
    type: String 
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
messageSchema.index({ from: 1, to: 1, createdAt: -1 });
messageSchema.index({ to: 1, isRead: 1 });

// Middleware pour mettre à jour updatedAt
messageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Message', messageSchema);