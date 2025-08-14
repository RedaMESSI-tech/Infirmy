import Home from '@/views/Home.vue'
import Rechercher from '@/views/Rechercher.vue'
import Tarifs from '@/views/Tarifs.vue'
import Faq from '@/views/Faq.vue'
import Contact from '@/views/Contact.vue'
import APropos from '@/views/APropos.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import { RouteRecordRaw } from 'vue-router'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/rechercher', name: 'rechercher', component: Rechercher },
  { path: '/tarifs', name: 'tarifs', component: Tarifs },
  { path: '/faq', name: 'faq', component: Faq },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/a-propos', name: 'a-propos', component: APropos },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  
  // Legacy routes for backward compatibility
  { path: '/about', redirect: '/a-propos' },
  { path: '/pricing', redirect: '/tarifs' },
  
  // Catch all route
  { path: '/:pathMatch(.*)*', redirect: '/' }
] as RouteRecordRaw[]
