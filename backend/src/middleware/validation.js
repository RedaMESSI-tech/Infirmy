import { body, param, query, validationResult } from 'express-validator';

// Middleware pour vérifier les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validation pour l'inscription
export const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le prénom doit contenir entre 2 et 50 caractères'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  body('role')
    .isIn(['patient', 'nurse'])
    .withMessage('Rôle invalide'),
  handleValidationErrors
];

// Validation pour la connexion
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Mot de passe requis'),
  handleValidationErrors
];

// Validation pour la création de profil infirmier
export const validateNurseProfile = [
  body('bio')
    .isLength({ min: 50, max: 500 })
    .withMessage('La bio doit contenir entre 50 et 500 caractères'),
  body('specialties')
    .isArray({ min: 1 })
    .withMessage('Au moins une spécialité est requise'),
  body('specialties.*')
    .isIn(['Soins généraux', 'Pédiatrie', 'Gériatrie', 'Chirurgie', 'Urgences', 'Soins palliatifs', 'Diabétologie', 'Cardiologie', 'Oncologie'])
    .withMessage('Spécialité invalide'),
  body('phone')
    .matches(/^(\+33|0)[1-9](\d{8})$/)
    .withMessage('Numéro de téléphone français invalide'),
  body('address')
    .isLength({ min: 10, max: 200 })
    .withMessage('L\'adresse doit contenir entre 10 et 200 caractères'),
  body('city')
    .isLength({ min: 2, max: 100 })
    .withMessage('La ville doit contenir entre 2 et 100 caractères'),
  body('postalCode')
    .matches(/^\d{5}$/)
    .withMessage('Code postal français invalide'),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordonnées GPS invalides'),
  body('location.coordinates.*')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Coordonnées GPS hors limites'),
  body('hourlyRate')
    .isFloat({ min: 20, max: 200 })
    .withMessage('Tarif horaire invalide'),
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Expérience invalide'),
  handleValidationErrors
];

// Validation pour la création de rendez-vous
export const validateAppointment = [
  body('start')
    .isISO8601()
    .withMessage('Date de début invalide'),
  body('end')
    .isISO8601()
    .withMessage('Date de fin invalide'),
  body('duration')
    .isInt({ min: 15, max: 480 })
    .withMessage('Durée invalide (15 min à 8h)'),
  body('service')
    .isIn(['Soins de plaie', 'Prise de sang', 'Pansement', 'Injection', 'Surveillance', 'Soins post-opératoires', 'Éducation thérapeutique', 'Autre'])
    .withMessage('Service invalide'),
  body('address')
    .isLength({ min: 10, max: 200 })
    .withMessage('L\'adresse doit contenir entre 10 et 200 caractères'),
  body('city')
    .isLength({ min: 2, max: 100 })
    .withMessage('La ville doit contenir entre 2 et 100 caractères'),
  body('postalCode')
    .matches(/^\d{5}$/)
    .withMessage('Code postal français invalide'),
  handleValidationErrors
];

// Validation pour les messages
export const validateMessage = [
  body('body')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Le message doit contenir entre 1 et 1000 caractères'),
  handleValidationErrors
];

// Validation pour les avis
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Note invalide (1 à 5)'),
  body('comment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Le commentaire ne peut pas dépasser 500 caractères'),
  body('categories')
    .optional()
    .isArray()
    .withMessage('Catégories invalides'),
  handleValidationErrors
];

// Validation des paramètres d'ID
export const validateId = [
  param('id')
    .isMongoId()
    .withMessage('ID invalide'),
  handleValidationErrors
];

// Validation des paramètres de recherche
export const validateSearch = [
  query('q')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Terme de recherche invalide'),
  query('specialty')
    .optional()
    .isIn(['Soins généraux', 'Pédiatrie', 'Gériatrie', 'Chirurgie', 'Urgences', 'Soins palliatifs', 'Diabétologie', 'Cardiologie', 'Oncologie'])
    .withMessage('Spécialité invalide'),
  query('lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude invalide'),
  query('lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude invalide'),
  query('radius')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Rayon de recherche invalide'),
  handleValidationErrors
];
