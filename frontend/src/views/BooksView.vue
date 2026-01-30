<script setup lang="ts">
import { onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'
import { BookCategoryLabels } from '@/types'

const booksStore = useBooksStore()

onMounted(() => {
  booksStore.fetchBooks()
})
</script>

<template>
  <div class="container">
    <h2>Notre Catalogue</h2>

    <div class="filters">
      <input 
        v-model="booksStore.searchQuery" 
        placeholder="Rechercher..." 
      />
      <select v-model="booksStore.selectedCategory">
        <option :value="null">Toutes catégories</option>
        <option v-for="(label, key) in BookCategoryLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>

    <div v-if="booksStore.loading">Chargement...</div>

    <div v-else class="book-list">
      <div v-for="book in booksStore.filteredBooks" :key="book.id" class="book-card">
        <h3>{{ book.title }}</h3>
        <p><i>{{ book.author }}</i></p>
        <p>{{ BookCategoryLabels[book.category] }} - {{ book.price }} €</p>
        <router-link :to="'/books/' + book.id">Voir détails</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { padding: 1rem; }
.filters { margin-bottom: 1rem; display: flex; gap: 10px; }
.book-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.book-card { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; }
</style>