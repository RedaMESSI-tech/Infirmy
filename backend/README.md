# Infirmy Backend API

Backend complet pour l'application Infirmy, plateforme de mise en relation patients/infirmiers libéraux.

## 🚀 Fonctionnalités

### Authentification & Utilisateurs
- ✅ Inscription/Connexion sécurisée (JWT)
- ✅ Gestion des rôles (patient, infirmier, admin)
- ✅ Réinitialisation de mot de passe
- ✅ Upload et gestion des avatars
- ✅ Profils utilisateurs complets

### Gestion des Infirmiers
- ✅ Création et mise à jour de profils infirmiers
- ✅ Spécialités, expériences, certifications
- ✅ Gestion des disponibilités et zones d'intervention
- ✅ Upload de photos et documents
- ✅ Système de géolocalisation (OpenStreetMap)

### Rendez-vous
- ✅ Création de demandes de RDV
- ✅ Confirmation/Refus par les infirmiers
- ✅ Gestion des statuts (en attente, confirmé, annulé, terminé)
- ✅ Calcul automatique des prix
- ✅ Notifications par email

### Communication
- ✅ Messagerie privée entre patients et infirmiers
- ✅ Gestion des conversations
- ✅ Marquage des messages lus/non lus
- ✅ Support des pièces jointes

### Évaluations & Avis
- ✅ Système de notation (1-5 étoiles)
- ✅ Commentaires et catégorisation
- ✅ Calcul automatique des moyennes
- ✅ Vérification des avis

### Notifications
- ✅ Notifications en temps réel
- ✅ Différents types (RDV, messages, système)
- ✅ Gestion des priorités
- ✅ Expiration automatique

## 🛠️ Technologies

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT + bcrypt
- **Validation**: Express-validator
- **Upload**: Multer
- **Email**: Nodemailer
- **Sécurité**: Helmet, CORS, Rate Limiting

## 📋 Prérequis

- Node.js 18+ 
- MongoDB 5+
- npm ou yarn

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd Infirmy_v1_4_12_green/backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer le fichier .env avec vos valeurs
nano .env
```

### 4. Variables d'environnement
```env
# Configuration du serveur
PORT=4000
NODE_ENV=development

# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/infirmy

# JWT Secret (générer une clé sécurisée)
JWT_SECRET=votre_secret_jwt_tres_securise_ici

# Configuration CORS
CORS_ORIGIN=http://localhost:5173

# Configuration email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Configuration upload d'images
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### 5. Initialiser la base de données
```bash
# Créer les collections et index
npm run init-db
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

### Script personnalisé
```bash
# Démarrage avec paramètres personnalisés
node start.js --env=production --port=5000 --mongo=mongodb://localhost:27017/infirmy-prod
```

## 📚 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Réinitialisation mot de passe

### Utilisateurs
- `GET /api/users/me` - Profil utilisateur
- `PUT /api/users/me` - Mettre à jour le profil
- `PATCH /api/users/me/password` - Changer le mot de passe
- `POST /api/users/me/avatar` - Upload avatar
- `DELETE /api/users/me/avatar` - Supprimer avatar

### Infirmiers
- `GET /api/nurses/search` - Recherche d'infirmiers
- `GET /api/nurses/me` - Profil infirmier connecté
- `POST /api/nurses/me` - Créer/Mettre à jour profil
- `GET /api/nurses/:id` - Profil infirmier public
- `POST /api/nurses/me/avatar` - Upload avatar
- `POST /api/nurses/me/photos` - Upload photos
- `POST /api/nurses/me/documents` - Upload documents

### Rendez-vous
- `GET /api/appointments` - Liste des RDV
- `POST /api/appointments` - Créer un RDV
- `GET /api/appointments/:id` - Détails d'un RDV
- `POST /api/appointments/:id/confirm` - Confirmer RDV
- `POST /api/appointments/:id/refuse` - Refuser RDV
- `POST /api/appointments/:id/cancel` - Annuler RDV
- `POST /api/appointments/:id/complete` - Marquer comme terminé

### Messages
- `GET /api/messages` - Liste des conversations
- `GET /api/messages/:peerId` - Conversation avec un utilisateur
- `POST /api/messages/:peerId` - Envoyer un message
- `PATCH /api/messages/:id/read` - Marquer comme lu
- `DELETE /api/messages/:id` - Supprimer un message

### Avis
- `GET /api/reviews/nurse/:nurseId` - Avis d'un infirmier
- `GET /api/reviews/my-reviews` - Mes avis
- `POST /api/reviews` - Créer un avis
- `PUT /api/reviews/:id` - Mettre à jour un avis
- `DELETE /api/reviews/:id` - Supprimer un avis

### Notifications
- `GET /api/notifications` - Liste des notifications
- `GET /api/notifications/:id` - Détails d'une notification
- `PATCH /api/notifications/:id/read` - Marquer comme lue
- `PATCH /api/notifications/read-all` - Marquer toutes comme lues
- `DELETE /api/notifications/:id` - Supprimer une notification

## 🔒 Sécurité

- **JWT** avec expiration et rotation
- **bcrypt** pour le hashage des mots de passe
- **Helmet** pour les en-têtes de sécurité
- **CORS** configuré et sécurisé
- **Rate Limiting** pour prévenir les abus
- **Validation** des données d'entrée
- **Sanitisation** des données

## 📁 Structure du projet

```
backend/
├── src/
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   ├── middleware/      # Middlewares personnalisés
│   ├── services/        # Services métier
│   └── index.js         # Point d'entrée
├── scripts/             # Scripts utilitaires
├── uploads/             # Fichiers uploadés
├── .env                 # Variables d'environnement
├── package.json         # Dépendances
└── README.md            # Documentation
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📊 Monitoring

- **Morgan** pour les logs HTTP
- **Gestion d'erreurs** centralisée
- **Validation** des données
- **Rate limiting** configurable
- **Health checks** automatiques

## 🚀 Déploiement

### Docker
```bash
# Construire l'image
docker build -t infirmy-backend .

# Lancer le conteneur
docker run -p 4000:4000 --env-file .env infirmy-backend
```

### PM2
```bash
# Installer PM2
npm install -g pm2

# Démarrer l'application
pm2 start ecosystem.config.js

# Monitoring
pm2 monit
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation API

## 🔄 Changelog

### v1.4.12
- ✅ Ajout du système de notifications
- ✅ Amélioration de la gestion des avis
- ✅ Support des uploads de fichiers
- ✅ Système de géolocalisation
- ✅ Gestion des erreurs améliorée
- ✅ Documentation complète

---

**Infirmy Backend** - Une API robuste et sécurisée pour la plateforme de soins à domicile 🏥
