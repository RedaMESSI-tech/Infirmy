import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './styles.css'

// Create app
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)

// Initialize stores after Pinia is installed
const { useAuthStore, useUIStore } = await import('./stores')
const authStore = useAuthStore()
const uiStore = useUIStore()

// Initialize stores
await authStore.initialize()
await uiStore.initialize()

// Apply initial theme to document
document.body.classList.add(`theme--${uiStore.theme}`)

// Suppress noisy Vuetify dev warning
if (import.meta.env.DEV) {
  const re = /Slot "default" invoked outside of the render function/
  app.config.warnHandler = (msg) => {
    if (re.test(String(msg))) return
    console.warn(msg)
  }
}

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
  
  // Show user-friendly error message
  uiStore.showError('Une erreur inattendue s\'est produite. Veuillez réessayer.')
}

// Mount app
app.mount('#app')
