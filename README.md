# 🏥 Infirmy - Plateforme de Mise en Relation Patients ↔ Infirmiers Libéraux

[![Version](https://img.shields.io/badge/version-1.4.12-green.svg)](https://github.com/infirmy/infirmy)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/vue-3.4.0+-green.svg)](https://vuejs.org/)

**Infirmy** est une plateforme innovante qui facilite la mise en relation entre patients et infirmiers libéraux, permettant une prise en charge à domicile simple, rapide et sécurisée.

## 🎯 Vision et Mission

Notre mission est de **démocratiser l'accès aux soins infirmiers à domicile** en créant une plateforme intuitive qui :
- 🔗 **Connecte** patients et infirmiers libéraux
- 🏠 **Facilite** la prise en charge à domicile
- ⚡ **Accélère** la prise de rendez-vous
- 🛡️ **Garantit** la sécurité et la qualité des soins
- 📱 **Simplifie** l'expérience utilisateur

## ✨ Fonctionnalités Principales

### 👥 Pour les Patients
- **Recherche d'infirmiers** par localisation et spécialité
- **Prise de rendez-vous** en ligne avec calendrier interactif
- **Suivi des soins** et historique médical
- **Évaluation** et commentaires sur les prestations
- **Notifications** en temps réel
- **Paiement sécurisé** en ligne

### 👨‍⚕️ Pour les Infirmiers Libéraux
- **Gestion de planning** et disponibilités
- **Réception de demandes** de soins
- **Gestion des patients** et dossiers médicaux
- **Facturation** et suivi des paiements
- **Statistiques** et rapports d'activité
- **Communication** avec les patients

### 🏢 Pour les Établissements
- **Gestion d'équipe** d'infirmiers
- **Coordination** des interventions
- **Suivi qualité** des prestations
- **Reporting** et analytics

## 🏗️ Architecture Technique

### Frontend (Vue 3 + TypeScript)
- **Framework** : Vue 3 avec Composition API
- **Build Tool** : Vite 5
- **UI Framework** : Vuetify 3
- **State Management** : Pinia
- **Routing** : Vue Router 4
- **Maps** : Leaflet + OpenStreetMap
- **Internationalisation** : Vue I18n

### Backend (Node.js + Express)
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JWT (Access + Refresh Tokens)
- **Sécurité** : Helmet, CORS, Rate Limiting
- **Validation** : Express Validator
- **Email** : Nodemailer

### Infrastructure
- **Containerisation** : Docker + Docker Compose
- **Serveur Web** : Nginx
- **Process Manager** : PM2
- **Tests** : Jest + Cypress
- **CI/CD** : GitHub Actions (prévu)

## 🚀 Installation et Démarrage

### Prérequis
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 6.0
- **Git**

### Installation Rapide

1. **Cloner le projet**
   ```bash
   git clone https://github.com/infirmy/infirmy.git
   cd infirmy
   ```

2. **Installation des dépendances**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   # Frontend
   cd frontend
   cp env.example .env
   
   # Backend
   cd ../backend
   cp env.example .env
   ```

4. **Démarrer avec Docker (recommandé)**
   ```bash
   docker-compose up -d
   ```

5. **Ou démarrer manuellement**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Accéder à l'application**
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:5000
   - Documentation API : http://localhost:5000/api-docs

## 📁 Structure du Projet

```
infirmy/
├── 📱 frontend/                 # Application Vue.js
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── views/              # Pages de l'application
│   │   ├── stores/             # Stores Pinia
│   │   ├── services/           # Services API
│   │   ├── plugins/            # Plugins (Vuetify, i18n)
│   │   └── types/              # Types TypeScript
│   ├── public/                 # Assets statiques
│   └── cypress/                # Tests E2E
├── 🔧 backend/                  # API Express.js
│   ├── src/
│   │   ├── controllers/        # Contrôleurs API
│   │   ├── models/             # Modèles MongoDB
│   │   ├── routes/             # Routes API
│   │   ├── middleware/         # Middleware personnalisés
│   │   └── utils/              # Utilitaires
│   ├── scripts/                # Scripts utilitaires
│   └── uploads/                # Fichiers uploadés
├── 🐳 docker-compose.yml        # Configuration Docker
├── 📚 docs/                     # Documentation
└── 🧪 tests/                    # Tests globaux
```

## 🎨 Design System

### Palette de Couleurs
- **Primary** : #2563EB (Bleu Infirmy)
- **Secondary** : #22C55E (Vert)
- **Accent** : #06B6D4 (Cyan)
- **Success** : #10B981
- **Warning** : #F59E0B
- **Error** : #EF4444

### Typographie
- **Titres** : Inter (700-800)
- **Corps** : Source Sans 3
- **Monospace** : JetBrains Mono

### Composants
- **Design Mobile-First** avec Vuetify 3
- **Responsive** sur tous les appareils
- **Accessible** (WCAG AA)
- **Thème sombre/clair** automatique

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation production
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
npm run lint         # Vérification ESLint
npm run format       # Formatage Prettier
```

### Backend
```bash
npm run dev          # Serveur de développement
npm run start        # Serveur de production
npm run test         # Tests Jest
npm run init-db      # Initialisation base de données
npm run lint         # Vérification ESLint
```

## 🌐 Internationalisation

L'application supporte actuellement :
- 🇫🇷 **Français** (langue par défaut)
- 🇬🇧 **Anglais** (fallback)

**Ajout de nouvelles langues** : Facile via les fichiers de traduction dans `frontend/src/locales/`

## 🗺️ Fonctionnalités Cartographiques

- **OpenStreetMap** : Cartes gratuites et open source
- **Leaflet** : Bibliothèque JavaScript légère
- **Géolocalisation** : Détection automatique de la position
- **Recherche par zone** : Rayon de recherche configurable
- **Marqueurs interactifs** : Infirmiers disponibles

## 🔐 Sécurité et Authentification

### Authentification
- **JWT** : Access Token (15min) + Refresh Token (7 jours)
- **Bcrypt** : Hashage sécurisé des mots de passe
- **Rate Limiting** : Protection contre les attaques par force brute
- **Validation** : Sanitisation des entrées utilisateur

### Sécurité
- **Helmet** : Headers de sécurité HTTP
- **CORS** : Configuration restrictive
- **Validation** : Express Validator pour les données
- **HTTPS** : Obligatoire en production

## 📊 Base de Données

### Modèles Principaux
- **Users** : Patients et infirmiers
- **Appointments** : Rendez-vous et soins
- **Services** : Types de soins proposés
- **Reviews** : Évaluations et commentaires
- **Payments** : Transactions et facturation

### Indexation
- **Géospatial** : Recherche par proximité
- **Textuelle** : Recherche par nom/spécialité
- **Temporelle** : Optimisation des requêtes de planning

## 🧪 Tests

### Tests Unitaires
- **Frontend** : Vitest + Vue Test Utils
- **Backend** : Jest + Supertest
- **Coverage** : Objectif 80%+

### Tests E2E
- **Cypress** : Scénarios utilisateur complets
- **Workflows** : Inscription, connexion, prise de RDV
- **Responsive** : Tests sur différentes tailles d'écran

## 🚀 Déploiement

### Environnements
- **Development** : Local avec hot reload
- **Staging** : Pré-production pour tests
- **Production** : Serveurs de production

### Docker
```bash
# Build des images
docker-compose build

# Démarrage des services
docker-compose up -d

# Logs en temps réel
docker-compose logs -f
```

### Variables d'Environnement
```bash
# Frontend
VITE_API_URL=https://api.infirmy.com
VITE_APP_TITLE=Infirmy
VITE_DEV_MODE=false

# Backend
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/infirmy
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
```

## 📈 Monitoring et Observabilité

### Logs
- **Morgan** : Logs HTTP structurés
- **Winston** : Logs applicatifs (prévu)
- **Centralisation** : ELK Stack (prévu)

### Métriques
- **Performance** : Temps de réponse API
- **Erreurs** : Taux d'erreur et types
- **Utilisation** : Nombre d'utilisateurs actifs

### Alertes
- **SLA** : Temps de réponse > 2s
- **Erreurs** : Taux d'erreur > 5%
- **Disponibilité** : Uptime < 99.9%

## 🔮 Roadmap et Évolutions

### Version 1.5 (Q1 2024)
- [ ] **Notifications push** en temps réel
- [ ] **Chat intégré** patient-infirmier
- [ ] **Paiement en ligne** (Stripe)
- [ ] **Application mobile** React Native

### Version 2.0 (Q2 2024)
- [ ] **IA pour la correspondance** patient-infirmier
- [ ] **Vidéo-consultation** intégrée
- [ ] **Gestion des ordonnances** électroniques
- [ ] **Intégration** avec les systèmes de santé

### Version 2.5 (Q3 2024)
- [ ] **PWA** (Progressive Web App)
- [ ] **Mode hors ligne** pour les infirmiers
- [ ] **Analytics avancés** et reporting
- [ ] **API GraphQL** pour les développeurs

## 🤝 Contribution

Nous accueillons toutes les contributions ! Voici comment participer :

### Types de Contribution
- 🐛 **Bug Reports** : Signaler des problèmes
- 💡 **Feature Requests** : Proposer des améliorations
- 📝 **Documentation** : Améliorer la documentation
- 🔧 **Code** : Développer de nouvelles fonctionnalités
- 🧪 **Tests** : Ajouter des tests

### Processus de Contribution
1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Standards de Code
- **ESLint** + **Prettier** pour la qualité
- **Conventional Commits** pour les messages
- **Tests** obligatoires pour les nouvelles fonctionnalités
- **Documentation** mise à jour

## 📚 Documentation

- **API** : [docs.infirmy.com/api](https://docs.infirmy.com/api)
- **Frontend** : [docs.infirmy.com/frontend](https://docs.infirmy.com/frontend)
- **Backend** : [docs.infirmy.com/backend](https://docs.infirmy.com/backend)
- **Déploiement** : [docs.infirmy.com/deploy](https://docs.infirmy.com/deploy)

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE) - voir le fichier LICENSE pour plus de détails.

## 📞 Support et Contact

### Support Technique
- **Email** : support@infirmy.com
- **Documentation** : [docs.infirmy.com](https://docs.infirmy.com)
- **Issues** : [GitHub Issues](https://github.com/infirmy/infirmy/issues)
- **Discord** : [discord.gg/infirmy](https://discord.gg/infirmy)

### Équipe
- **Product Owner** : product@infirmy.com
- **Lead Developer** : dev@infirmy.com
- **Design** : design@infirmy.com

### Réseaux Sociaux
- **LinkedIn** : [linkedin.com/company/infirmy](https://linkedin.com/company/infirmy)
- **Twitter** : [@infirmy_app](https://twitter.com/infirmy_app)
- **Facebook** : [facebook.com/infirmy](https://facebook.com/infirmy)

## 🙏 Remerciements

- **Vue.js Team** pour le framework exceptionnel
- **Vuetify Team** pour les composants UI
- **Express.js Team** pour le framework backend
- **MongoDB Team** pour la base de données
- **OpenStreetMap** pour les cartes gratuites
- **Tous nos contributeurs** open source

## ⭐ Star History

Si ce projet vous plaît, n'oubliez pas de lui donner une ⭐ sur GitHub !

---

**Infirmy** - Révolutionner les soins infirmiers à domicile, ensemble ! 🏥✨

*Développé avec ❤️ par l'équipe Infirmy*
