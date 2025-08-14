import { Router } from 'express';
import NurseProfile from '../models/NurseProfile.js';
import User from '../models/User.js';
import { requireAuth, requireNurse } from '../middleware/auth.js';
import { validateNurseProfile, validateSearch, validateId } from '../middleware/validation.js';
import { searchLimiter, uploadLimiter } from '../middleware/rateLimit.js';
import { uploadAvatar, uploadPhotos, uploadDocuments, cleanupUploads } from '../middleware/upload.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// Fonction utilitaire pour convertir en nombre
const toNum = (v, fb = null) => {
  if (v === undefined || v === null || v === '') return fb;
  const n = Number(v);
  return Number.isFinite(n) ? n : fb;
};

// Fonction de calcul de distance (formule de Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = v => v * Math.PI / 180;
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

// Recherche d'infirmiers
router.get('/search', 
  searchLimiter,
  validateSearch,
  asyncHandler(async (req, res) => {
    const { q, specialty, lat, lng, radius = 50, page = 1, limit = 20 } = req.query;
    
    // Construire la requête de base
    let query = { isAvailable: true };
    
    // Filtre par spécialité
    if (specialty) {
      query.specialties = specialty;
    }
    
    // Recherche textuelle
    if (q) {
      query.$text = { $search: q };
    }
    
    // Recherche par proximité géographique
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const radiusNum = parseFloat(radius);
      
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lngNum, latNum]
          },
          $maxDistance: radiusNum * 1000 // Convertir en mètres
        }
      };
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Exécuter la recherche
    const profiles = await NurseProfile.find(query)
      .populate('user', 'firstName lastName email avatarUrl')
      .sort({ rating: -1, reviewCount: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // Formater les résultats
    const results = profiles.map(profile => {
      const user = profile.user;
      let distance = null;
      
      // Calculer la distance si des coordonnées sont fournies
      if (lat && lng && profile.location?.coordinates) {
        const [profileLng, profileLat] = profile.location.coordinates;
        distance = calculateDistance(
          parseFloat(lat), 
          parseFloat(lng), 
          profileLat, 
          profileLng
        );
      }
      
      return {
        id: profile._id,
        userId: profile.user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: profile.bio,
        specialties: profile.specialties,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        postalCode: profile.postalCode,
        location: profile.location,
        hourlyRate: profile.hourlyRate,
        experience: profile.experience,
        rating: profile.rating,
        reviewCount: profile.reviewCount,
        distance: distance ? Math.round(distance * 10) / 10 : null,
        isVerified: profile.isVerified,
        photos: profile.photos || []
      };
    });
    
    // Compter le total pour la pagination
    const total = await NurseProfile.countDocuments(query);
    
    res.json({
      results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  })
);

// Obtenir le profil de l'infirmier connecté
router.get('/me', 
  requireAuth, 
  requireNurse,
  asyncHandler(async (req, res) => {
    const profile = await NurseProfile.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName email phone avatarUrl')
      .lean();
    
    if (!profile) {
      return res.status(404).json({
        message: 'Profil infirmier non trouvé',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    res.json({
      profile: {
        ...profile,
        user: profile.user
      }
    });
  })
);

// Créer ou mettre à jour le profil infirmier
router.post('/me', 
  requireAuth, 
  requireNurse,
  validateNurseProfile,
  asyncHandler(async (req, res) => {
    const {
      bio,
      specialties,
      phone,
      address,
      city,
      postalCode,
      location,
      radiusKm,
      hourlyRate,
      experience,
      education,
      certifications,
      languages,
      availability
    } = req.body;
    
    // Préparer les données du profil
    const profileData = {
      bio,
      specialties,
      phone,
      address,
      city,
      postalCode,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      },
      radiusKm,
      hourlyRate,
      experience,
      education,
      certifications,
      languages,
      availability
    };
    
    // Créer ou mettre à jour le profil
    const profile = await NurseProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileData },
      { 
        upsert: true, 
        new: true,
        runValidators: true
      }
    ).populate('user', 'firstName lastName email phone avatarUrl');
    
    res.json({
      message: 'Profil mis à jour avec succès',
      profile
    });
  })
);

// Obtenir un profil infirmier public
router.get('/:id', 
  validateId,
  asyncHandler(async (req, res) => {
    const profile = await NurseProfile.findById(req.params.id)
      .populate('user', 'firstName lastName email avatarUrl')
      .lean();
    
    if (!profile) {
      return res.status(404).json({
        message: 'Profil infirmier non trouvé',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    // Ne pas exposer les informations sensibles
    const publicProfile = {
      id: profile._id,
      user: {
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
        avatarUrl: profile.user.avatarUrl
      },
      bio: profile.bio,
      specialties: profile.specialties,
      city: profile.city,
      hourlyRate: profile.hourlyRate,
      experience: profile.experience,
      rating: profile.rating,
      reviewCount: profile.reviewCount,
      photos: profile.photos || [],
      isVerified: profile.isVerified
    };
    
    res.json(publicProfile);
  })
);

// Upload d'avatar
router.post('/me/avatar', 
  requireAuth, 
  requireNurse,
  uploadLimiter,
  uploadAvatar,
  cleanupUploads,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'Aucun fichier uploadé',
        code: 'NO_FILE'
      });
    }
    
    // Mettre à jour l'avatar de l'utilisateur
    await User.findByIdAndUpdate(req.user._id, {
      avatarUrl: req.file.path
    });
    
    res.json({
      message: 'Avatar mis à jour avec succès',
      avatarUrl: req.file.path
    });
  })
);

