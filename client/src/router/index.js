import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Services from '../pages/Services.vue'
import FAQ from '../pages/FAQ.vue'
import Reviews from '../pages/Reviews.vue'
import Booking from '../pages/Booking.vue'
import Auth from '../pages/Auth.vue'
export default createRouter({ history:createWebHistory(), routes:[
  { path:'/', component:Home }, { path:'/about', component:About }, { path:'/services', component:Services },
  { path:'/faq', component:FAQ }, { path:'/reviews', component:Reviews }, { path:'/booking', component:Booking }, { path:'/auth', component:Auth }
] })
