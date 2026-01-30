import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: () => import('../views/BookDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guest: true } // Accessible uniquement aux non-connectés
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/books/new',
      name: 'book-create',
      component: () => import('../views/BookFormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/books/:id/edit',
      name: 'book-edit',
      component: () => import('../views/BookFormView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

// Guard global (Vérification avant chaque changement de page)
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // 1. Vérifier l'authentification au premier chargement (si token présent mais pas user)
  if (authStore.token && !authStore.user) {
    await authStore.checkAuth()
  }

  // 2. Route nécessitant une authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // On redirige vers login en gardant en mémoire où il voulait aller
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // 3. Route nécessitant le rôle admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: 'home' } // Ou une page "Accès interdit"
  }

  // 4. Route réservée aux invités (ex: login)
  if (to.meta.guest && authStore.isAuthenticated) {
    return { name: 'home' } // Un user connecté n'a rien à faire sur /login
  }
})

export default router
