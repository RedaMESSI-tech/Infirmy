import mongoose from 'mongoose';

const nurseProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  bio: { 
    type: String, 
    required: true,
    minlength: 50,
    maxlength: 500
  },
  specialties: [{ 
    type: String, 
    required: true,
    enum: ['Soins généraux', 'Pédiatrie', 'Gériatrie', 'Chirurgie', 'Urgences', 'Soins palliatifs', 'Diabétologie', 'Cardiologie', 'Oncologie']
  }],
  phone: { 
    type: String, 
    required: true,
    trim: true
  },
  address: { 
    type: String, 
    required: true,
    trim: true
  },
  city: { 
    type: String, 
    required: true,
    trim: true
  },
  postalCode: { 
    type: String, 
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  radiusKm: { 
    type: Number, 
    default: 15,
    min: 5,
    max: 100
  },
  hourlyRate: { 
    type: Number, 
    required: true,
    min: 20,
    max: 200
  },
  experience: { 
    type: Number, 
    required: true,
    min: 0,
    max: 50
  },
  education: [{ 
    type: String 
  }],
  certifications: [{ 
    type: String 
  }],
  languages: [{ 
    type: String,
    enum: ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Arabe']
  }],
  availability: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: true } }
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  photos: [{ 
    type: String 
  }],
  documents: [{ 
    type: String 
  }],
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

// Index géospatial pour la recherche par proximité
nurseProfileSchema.index({ location: '2dsphere' });

// Index pour la recherche textuelle
nurseProfileSchema.index({ 
  bio: 'text', 
  specialties: 'text', 
  city: 'text',
  address: 'text' 
});

// Middleware pour mettre à jour updatedAt
nurseProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('NurseProfile', nurseProfileSchema);