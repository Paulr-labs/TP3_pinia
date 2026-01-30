import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { User, LoginCredentials, AuthResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // === STATE ===
  // On initialise depuis le localStorage pour éviter la déconnexion au refresh (F5)
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  // === GETTERS ===
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ROLE_ADMIN')
  const username = computed(() => user.value?.username || '')

  // === ACTIONS ===

  // Connexion
  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    
    const data = response.data
    // Stocker le token et l'utilisateur dans le state
    token.value = data.token
    user.value = { username: data.username, role: data.role }
    
    // Persister dans localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // Deconnexion
  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Vérifier si le token est encore valide (à appeler au démarrage)
  async function checkAuth(): Promise<boolean> {
    if (!token.value) return false
    
    try {
      // On demande au serveur "Qui suis-je ?"
      const response = await api.get<User>('/auth/me')
      user.value = response.data
      return true
    } catch {
      // Si le serveur répond erreur (ex: 401 token expiré), on déconnecte
      logout()
      return false
    }
  }

  return {
    // State
    token,
    user,
    // Getters
    isAuthenticated,
    isAdmin,
    username,
    // Actions
    login,
    logout,
    checkAuth
  }
})