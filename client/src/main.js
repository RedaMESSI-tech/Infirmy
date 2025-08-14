import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labs
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#D4A574',
          secondary: '#E8B4B8',
          accent: '#F5E6D3',
          surface: '#FDFBF7',
          'surface-variant': '#F8F4F0',
          background: '#FFFFFF',
          'on-primary': '#2C1810',
          'on-secondary': '#2C1810',
          'on-surface': '#2C1810',
          'on-background': '#2C1810',
          outline: '#D4A574',
          'primary-container': '#F0E6D6',
          'secondary-container': '#F5E6E8',
          'on-primary-container': '#2C1810',
          'on-secondary-container': '#2C1810',
          error: '#B71C1C',
          'on-error': '#FFFFFF',
          success: '#2E7D32',
          'on-success': '#FFFFFF',
          warning: '#F57C00',
          'on-warning': '#FFFFFF',
          info: '#1976D2',
          'on-info': '#FFFFFF',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#D4A574',
          secondary: '#E8B4B8',
          accent: '#2C1810',
          surface: '#1A1A1A',
          'surface-variant': '#2D2D2D',
          background: '#121212',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-surface': '#FFFFFF',
          'on-background': '#FFFFFF',
          outline: '#D4A574',
          'primary-container': '#3D2E1F',
          'secondary-container': '#3D2E2F',
          'on-primary-container': '#FFFFFF',
          'on-secondary-container': '#FFFFFF',
          error: '#EF5350',
          'on-error': '#000000',
          success: '#66BB6A',
          'on-success': '#000000',
          warning: '#FF9800',
          'on-warning': '#000000',
          info: '#42A5F5',
          'on-info': '#000000',
        }
      }
    }
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; font-weight: 600;'
    },
    VCard: {
      style: 'border-radius: 12px;'
    },
    VTextField: {
      variant: 'outlined'
    },
    VSelect: {
      variant: 'outlined'
    },
    VTextarea: {
      variant: 'outlined'
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
