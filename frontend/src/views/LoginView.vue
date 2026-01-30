<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    await authStore.login({ username: username.value, password: password.value })
    // Redirection vers l'accueil ou la page précédente
    router.push('/')
  } catch (e) {
    error.value = "Identifiants incorrects"
  }
}
</script>

<template>
  <div class="login-page">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Username:</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
.login-page { max-width: 300px; margin: 2rem auto; }
div { margin-bottom: 1rem; }
label { display: block; }
input { width: 100%; padding: 5px; }
.error { color: red; }
</style>