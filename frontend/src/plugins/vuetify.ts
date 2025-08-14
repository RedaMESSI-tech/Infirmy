import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Design system tokens
const infirmyColors = {
  primary: '#2563EB',
  'primary-600': '#1E40AF',
  secondary: '#22C55E',
  accent: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  // Grays
  'gray-50': '#F8FAFC',
  'gray-100': '#F1F5F9',
  'gray-200': '#E2E8F0',
  'gray-300': '#CBD5E1',
  'gray-400': '#94A3B8',
  'gray-500': '#64748B',
  'gray-600': '#475569',
  'gray-700': '#334155',
  'gray-800': '#1E293B',
  'gray-900': '#0F172A'
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: infirmyColors.primary,
          secondary: infirmyColors.secondary,
          accent: infirmyColors.accent,
          success: infirmyColors.success,
          warning: infirmyColors.warning,
          error: infirmyColors.error,
          surface: infirmyColors['gray-50'],
          background: '#FFFFFF',
          'on-surface': infirmyColors['gray-900'],
          'on-background': infirmyColors['gray-900']
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: infirmyColors.primary,
          secondary: infirmyColors.secondary,
          accent: infirmyColors.accent,
          success: infirmyColors.success,
          warning: infirmyColors.warning,
          error: infirmyColors.error,
          surface: infirmyColors['gray-900'],
          background: infirmyColors['gray-800'],
          'on-surface': infirmyColors['gray-100'],
          'on-background': infirmyColors['gray-100']
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  defaults: {
    VCard: {
      rounded: 'lg',
      elevation: 2
    },
    VBtn: {
      rounded: 'lg',
      elevation: 1,
      variant: 'elevated'
    },
    VTextField: {
      rounded: 'lg',
      variant: 'outlined',
      density: 'comfortable'
    },
    VSelect: {
      rounded: 'lg',
      variant: 'outlined',
      density: 'comfortable'
    },
    VTextarea: {
      rounded: 'lg',
      variant: 'outlined',
      density: 'comfortable'
    }
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})
