# Infirmy Frontend

Plateforme de mise en relation patients ↔ infirmiers libéraux avec Vue 3 + Vite + Vuetify 3.

## 🚀 Technologies

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 5
- **UI Framework**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Maps**: Leaflet + OpenStreetMap
- **Internationalization**: Vue I18n
- **Language**: TypeScript

## 📋 Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd Infirmy_v1_4_12_green/frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp env.example .env
   # Modifier .env selon votre configuration
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants communs (Header, Footer, etc.)
│   ├── forms/          # Composants de formulaires
│   └── ui/             # Composants d'interface
├── layouts/            # Layouts de l'application
├── views/              # Pages de l'application
├── stores/             # Stores Pinia
├── services/           # Services API
├── plugins/            # Plugins (Vuetify, Axios, i18n)
├── types/              # Types TypeScript
├── utils/              # Utilitaires
└── assets/             # Ressources statiques
```

## 🎨 Design System

### Couleurs
- **Primary**: #2563EB (Bleu Infirmy)
- **Secondary**: #22C55E (Vert)
- **Accent**: #06B6D4 (Cyan)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typographie
- **Titres**: Inter (700-800)
- **Corps**: Source Sans 3

### Espacement
- Base: 8px
- Échelles: 8, 12, 16, 24, 32px

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run preview      # Prévisualiser la build de production

# Tests
npm run test         # Lancer les tests unitaires
npm run test:ui      # Interface de tests
npm run test:e2e     # Tests end-to-end

# Qualité du code
npm run lint         # Vérifier le code avec ESLint
npm run format       # Formater le code avec Prettier
npm run type-check   # Vérifier les types TypeScript
```

## 🌐 Internationalisation

L'application supporte le français (FR) et l'anglais (EN).

- **Locale par défaut**: Français
- **Fallback**: Anglais
- **Fichiers**: `src/plugins/i18n.ts`

## 🗺️ Configuration des cartes

- **Provider**: OpenStreetMap
- **Bibliothèque**: Leaflet
- **Vue**: Vue-Leaflet

## 🔐 Authentification

- **JWT**: Access Token + Refresh Token
- **Intercepteurs**: Gestion automatique des tokens expirés
- **Stores**: Pinia pour la gestion de l'état d'authentification

## 📱 Responsive Design

- **Mobile First**: Approche mobile-first
- **Breakpoints**: Vuetify 3 breakpoints
- **Composants**: Adaptés mobile et desktop

## ♿ Accessibilité

- **WCAG AA**: Conformité niveau AA
- **Rôles ARIA**: Navigation et composants
- **Focus visible**: Gestion du focus clavier
- **Contrastes**: Respect des ratios de contraste

## 🚀 Déploiement

### Production
```bash
npm run build
```

### Variables d'environnement de production
```bash
VITE_API_URL=https://api.infirmy.com
VITE_DEV_MODE=false
VITE_MOCK_API=false
```

## 🧪 Tests

### Tests unitaires
- **Framework**: Vitest
- **Coverage**: Configuration automatique
- **Mocks**: Mocks des services API

### Tests E2E
- **Framework**: Cypress
- **Scénarios**: Flux utilisateur complets

## 📊 Performance

- **Code Splitting**: Routes lazy-loaded
- **Bundle Analysis**: Analyse des chunks
- **Optimisations**: Images, CSS, JS optimisés
- **Lazy Loading**: Composants et images

## 🔍 SEO

- **Meta Tags**: Balises dynamiques
- **Open Graph**: Partage sur les réseaux sociaux
- **Sitemap**: Génération automatique
- **Robots.txt**: Configuration SEO

## 🛡️ Sécurité

- **HTTPS**: Obligatoire en production
- **CSP**: Content Security Policy
- **XSS Protection**: Protection contre les attaques XSS
- **CSRF Protection**: Protection CSRF

## 📈 Monitoring

- **Error Tracking**: Gestion des erreurs globales
- **Performance**: Métriques de performance
- **Analytics**: Intégration Google Analytics (optionnel)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 📞 Support

- **Email**: support@infirmy.com
- **Documentation**: [docs.infirmy.com](https://docs.infirmy.com)
- **Issues**: [GitHub Issues](https://github.com/infirmy/frontend/issues)

## 🙏 Remerciements

- **Vue.js Team** pour le framework
- **Vuetify Team** pour les composants UI
- **OpenStreetMap** pour les cartes
- **Leaflet** pour la bibliothèque de cartes
