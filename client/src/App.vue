<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { RouterLink, RouterView } from 'vue-router'
const theme=useTheme()
const isDark=computed(()=>theme.global.current.value.dark)
function toggleTheme(){ theme.global.name.value = isDark.value ? 'light' : 'dark' }
const user=ref(null)
function logout(){ localStorage.removeItem('user'); localStorage.removeItem('token'); user.value=null }
onMounted(()=>{ try{ const u=localStorage.getItem('user'); if(u) user.value=JSON.parse(u) }catch{}; window.addEventListener('veloria-auth',()=>{ try{ const u=localStorage.getItem('user'); if(u) user.value=JSON.parse(u) }catch{} }) })
</script>
<template>
  <v-app>
    <v-app-bar flat :elevation="0" class="app-bar" density="comfortable">
      <v-container class="d-flex align-center justify-space-between px-0">
        <RouterLink to="/" class="brand d-flex align-center">
          <v-avatar size="28" class="me-2 rounded-xl brand-logo"><img src="/logo.svg" alt="Veloria"/></v-avatar>
          <span class="brand-name">Veloria Aesthetics</span>
        </RouterLink>

        <nav class="d-none d-md-flex align-center">
          <RouterLink class="nav-link" to="/">Accueil</RouterLink>
          <RouterLink class="nav-link" to="/about">À propos</RouterLink>
          <RouterLink class="nav-link" to="/services">Services & tarifs</RouterLink>
          <RouterLink class="nav-link" to="/faq">FAQ</RouterLink>
          <RouterLink class="nav-link" to="/reviews">Avis</RouterLink>
          <v-btn class="ms-4" color="primary" variant="elevated" rounded="lg" :to="{path:'/booking'}" size="small">Prendre rendez‑vous</v-btn>
        </nav>

        <div class="d-flex align-center">
          <v-btn icon class="ms-1" @click="toggleTheme" :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'">
            <v-icon size="22">{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>

          <template v-if="user">
            <v-menu>
              <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" class="user-btn">
                  <v-avatar size="28" class="me-2"><img :src="user.avatar || '/avatars/a2.svg'" alt="Avatar"/></v-avatar>
                  <span class="d-none d-sm-inline">{{ user.name||user.email }}</span>
                </v-btn>
              </template>
              <v-list>
                <v-list-item title="Se déconnecter" @click="logout"/>
              </v-list>
            </v-menu>
          </template>
          <RouterLink v-else class="nav-link ms-2" to="/auth">Connexion</RouterLink>
        </div>
      </v-container>
    </v-app-bar>

    <v-main><RouterView/></v-main>
  </v-app>
</template>

<style scoped>
.app-bar{ 
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(var(--v-theme-outline), .6);
  background: color-mix(in oklab, rgb(var(--v-theme-surface)) 92%, transparent);
}
.brand-logo{ background: rgba(0,0,0,0.02); }
.brand-name{
  font-weight: 800;
  letter-spacing: .3px;
  color: rgb(var(--v-theme-on-surface));
}
.nav-link{
  padding: 10px 14px;
  margin: 0 2px;
  border-radius: 10px;
  color: rgb(var(--v-theme-on-surface));
  opacity: .9;
  transition: background .2s ease, opacity .2s ease, color .2s ease;
}
.nav-link:hover{
  background: rgb(var(--v-theme-primary-container));
  opacity: 1;
}
.user-btn{ text-transform: none; }

@media (max-width: 960px){
  .brand-name{ font-weight: 800; font-size: 14px; }
}
</style>
