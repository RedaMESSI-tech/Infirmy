# Veloria Laser - Centre d'Épilation Laser

Un site web moderne, élégant et responsive pour un centre d'épilation laser professionnel.

## 🎯 Fonctionnalités Principales

### ✅ Fonctionnalités Implémentées

- **Bouton "Prendre rendez-vous" lisible** dans les deux thèmes (clair/sombre)
- **Icône dark/light dans la navbar** avec basculement automatique
- **Page d'accueil enrichie** avec laser6.jpg en deuxième visuel
- **Page "À propos" complète** avec beaucoup de contenu et d'images
- **Calendrier interactif** qui marque en bleu les jours réservés et affiche "Moi" à 09:00
- **Avatars corrigés** avec fallback SVG partout
- **Texte et contenu enrichi** sur toutes les pages clés

### 🌟 Pages Disponibles

1. **Accueil** - Hero section, avantages, technologie, services, témoignages
2. **À propos** - Histoire, équipe, technologie, valeurs, centre, certifications
3. **Services & Tarifs** - Zones d'épilation, tarifs détaillés, forfaits
4. **FAQ** - Questions fréquentes organisées par catégories
5. **Avis Clients** - Témoignages, statistiques, transformations
6. **Contact** - Formulaire, coordonnées, carte interactive
7. **Prise de Rendez-vous** - Calendrier interactif, formulaire complet
8. **Authentification** - Connexion/inscription avec gestion des comptes

## 🎨 Design et Interface

### Palette de Couleurs
- **Primaire** : Beige doré (#D4A574)
- **Secondaire** : Rose poudré (#E8B4B8)
- **Accent** : Blanc cassé (#F5E6D3)
- **Surface** : Blanc très cassé (#FDFBF7)
- **Texte** : Brun foncé (#2C1810)

### Thèmes
- **Mode clair** : Design épuré et professionnel
- **Mode sombre** : Interface moderne et reposante pour les yeux
- **Basculement automatique** avec icône dans la navbar

### Responsive Design
- **Mobile-first** approach
- **Adaptatif** pour tous les écrans
- **Navigation mobile** optimisée
- **Images responsives** avec fallbacks

## 🛠️ Technologies Utilisées

### Frontend
- **Vue.js 3** - Framework JavaScript moderne
- **Vuetify 3** - Composants Material Design
- **Vue Router** - Navigation entre pages
- **SCSS** - Styles avancés avec variables CSS
- **Day.js** - Gestion des dates pour le calendrier

### Fonctionnalités
- **Calendrier interactif** avec gestion des rendez-vous
- **Formulaires validés** avec gestion d'état
- **Authentification** avec stockage local
- **Thèmes dynamiques** avec persistance
- **Animations CSS** et transitions fluides

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd veloria_pro_v9

# Installer les dépendances
cd client
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Construit l'application pour la production
npm run preview      # Prévisualise la version de production
```

## 📱 Fonctionnalités Détaillées

### Calendrier de Réservation
- **Navigation mensuelle** avec boutons précédent/suivant
- **Jours réservés** marqués en bleu avec "Moi" à 09:00
- **Sélection de dates** avec validation
- **Horaires disponibles** avec sélection interactive
- **Légende claire** pour comprendre les différents états

### Système d'Authentification
- **Connexion** avec email/mot de passe
- **Inscription** avec formulaire complet
- **Gestion des sessions** avec localStorage
- **Connexion sociale** (Google, Facebook) - prête pour intégration
- **Validation des formulaires** en temps réel

### Gestion des Thèmes
- **Basculement automatique** entre clair/sombre
- **Persistance** des préférences utilisateur
- **Icône dynamique** dans la navbar
- **Couleurs adaptatives** pour tous les composants

## 🎯 Optimisations SEO

- **Métadonnées** complètes pour chaque page
- **Structure HTML sémantique** avec balises appropriées
- **Images optimisées** avec attributs alt
- **Navigation claire** et logique
- **Contenu riche** et informatif

## 📱 Compatibilité Mobile

- **Design responsive** pour tous les appareils
- **Navigation tactile** optimisée
- **Formulaires mobiles** adaptés
- **Calendrier mobile** fonctionnel
- **Performance** optimisée sur mobile

## 🔧 Configuration

### Variables d'Environnement
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Veloria Laser
```

### Personnalisation des Thèmes
Les thèmes sont configurables dans `src/main.js` :
- Couleurs personnalisées
- Typographie adaptée
- Composants par défaut
- Icônes Material Design

## 📊 Structure du Projet

```
veloria_pro_v9/
├── client/
│   ├── public/
│   │   ├── avatars/          # Avatars SVG avec fallbacks
│   │   ├── images/           # Images du site
│   │   └── favicon.svg       # Icône du site
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages de l'application
│   │   ├── router/           # Configuration des routes
│   │   ├── styles/           # Fichiers SCSS
│   │   ├── data/             # Données statiques
│   │   ├── App.vue           # Composant principal
│   │   └── main.js           # Point d'entrée
│   ├── package.json          # Dépendances
│   └── vite.config.js        # Configuration Vite
└── server/                    # API backend (optionnel)
```

## 🌟 Fonctionnalités Avancées

### Animations et Transitions
- **Effets de survol** sur les cartes et boutons
- **Animations d'entrée** pour les pages
- **Transitions fluides** entre les états
- **Parallax** sur les sections hero

### Accessibilité
- **Navigation au clavier** complète
- **Contraste optimisé** pour la lisibilité
- **Textes alternatifs** pour toutes les images
- **Structure sémantique** HTML5

### Performance
- **Chargement lazy** des images
- **Code splitting** automatique
- **Optimisation des bundles** avec Vite
- **Cache intelligent** des composants

## 🔮 Évolutions Futures

### Fonctionnalités Prévues
- **Système de notifications** push
- **Chat en ligne** avec support client
- **Gestion des rendez-vous** en temps réel
- **Intégration CRM** pour la gestion client
- **Paiement en ligne** sécurisé

### Améliorations Techniques
- **PWA** (Progressive Web App)
- **Service Worker** pour le cache offline
- **API GraphQL** pour les données
- **Tests automatisés** complets
- **CI/CD** automatisé

## 📞 Support et Contact

Pour toute question ou support technique :
- **Email** : contact@velorialaser.fr
- **Téléphone** : 01 23 45 67 89
- **Adresse** : 123 Avenue des Champs, 75008 Paris

## 📄 Licence

Ce projet est développé pour Veloria Laser. Tous droits réservés.

---

**Veloria Laser** - L'épilation définitive, en douceur ✨
