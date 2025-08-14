import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Rechercher from '../views/Rechercher.vue'
import Tarifs from '../views/Tarifs.vue'
import Faq from '../views/Faq.vue'
import Contact from '../views/Contact.vue'
import APropos from '../views/APropos.vue'
import PatientDashboard from '../views/PatientDashboard.vue'
import NurseDashboard from '../views/NurseDashboard.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Legal from '../views/Legal.vue'
import Security from '../views/Security.vue'

const r = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register, alias: ['/nurse/join'] },
    { path: '/rechercher', component: Rechercher },
    { path: '/tarifs', component: Tarifs },
    { path: '/faq', component: Faq },
    { path: '/contact', component: Contact },
    { path: '/a-propos', component: APropos },
    { path: '/patient', component: PatientDashboard },
    { path: '/infirmier', component: NurseDashboard },
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Profile },
    { path: '/legal', component: Legal, alias: ['/terms','/cookies'] },
    { path: '/security', component: Security, alias: ['/privacy','/status'] },
    
    // Redirects for backward compatibility
    { path: '/about', redirect: '/a-propos' },
    { path: '/pricing', redirect: '/tarifs' },
    { path: '/search', redirect: '/rechercher' },
    
    // Catch-all route
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default r