// Upload de photos
router.post('/me/photos', 
  requireAuth, 
  requireNurse,
  uploadLimiter,
  uploadPhotos,
  cleanupUploads,
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'Aucun fichier uploadé',
        code: 'NO_FILE'
      });
    }
    
    const photoPaths = req.files.map(file => file.path);
    
    // Ajouter les nouvelles photos au profil
    await NurseProfile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { photos: { $each: photoPaths } } }
    );
    
    res.json({
      message: 'Photos ajoutées avec succès',
      photos: photoPaths
    });
  })
);

// Upload de documents
router.post('/me/documents', 
  requireAuth, 
  requireNurse,
  uploadLimiter,
  uploadDocuments,
  cleanupUploads,
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'Aucun fichier uploadé',
        code: 'NO_FILE'
      });
    }
    
    const documentPaths = req.files.map(file => file.path);
    
    // Ajouter les nouveaux documents au profil
    await NurseProfile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { documents: { $each: documentPaths } } }
    );
    
    res.json({
      message: 'Documents ajoutés avec succès',
      documents: documentPaths
    });
  })
);

// Supprimer une photo
router.delete('/me/photos/:photoId', 
  requireAuth, 
  requireNurse,
  asyncHandler(async (req, res) => {
    const { photoId } = req.params;
    
    const profile = await NurseProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({
        message: 'Profil non trouvé',
        code: 'PROFILE_NOT_FOUND'
      });
    }
    
    // Retirer la photo du profil
    profile.photos = profile.photos.filter(photo => photo !== photoId);
    await profile.save();
    
    res.json({
      message: 'Photo supprimée avec succès'
    });
  })
);

// Mettre à jour la disponibilité
router.patch('/me/availability', 
  requireAuth, 
  requireNurse,
  asyncHandler(async (req, res) => {
    const { availability, isAvailable } = req.body;
    
    const updateData = {};
    if (availability) updateData.availability = availability;
    if (typeof isAvailable === 'boolean') updateData.isAvailable = isAvailable;
    
    const profile = await NurseProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: updateData },
      { new: true }
    );
    
    res.json({
      message: 'Disponibilité mise à jour avec succès',
      availability: profile.availability,
      isAvailable: profile.isAvailable
    });
  })
);

export default router;