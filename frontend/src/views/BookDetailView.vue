<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import { BookCategoryLabels } from '@/types'

const route = useRoute()
const booksStore = useBooksStore()

onMounted(() => {
  // Le + convertit le string en number
  booksStore.fetchBook(+route.params.id)
})
</script>

<template>
  <div v-if="booksStore.currentBook" class="detail">
    <h2>{{ booksStore.currentBook.title }}</h2>
    <h3>Par {{ booksStore.currentBook.author }}</h3>
    <p><strong>Catégorie:</strong> {{ BookCategoryLabels[booksStore.currentBook.category] }}</p>
    <p><strong>Année:</strong> {{ booksStore.currentBook.publicationYear }}</p>
    <p><strong>ISBN:</strong> {{ booksStore.currentBook.isbn }}</p>
    <p><strong>Prix:</strong> {{ booksStore.currentBook.price }} €</p>
    <p class="desc">{{ booksStore.currentBook.description }}</p>
    <router-link to="/books">Retour</router-link>
  </div>
</template>

<style scoped>
.detail { max-width: 600px; margin: 2rem auto; padding: 1rem; border: 1px solid #eee; }
.desc { margin: 1rem 0; font-style: italic; }
</style>