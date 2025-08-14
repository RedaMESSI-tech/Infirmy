import { Router } from 'express';
import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';
import NurseProfile from '../models/NurseProfile.js';
import { requireAuth, requirePatient } from '../middleware/auth.js';
import { validateReview, validateId } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Obtenir tous les avis d'un infirmier
router.get('/nurse/:nurseId', 
  validateId,
  asyncHandler(async (req, res) => {
    const { nurseId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Récupérer les avis
    const reviews = await Review.find({ nurse: nurseId, isVerified: true })
      .populate('patient', 'firstName lastName avatarUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Compter le total
    const total = await Review.countDocuments({ nurse: nurseId, isVerified: true });
    
    // Calculer les statistiques
    const stats = await Review.aggregate([
      { $match: { nurse: nurseId, isVerified: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);
    
    // Calculer la distribution des notes
    const ratingDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    if (stats[0]) {
      stats[0].ratingDistribution.forEach(rating => {
        ratingDistribution[rating]++;
      });
    }
    
    res.json({
      reviews,
      stats: {
        averageRating: stats[0]?.averageRating || 0,
        totalReviews: stats[0]?.totalReviews || 0,
        ratingDistribution
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

// Obtenir les avis de l'utilisateur connecté
router.get('/my-reviews', 
  requireAuth,
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Récupérer les avis
    const reviews = await Review.find({ patient: req.user._id })
      .populate('nurse', 'firstName lastName avatarUrl')
      .populate('appointment', 'service start')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Compter le total
    const total = await Review.countDocuments({ patient: req.user._id });
    
    res.json({
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  })
);

// Créer un nouvel avis
router.post('/', 
  requireAuth, 
  requirePatient,
  validateReview,
  asyncHandler(async (req, res) => {
    const { nurseId, appointmentId, rating, comment, categories, isAnonymous } = req.body;
    
    // Vérifier que le rendez-vous existe et appartient au patient
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous est terminé
    if (appointment.status !== 'completed') {
      return res.status(400).json({
        message: 'Vous ne pouvez évaluer que les rendez-vous terminés',
        code: 'INVALID_APPOINTMENT_STATUS'
      });
    }
    
    // Vérifier qu'il n'y a pas déjà un avis pour ce rendez-vous
    const existingReview = await Review.findOne({ appointment: appointmentId });
    if (existingReview) {
      return res.status(400).json({
        message: 'Vous avez déjà évalué ce rendez-vous',
        code: 'REVIEW_ALREADY_EXISTS'
      });
    }
    
    // Créer l'avis
    const review = await Review.create({
      patient: req.user._id,
      nurse: nurseId,
      appointment: appointmentId,
      rating,
      comment,
      categories,
      isAnonymous
    });
    
    // Récupérer l'avis complet
    const fullReview = await Review.findById(review._id)
      .populate('patient', 'firstName lastName')
      .populate('nurse', 'firstName lastName')
      .populate('appointment', 'service start')
      .lean();
    
    // Mettre à jour les statistiques de l'infirmier
    await updateNurseStats(nurseId);
    
    res.status(201).json({
      message: 'Avis créé avec succès',
      review: fullReview
    });
  })
);

// Mettre à jour un avis
router.put('/:reviewId', 
  requireAuth, 
  requirePatient,
  validateId,
  validateReview,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment, categories, isAnonymous } = req.body;
    
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        message: 'Avis non trouvé',
        code: 'REVIEW_NOT_FOUND'
      });
    }
    
    // Vérifier que l'utilisateur connecté est l'auteur de l'avis
    if (review.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Mettre à jour l'avis
    review.rating = rating;
    review.comment = comment;
    review.categories = categories;
    review.isAnonymous = isAnonymous;
    review.updatedAt = new Date();
    
    await review.save();
    
    // Mettre à jour les statistiques de l'infirmier
    await updateNurseStats(review.nurse);
    
    // Récupérer l'avis mis à jour
    const updatedReview = await Review.findById(reviewId)
      .populate('patient', 'firstName lastName')
      .populate('nurse', 'firstName lastName')
      .populate('appointment', 'service start')
      .lean();
    
    res.json({
      message: 'Avis mis à jour avec succès',
      review: updatedReview
    });
  })
);

// Supprimer un avis
router.delete('/:reviewId', 
  requireAuth, 
  requirePatient,
  validateId,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        message: 'Avis non trouvé',
        code: 'REVIEW_NOT_FOUND'
      });
    }
    
    // Vérifier que l'utilisateur connecté est l'auteur de l'avis
    if (review.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Supprimer l'avis
    await Review.findByIdAndDelete(reviewId);
    
    // Mettre à jour les statistiques de l'infirmier
    await updateNurseStats(review.nurse);
    
    res.json({
      message: 'Avis supprimé avec succès'
    });
  })
);

// Fonction utilitaire pour mettre à jour les statistiques d'un infirmier
async function updateNurseStats(nurseId) {
  try {
    const stats = await Review.aggregate([
      { $match: { nurse: nurseId, isVerified: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);
    
    if (stats[0]) {
      await NurseProfile.findOneAndUpdate(
        { user: nurseId },
        {
          $set: {
            rating: Math.round(stats[0].averageRating * 10) / 10,
            reviewCount: stats[0].totalReviews
          }
        }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques:', error);
  }
}

export default router;
