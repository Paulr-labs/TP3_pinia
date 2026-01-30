<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import BookForm from '@/components/BookForm.vue'
import type { Book } from '@/types'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const bookToEdit = ref<Book | undefined>(undefined)

onMounted(async () => {
  // Si on a un ID dans l'URL, c'est une modification
  if (route.params.id) {
    await booksStore.fetchBook(+route.params.id)
    if (booksStore.currentBook) {
      bookToEdit.value = booksStore.currentBook
    }
  }
})

async function saveBook(bookData: any) {
  if (bookToEdit.value) {
    // Mode Update
    await booksStore.updateBook(bookToEdit.value.id!, bookData)
  } else {
    // Mode Create
    await booksStore.createBook(bookData)
  }
  router.push('/admin')
}
</script>

<template>
  <div class="form-view">
    <h2>{{ bookToEdit ? 'Modifier' : 'Nouveau Livre' }}</h2>
    <BookForm 
      :book="bookToEdit" 
      @submit="saveBook" 
      @cancel="router.push('/admin')" 
    />
  </div>
</template>

<style scoped>
.form-view { padding: 2rem; }
</style>