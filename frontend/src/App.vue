<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Accueil</RouterLink> |
      <RouterLink to="/books">Livres</RouterLink> |
      
      <span v-if="!authStore.isAuthenticated">
        <RouterLink to="/login">Connexion</RouterLink>
      </span>
      
      <span v-else>
        <span v-if="authStore.isAdmin">
           | <RouterLink to="/admin">Admin</RouterLink>
        </span>
         | <a href="#" @click.prevent="logout">Déconnexion ({{ authStore.username }})</a>
      </span>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav { padding: 1rem; background: #f4f4f4; margin-bottom: 2rem; }
a { text-decoration: none; color: #333; margin: 0 5px; }
a.router-link-active { font-weight: bold; color: #42b983; }
</style>