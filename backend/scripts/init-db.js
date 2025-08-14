#!/usr/bin/env node

/**
 * Script d'initialisation de la base de données Infirmy
 * Crée les collections et les index nécessaires
 */

import mongoose from 'mongoose';
import 'dotenv/config';

// Modèles
import User from '../src/models/User.js';
import NurseProfile from '../src/models/NurseProfile.js';
import Appointment from '../src/models/Appointment.js';
import Message from '../src/models/Message.js';
import Review from '../src/models/Review.js';
import Notification from '../src/models/Notification.js';

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/infirmy';

async function initDatabase() {
  try {
    console.log('🚀 Initialisation de la base de données Infirmy...');
    console.log(`📊 Connexion à: ${MONGODB_URI}`);
    
    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connexion MongoDB établie');
    
    // Créer les collections et index
    console.log('📝 Création des collections et index...');
    
    // Collection Users
    await User.createCollection();
    console.log('✅ Collection Users créée');
    
    // Collection NurseProfiles
    await NurseProfile.createCollection();
    console.log('✅ Collection NurseProfiles créée');
    
    // Collection Appointments
    await Appointment.createCollection();
    console.log('✅ Collection Appointments créée');
    
    // Collection Messages
    await Message.createCollection();
    console.log('✅ Collection Messages créée');
    
    // Collection Reviews
    await Review.createCollection();
    console.log('✅ Collection Reviews créée');
    
    // Collection Notifications
    await Notification.createCollection();
    console.log('✅ Collection Notifications créée');
    
    // Créer les index
    console.log('🔍 Création des index...');
    
    // Index pour User
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ firstName: 'text', lastName: 'text', email: 'text' });
    console.log('✅ Index Users créés');
    
    // Index pour NurseProfile
    await NurseProfile.collection.createIndex({ user: 1 }, { unique: true });
    await NurseProfile.collection.createIndex({ location: '2dsphere' });
    await NurseProfile.collection.createIndex({ bio: 'text', specialties: 'text', city: 'text', address: 'text' });
    console.log('✅ Index NurseProfiles créés');
    
    // Index pour Appointment
    await Appointment.collection.createIndex({ patient: 1, start: -1 });
    await Appointment.collection.createIndex({ nurse: 1, start: -1 });
    await Appointment.collection.createIndex({ status: 1, start: 1 });
    await Appointment.collection.createIndex({ location: '2dsphere' });
    console.log('✅ Index Appointments créés');
    
    // Index pour Message
    await Message.collection.createIndex({ from: 1, to: 1, createdAt: -1 });
    await Message.collection.createIndex({ to: 1, isRead: 1 });
    console.log('✅ Index Messages créés');
    
    // Index pour Review
    await Review.collection.createIndex({ nurse: 1, createdAt: -1 });
    await Review.collection.createIndex({ patient: 1, createdAt: -1 });
    await Review.collection.createIndex({ rating: 1 });
    await Review.collection.createIndex({ isVerified: 1 });
    console.log('✅ Index Reviews créés');
    
    // Index pour Notification
    await Notification.collection.createIndex({ user: 1, isRead: 1, createdAt: -1 });
    await Notification.collection.createIndex({ type: 1, createdAt: -1 });
    await Notification.collection.createIndex({ expiresAt: 1 });
    console.log('✅ Index Notifications créés');
    
    console.log('🎉 Base de données initialisée avec succès !');
    
    // Afficher les statistiques
    const stats = await getDatabaseStats();
    console.log('\n📊 Statistiques de la base de données:');
    console.log(`   Users: ${stats.users}`);
    console.log(`   NurseProfiles: ${stats.nurseProfiles}`);
    console.log(`   Appointments: ${stats.appointments}`);
    console.log(`   Messages: ${stats.messages}`);
    console.log(`   Reviews: ${stats.reviews}`);
    console.log(`   Notifications: ${stats.notifications}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Connexion MongoDB fermée');
  }
}

async function getDatabaseStats() {
  try {
    const stats = {
      users: await User.countDocuments(),
      nurseProfiles: await NurseProfile.countDocuments(),
      appointments: await Appointment.countDocuments(),
      messages: await Message.countDocuments(),
      reviews: await Review.countDocuments(),
      notifications: await Notification.countDocuments()
    };
    return stats;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return {};
  }
}

// Exécuter le script
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase();
}
