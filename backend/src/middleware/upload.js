import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Créer le dossier uploads s'il n'existe pas
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Déterminer le sous-dossier selon le type de fichier
    let subDir = 'general';
    
    if (file.fieldname === 'avatar') {
      subDir = 'avatars';
    } else if (file.fieldname === 'document') {
      subDir = 'documents';
    } else if (file.fieldname === 'photo') {
      subDir = 'photos';
    }
    
    const fullPath = path.join(uploadDir, subDir);
    
    // Créer le sous-dossier s'il n'existe pas
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    
    // Nettoyer le nom de fichier
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
    
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

// Filtre des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  // Types de fichiers autorisés
  const allowedTypes = {
    'image/jpeg': true,
    'image/jpg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true,
    'application/pdf': true,
    'application/msword': true,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true
  };
  
  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error(`Type de fichier non autorisé: ${file.mimetype}`), false);
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB par défaut
    files: 5 // Maximum 5 fichiers par requête
  }
});

// Middleware d'upload pour les avatars
export const uploadAvatar = upload.single('avatar');

// Middleware d'upload pour les documents
export const uploadDocument = upload.single('document');

// Middleware d'upload pour les photos
export const uploadPhoto = upload.single('photo');

// Middleware d'upload multiple pour les photos
export const uploadPhotos = upload.array('photos', 10); // Maximum 10 photos

// Middleware d'upload multiple pour les documents
export const uploadDocuments = upload.array('documents', 5); // Maximum 5 documents

// Middleware d'upload mixte
export const uploadMixed = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'documents', maxCount: 5 }
]);

// Middleware pour nettoyer les fichiers en cas d'erreur
export const cleanupUploads = (req, res, next) => {
  // Si des fichiers ont été uploadés mais qu'il y a une erreur
  if (req.files || req.file) {
    const files = req.files || [req.file];
    
    files.forEach(file => {
      if (file && file.path) {
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          console.error('Erreur lors de la suppression du fichier:', error);
        }
      }
    });
  }
  
  next();
};

// Fonction utilitaire pour supprimer un fichier
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
  }
  return false;
};

// Fonction utilitaire pour obtenir l'URL d'un fichier
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  
  // En production, retourner l'URL complète
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.BASE_URL}/uploads/${filePath}`;
  }
  
  // En développement, retourner le chemin relatif
  return `/uploads/${filePath}`;
};
