// Middleware de gestion des erreurs globales
export const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);

  // Erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));
    
    return res.status(400).json({
      message: 'Données invalides',
      errors
    });
  }

  // Erreurs de duplication (clés uniques)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    return res.status(409).json({
      message: `${field} déjà utilisé`,
      field,
      value
    });
  }

  // Erreurs de cast MongoDB (ID invalide)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID invalide',
      field: err.path,
      value: err.value
    });
  }

  // Erreurs JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token invalide',
      code: 'INVALID_TOKEN'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expiré',
      code: 'TOKEN_EXPIRED'
    });
  }

  // Erreurs de limite de taille de fichier
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      message: 'Fichier trop volumineux',
      maxSize: process.env.MAX_FILE_SIZE || '5MB'
    });
  }

  // Erreurs de type de fichier
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      message: 'Type de fichier non autorisé'
    });
  }

  // Erreurs de rate limiting
  if (err.status === 429) {
    return res.status(429).json({
      message: 'Trop de requêtes, veuillez réessayer plus tard',
      retryAfter: err.retryAfter
    });
  }

  // Erreurs personnalisées
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code
    });
  }

  // Erreur par défaut
  res.status(500).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'Erreur interne du serveur' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware pour capturer les erreurs asynchrones
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware pour les routes non trouvées
export const notFound = (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} non trouvée`,
    code: 'ROUTE_NOT_FOUND'
  });
};
