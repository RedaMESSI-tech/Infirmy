#!/usr/bin/env node

/**
 * Script de démarrage du serveur Infirmy
 * Usage: node start.js [--env production|development]
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration par défaut
const config = {
  env: 'development',
  port: 4000,
  mongo: 'mongodb://localhost:27017/infirmy'
};

// Parser les arguments de ligne de commande
process.argv.forEach(arg => {
  if (arg.startsWith('--env=')) {
    config.env = arg.split('=')[1];
  } else if (arg.startsWith('--port=')) {
    config.port = parseInt(arg.split('=')[1]);
  } else if (arg.startsWith('--mongo=')) {
    config.mongo = arg.split('=')[1];
  }
});

// Variables d'environnement
process.env.NODE_ENV = config.env;
process.env.PORT = config.port;
process.env.MONGODB_URI = config.mongo;

console.log('🚀 Démarrage du serveur Infirmy...');
console.log(`🔧 Environnement: ${config.env}`);
console.log(`🌐 Port: ${config.port}`);
console.log(`📊 MongoDB: ${config.mongo}`);
console.log('');

// Démarrer le serveur
const server = spawn('node', ['src/index.js'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: process.env
});

// Gestion des signaux
process.on('SIGINT', () => {
  console.log('\n⚠️  Arrêt du serveur...');
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Arrêt du serveur...');
  server.kill('SIGTERM');
  process.exit(0);
});

// Gestion des erreurs
server.on('error', (error) => {
  console.error('❌ Erreur lors du démarrage du serveur:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Le serveur s'est arrêté avec le code: ${code}`);
    process.exit(code);
  }
});
