<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h1>Bienvenue aux Belles Lettres</h1>
    <p>Découvrez notre catalogue de classiques français.</p>
    <router-link to="/books" class="btn">Voir les livres</router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>