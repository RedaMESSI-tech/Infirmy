import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  nurse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  comment: { 
    type: String,
    maxlength: 500
  },
  categories: [{
    category: {
      type: String,
      enum: ['Ponctualité', 'Professionnalisme', 'Qualité des soins', 'Communication', 'Hygiène', 'Empathie']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  isAnonymous: { 
    type: Boolean, 
    default: false 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
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
reviewSchema.index({ nurse: 1, createdAt: -1 });
reviewSchema.index({ patient: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isVerified: 1 });

// Middleware pour mettre à jour updatedAt
reviewSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Review', reviewSchema);
