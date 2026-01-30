<script setup lang="ts">
import { onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()

onMounted(() => {
  booksStore.fetchBooks()
})

async function handleDelete(id: number) {
  if(confirm("Supprimer ce livre ?")) {
    await booksStore.deleteBook(id)
  }
}
</script>

<template>
  <div class="admin">
    <h2>Administration</h2>
    <router-link to="/admin/books/new" class="add-btn">Ajouter un livre</router-link>
    
    <table border="1" cellpadding="10" cellspacing="0" style="margin-top: 1rem; width: 100%;">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in booksStore.books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <router-link :to="'/admin/books/' + book.id + '/edit'">Modifier</router-link>
            |
            <button @click="handleDelete(book.id!)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin { padding: 1rem; }
.add-btn { background: #333; color: white; padding: 5px 10px; text-decoration: none; }
</style>