import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
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
  start: { 
    type: Date, 
    required: true 
  },
  end: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true,
    min: 15,
    max: 480 // 8 heures max
  },
  service: { 
    type: String, 
    required: true,
    enum: ['Soins de plaie', 'Prise de sang', 'Pansement', 'Injection', 'Surveillance', 'Soins post-opératoires', 'Éducation thérapeutique', 'Autre']
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  postalCode: { 
    type: String, 
    required: true 
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
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'], 
    default: 'pending' 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  note: { 
    type: String,
    maxlength: 500
  },
  patientNote: { 
    type: String,
    maxlength: 500
  },
  nurseNote: { 
    type: String,
    maxlength: 500
  },
  cancellationReason: { 
    type: String,
    maxlength: 200
  },
  isUrgent: { 
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
appointmentSchema.index({ patient: 1, start: -1 });
appointmentSchema.index({ nurse: 1, start: -1 });
appointmentSchema.index({ status: 1, start: 1 });
appointmentSchema.index({ location: '2dsphere' });

// Middleware pour mettre à jour updatedAt
appointmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Appointment', appointmentSchema);