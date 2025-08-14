import { Router } from 'express';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import NurseProfile from '../models/NurseProfile.js';
import { requireAuth, requirePatient, requireNurse } from '../middleware/auth.js';
import { validateAppointment, validateId } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { 
  sendAppointmentRequestEmail, 
  sendAppointmentConfirmedEmail, 
  sendAppointmentCancelledEmail,
  sendAppointmentReminderEmail 
} from '../services/emailService.js';

const router = Router();

// Obtenir tous les rendez-vous de l'utilisateur connecté
router.get('/', 
  requireAuth, 
  asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20 } = req.query;
    
    // Construire la requête selon le rôle
    let query = {};
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'nurse') {
      query.nurse = req.user._id;
    }
    
    // Filtre par statut
    if (status) {
      query.status = status;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Exécuter la requête
    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email phone avatarUrl')
      .populate('nurse', 'firstName lastName email phone avatarUrl')
      .sort({ start: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Compter le total
    const total = await Appointment.countDocuments(query);
    
    res.json({
      appointments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  })
);

// Créer un nouveau rendez-vous
router.post('/', 
  requireAuth, 
  requirePatient,
  validateAppointment,
  asyncHandler(async (req, res) => {
    const {
      nurseId,
      start,
      end,
      duration,
      service,
      address,
      city,
      postalCode,
      location,
      note,
      isUrgent
    } = req.body;
    
    // Vérifier que l'infirmier existe et a un profil
    const nurse = await User.findById(nurseId);
    if (!nurse || nurse.role !== 'nurse') {
      return res.status(404).json({
        message: 'Infirmier non trouvé',
        code: 'NURSE_NOT_FOUND'
      });
    }
    
    const nurseProfile = await NurseProfile.findOne({ user: nurseId });
    if (!nurseProfile) {
      return res.status(400).json({
        message: 'Cet infirmier n\'a pas encore configuré son profil',
        code: 'NURSE_PROFILE_NOT_FOUND'
      });
    }
    
    // Vérifier que l'infirmier est disponible
    if (!nurseProfile.isAvailable) {
      return res.status(400).json({
        message: 'Cet infirmier n\'est pas disponible actuellement',
        code: 'NURSE_NOT_AVAILABLE'
      });
    }
    
    // Calculer le prix basé sur la durée et le tarif horaire
    const price = Math.ceil(duration / 60 * nurseProfile.hourlyRate);
    
    // Créer le rendez-vous
    const appointment = await Appointment.create({
      patient: req.user._id,
      nurse: nurseId,
      start: new Date(start),
      end: new Date(end),
      duration,
      service,
      address,
      city,
      postalCode,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      },
      price,
      patientNote: note,
      isUrgent
    });
    
    // Récupérer les informations complètes
    const fullAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('nurse', 'firstName lastName email phone')
      .lean();
    
    // Envoyer l'email de demande de rendez-vous
    try {
      await sendAppointmentRequestEmail(fullAppointment, fullAppointment.nurse, fullAppointment.patient);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de demande:', error);
    }
    
    res.status(201).json({
      message: 'Demande de rendez-vous envoyée avec succès',
      appointment: fullAppointment
    });
  })
);

// Obtenir un rendez-vous spécifique
router.get('/:id', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName email phone avatarUrl')
      .populate('nurse', 'firstName lastName email phone avatarUrl')
      .lean();
    
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'utilisateur a accès à ce rendez-vous
    if (req.user.role !== 'admin' && 
        appointment.patient._id.toString() !== req.user._id.toString() && 
        appointment.nurse._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    res.json({ appointment });
  })
);

