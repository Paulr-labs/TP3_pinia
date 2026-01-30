# Projet Fullstack : Gestion de Librairie 

**Backend :**
* Java 17
* Spring Boot 3 (Web, Security, Data JPA)
* H2 Database (Base de données en mémoire)
* JWT (JSON Web Token) pour l'authentification
* BCrypt pour le hachage des mots de passe

**Frontend :**
* Vue.js 3 (Composition API)
* TypeScript
* Vite (Build tool)
* Pinia (Gestion d'état)
* Vue Router (Navigation)
* Axios (Requêtes HTTP)

## Prérequis

* JDK 17 ou supérieur
* Node.js (v18 ou supérieur) et npm

## Instructions de Lancement

Il faut lancer le Backend **ET** le Frontend dans deux terminaux séparés.

### 1. Lancer le Backend (API)

Ouvrez un terminal dans le dossier `backend` :

```bash
cd backend
./mvnw spring-boot:run
```
Dans le backend j'ai créer un script qui s'éxecute au démarrage, il crée un utilisateur admin: login --> `admin` psswd --> `admin123`


Ouvrez un nouveau terminal dans le dossier `frontend` :

```bash
npm install
npm run dev
```
L'application sera accessible sur : http://localhost:5173
