<script setup lang="ts">
import { useValidation, validationRules } from '@/composables/useValidation'
import type { Book, BookCategory } from '@/types'
import { BookCategoryLabels } from '@/types'

// Si fourni, mode edition
const props = defineProps<{
  book?: Book
}>()

const emit = defineEmits<{
  submit: [book: Omit<Book, 'id'>]
  cancel: []
}>()

const currentYear = new Date().getFullYear()

const { formData, errors, touched, handleBlur, handleInput, validateAll, isValid } = useValidation(
  {
    title: props.book?.title || '',
    author: props.book?.author || '',
    isbn: props.book?.isbn || '',
    price: props.book?.price || 0,
    description: props.book?.description || '',
    category: props.book?.category || '' as BookCategory,
    publicationYear: props.book?.publicationYear || currentYear,
    coverUrl: props.book?.coverUrl || ''
  },
  {
    title: [
      validationRules.required(),
      validationRules.minLength(2),
      validationRules.maxLength(200)
    ],
    author: [
      validationRules.required(),
      validationRules.minLength(2),
      validationRules.maxLength(100)
    ],
    isbn: [
      validationRules.required(),
      validationRules.isbn()
    ],
    price: [
      validationRules.required(),
      validationRules.positiveNumber()
    ],
    category: [
      validationRules.required('Sélectionnez une catégorie')
    ],
    publicationYear: [
      validationRules.required(),
      validationRules.year(1800, currentYear)
    ],
    description: [
        validationRules.maxLength(1000)
    ]
  }
)

function handleSubmit() {
  if (validateAll()) {
    emit('submit', { ...formData })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="book-form">
    <div class="form-group">
      <label for="title">Titre</label>
      <input
        id="title"
        v-model="formData.title"
        @blur="handleBlur('title')"
        @input="handleInput('title')"
        type="text"
        :class="{ invalid: touched.title && errors.title }"
      />
      <span v-if="touched.title && errors.title" class="error">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="author">Auteur</label>
      <input
        id="author"
        v-model="formData.author"
        @blur="handleBlur('author')"
        @input="handleInput('author')"
        type="text"
        :class="{ invalid: touched.author && errors.author }"
      />
      <span v-if="touched.author && errors.author" class="error">{{ errors.author }}</span>
    </div>

    <div class="form-group">
      <label for="isbn">ISBN</label>
      <input
        id="isbn"
        v-model="formData.isbn"
        @blur="handleBlur('isbn')"
        @input="handleInput('isbn')"
        type="text"
        placeholder="978-XXXXXXXXXX"
        :class="{ invalid: touched.isbn && errors.isbn }"
      />
      <span v-if="touched.isbn && errors.isbn" class="error">{{ errors.isbn }}</span>
    </div>

    <div class="form-group">
      <label for="category">Catégorie</label>
      <select
        id="category"
        v-model="formData.category"
        @blur="handleBlur('category')"
        @change="handleInput('category')"
        :class="{ invalid: touched.category && errors.category }"
      >
        <option value="" disabled>Choisir une catégorie</option>
        <option v-for="(label, key) in BookCategoryLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
      <span v-if="touched.category && errors.category" class="error">{{ errors.category }}</span>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="price">Prix (€)</label>
        <input
          id="price"
          v-model.number="formData.price"
          @blur="handleBlur('price')"
          @input="handleInput('price')"
          type="number"
          step="0.01"
          :class="{ invalid: touched.price && errors.price }"
        />
        <span v-if="touched.price && errors.price" class="error">{{ errors.price }}</span>
      </div>

      <div class="form-group">
        <label for="year">Année</label>
        <input
          id="year"
          v-model.number="formData.publicationYear"
          @blur="handleBlur('publicationYear')"
          @input="handleInput('publicationYear')"
          type="number"
          :class="{ invalid: touched.publicationYear && errors.publicationYear }"
        />
        <span v-if="touched.publicationYear && errors.publicationYear" class="error">{{ errors.publicationYear }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        @blur="handleBlur('description')"
        @input="handleInput('description')"
        rows="4"
        :class="{ invalid: touched.description && errors.description }"
      ></textarea>
      <div class="char-count" :class="{ 'text-danger': (formData.description?.length || 0) > 1000 }">
        {{ formData.description?.length || 0 }} / 1000
      </div>
      <span v-if="touched.description && errors.description" class="error">{{ errors.description }}</span>
    </div>

    <div class="form-actions">
      <button type="button" @click="emit('cancel')" class="btn-secondary">Annuler</button>
      <button type="submit" :disabled="!isValid" class="btn-primary">
        {{ props.book ? 'Modifier' : 'Créer' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.book-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-weight: bold;
}

input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input.invalid, select.invalid, textarea.invalid {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.875rem;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
}

.text-danger {
  color: red;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:disabled {
  background-color: #a0dcb9;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #ccc;
  color: black;
}
</style>