// Confirmer un rendez-vous (infirmier)
router.post('/:id/confirm', 
  requireAuth, 
  requireNurse,
  validateId,
  asyncHandler(async (req, res) => {
    const { nurseNote } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'infirmier connecté est bien celui du rendez-vous
    if (appointment.nurse.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous est en attente
    if (appointment.status !== 'pending') {
      return res.status(400).json({
        message: 'Ce rendez-vous ne peut plus être confirmé',
        code: 'INVALID_STATUS'
      });
    }
    
    // Confirmer le rendez-vous
    appointment.status = 'confirmed';
    appointment.nurseNote = nurseNote;
    await appointment.save();
    
    // Récupérer les informations complètes
    const fullAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('nurse', 'firstName lastName email phone')
      .lean();
    
    // Envoyer l'email de confirmation
    try {
      await sendAppointmentConfirmedEmail(fullAppointment, fullAppointment.nurse, fullAppointment.patient);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    }
    
    res.json({
      message: 'Rendez-vous confirmé avec succès',
      appointment: fullAppointment
    });
  })
);

// Refuser un rendez-vous (infirmier)
router.post('/:id/refuse', 
  requireAuth, 
  requireNurse,
  validateId,
  asyncHandler(async (req, res) => {
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        message: 'Raison du refus requise',
        code: 'REASON_REQUIRED'
      });
    }
    
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'infirmier connecté est bien celui du rendez-vous
    if (appointment.nurse.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous est en attente
    if (appointment.status !== 'pending') {
      return res.status(400).json({
        message: 'Ce rendez-vous ne peut plus être refusé',
        code: 'INVALID_STATUS'
      });
    }
    
    // Refuser le rendez-vous
    appointment.status = 'cancelled';
    appointment.cancellationReason = reason;
    await appointment.save();
    
    // Récupérer les informations complètes
    const fullAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('nurse', 'firstName lastName email phone')
      .lean();
    
    // Envoyer l'email d'annulation
    try {
      await sendAppointmentCancelledEmail(fullAppointment, fullAppointment.nurse, fullAppointment.patient, reason);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email d\'annulation:', error);
    }
    
    res.json({
      message: 'Rendez-vous refusé avec succès',
      appointment: fullAppointment
    });
  })
);

// Annuler un rendez-vous
router.post('/:id/cancel', 
  requireAuth, 
  validateId,
  asyncHandler(async (req, res) => {
    const { reason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'utilisateur connecté est le patient ou l'infirmier
    if (appointment.patient.toString() !== req.user._id.toString() && 
        appointment.nurse.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous peut être annulé
    if (['cancelled', 'completed'].includes(appointment.status)) {
      return res.status(400).json({
        message: 'Ce rendez-vous ne peut plus être annulé',
        code: 'INVALID_STATUS'
      });
    }
    
    // Annuler le rendez-vous
    appointment.status = 'cancelled';
    appointment.cancellationReason = reason || 'Annulé par l\'utilisateur';
    await appointment.save();
    
    // Récupérer les informations complètes
    const fullAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'firstName lastName email phone')
      .populate('nurse', 'firstName lastName email phone')
      .lean();
    
    // Envoyer l'email d'annulation
    try {
      await sendAppointmentCancelledEmail(fullAppointment, fullAppointment.nurse, fullAppointment.patient, reason || 'Annulé par l\'utilisateur');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email d\'annulation:', error);
    }
    
    res.json({
      message: 'Rendez-vous annulé avec succès',
      appointment: fullAppointment
    });
  })
);

// Marquer un rendez-vous comme terminé
router.post('/:id/complete', 
  requireAuth, 
  requireNurse,
  validateId,
  asyncHandler(async (req, res) => {
    const { nurseNote } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'infirmier connecté est bien celui du rendez-vous
    if (appointment.nurse.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous est confirmé
    if (appointment.status !== 'confirmed') {
      return res.status(400).json({
        message: 'Ce rendez-vous ne peut pas être marqué comme terminé',
        code: 'INVALID_STATUS'
      });
    }
    
    // Marquer comme terminé
    appointment.status = 'completed';
    appointment.nurseNote = nurseNote;
    await appointment.save();
    
    res.json({
      message: 'Rendez-vous marqué comme terminé',
      appointment
    });
  })
);

// Marquer un rendez-vous comme "no-show"
router.post('/:id/no-show', 
  requireAuth, 
  requireNurse,
  validateId,
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: 'Rendez-vous non trouvé',
        code: 'APPOINTMENT_NOT_FOUND'
      });
    }
    
    // Vérifier que l'infirmier connecté est bien celui du rendez-vous
    if (appointment.nurse.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Accès non autorisé',
        code: 'ACCESS_DENIED'
      });
    }
    
    // Vérifier que le rendez-vous est confirmé
    if (appointment.status !== 'confirmed') {
      return res.status(400).json({
        message: 'Ce rendez-vous ne peut pas être marqué comme no-show',
        code: 'INVALID_STATUS'
      });
    }
    
    // Marquer comme no-show
    appointment.status = 'no-show';
    await appointment.save();
    
    res.json({
      message: 'Rendez-vous marqué comme no-show',
      appointment
    });
  })
);

export default router;