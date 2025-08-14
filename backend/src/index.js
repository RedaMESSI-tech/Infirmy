import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

// Import des routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import nurseRoutes from './routes/nurses.js';
import appointmentRoutes from './routes/appointments.js';
import messageRoutes from './routes/messages.js';
import reviewRoutes from './routes/reviews.js';
import notificationRoutes from './routes/notifications.js';

// Import des middlewares
import { generalLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

// Middlewares de sécurité
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé pour le développement
  crossOriginEmbedderPolicy: false
}));

// Middlewares de base
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate limiting global
app.use(generalLimiter);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);

// Servir les fichiers uploadés
const uploadPath = process.env.UPLOAD_PATH || './uploads';
if (fs.existsSync(uploadPath)) {
  app.use('/uploads', express.static(uploadPath));
}

// Route de fallback pour le SPA
app.get('*', (req, res) => {
  res.json({ 
    message: 'API Infirmy v1.4.12',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      nurses: '/api/nurses',
      appointments: '/api/appointments',
      messages: '/api/messages',
      reviews: '/api/reviews',
      notifications: '/api/notifications'
    }
  });
});

// Middleware de gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Configuration de la base de données
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/infirmy';

// Connexion à MongoDB
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connecté avec succès');
  console.log(`📊 Base de données: ${MONGO}`);
})
.catch((error) => {
  console.error('❌ Erreur de connexion MongoDB:', error);
  process.exit(1);
});

// Gestion des événements de connexion MongoDB
mongoose.connection.on('error', (error) => {
  console.error('❌ Erreur MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB déconnecté');
});

// Gestion des signaux de fermeture
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Connexion MongoDB fermée proprement');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture MongoDB:', error);
    process.exit(1);
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('🚀 Serveur Infirmy démarré avec succès');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 Date: ${new Date().toLocaleString('fr-FR')}`);
});