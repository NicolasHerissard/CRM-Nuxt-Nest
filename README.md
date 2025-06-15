# CRM - Gestion de Clients

Une application CRM (Customer Relationship Management) simple permettant de gérer des clients : consultation, ajout, et affichage dynamique via une interface intuitive construite avec Nuxt 3 et TailwindCSS.

## 🧰 Tech Stack

- **Frontend :** [Nuxt 3](https://nuxt.com/) (Vue 3 + Composition API)
- **Style :** [Tailwind CSS](https://tailwindcss.com/)
- **Backend :** API REST [NestJS](https://nestjs.com/)
- **Base de données :** MySQL

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/NicolasHerissard/CRM-Nuxt-Nest.git
cd CRM-Nuxt-Nest

# Installer les dépendances
npm install
```

### 2. Démarrer le projet
```bash
npm run dev
```
Le projet sera accessible par défaut sur http://localhost:3000

## 🧠 Fonctionnalités 

- 🧾 **Liste des clients** avec informations détaillées (recherche, tri, pagination)
- ➕ **Ajout, modification et suppression de clients**
- 📄 **Liste des articles** (produits/services)
- ➕ **Ajout, modification et suppression d’articles**
- 🧾 **Création et gestion des factures** (sélection de client, ajout d’articles, calcul automatique du total)
- 📅 **Calendrier des rendez-vous** et gestion des tâches associées à chaque client
- 🔍 **Recherche globale** sur les clients, articles et factures
- 📊 **Tableau de bord** avec statistiques (nombre de clients, factures, chiffre d’affaires, etc.)
- 🔒 **Authentification** (connexion/déconnexion, gestion des droits d’accès)

## 🔐 API attendue

- `GET /clients` : Retourne tous les clients
- `GET /clients/count` : Retourne le nombre de clients
- `POST /clients` : Ajoute un nouveau client
- `PUT /clients/:id` : Modifie un client existant
- `DELETE /clients/:id` : Supprime un client
- `GET /articles` : Retourne tous les articles
- `POST /articles` : Ajoute un nouvel article
- `PUT /articles/:id` : Modifie un article
- `DELETE /articles/:id` : Supprime un article
- `GET /invoices` : Liste des factures
- `POST /invoices` : Création d’une facture
- `GET /appointments` : Liste des rendez-vous
- `POST /appointments` : Ajout d’un rendez-vous
- `GET /dashboard` : Statistiques pour le tableau de bord
- `POST /auth/login` : Connexion utilisateur

## 🔒 Sécurité & Authentification

L’API backend utilise **JWT (JSON Web Token)** pour sécuriser l’accès aux routes protégées.  
Lors de la connexion (`POST /auth/login`), un token JWT est généré et doit être envoyé dans l’en-tête `Authorization` (`Bearer <token>`) pour accéder aux ressources nécessitant une authentification.

- Les routes sensibles (création, modification, suppression) sont protégées par un middleware qui vérifie la validité du token JWT.
- Les droits d’accès sont gérés côté backend pour garantir que seuls les utilisateurs autorisés peuvent effectuer certaines actions.
- Les mots de passe sont stockés de façon sécurisée (hachage côté serveur).

Pour renforcer la sécurité de l’API, un système de **rate limiting** a été mis en place côté backend avec NestJS.  
Cela permet de limiter le nombre de requêtes qu’un utilisateur ou une IP peut effectuer sur une période donnée, afin de prévenir les attaques par force brute ou les abus.

- Le middleware de rate limit bloque temporairement les requêtes dépassant le seuil autorisé (ex : 100 requêtes/15 minutes par IP).
- Un message d’erreur approprié est retourné si la limite est atteinte.
- Cette protection s’applique notamment aux routes sensibles comme l’authentification et la création de ressources.

## 🏗️ Architecture & Modèle MVP

L’application suit le modèle **MVP (Model-View-Presenter)** pour organiser la logique métier et l’interface utilisateur :

- **Model** : Représente les données et la logique métier.  
  Dans ce projet, la logique métier (ex : gestion des clients, articles, factures) et les appels à l’API sont centralisés dans des **composables Nuxt** (`useClient`, `useArticle`, etc.).  
  Ces composables servent d’unique point d’accès pour manipuler les données et effectuer les requêtes vers le backend.

- **View** : Correspond aux composants Vue (pages et composants UI) qui affichent les données et gèrent l’interface utilisateur.

- **Presenter** : Les composables jouent le rôle d’intermédiaire (Presenter) entre la vue et le modèle.  
  Ils exposent des fonctions et des états réactifs que les composants Vue consomment, ce qui permet de séparer clairement la logique métier de la présentation.

**Avantages de cette approche :**
- Réutilisation facile de la logique métier dans plusieurs composants/pages.
- Code plus maintenable et testable.
- Séparation claire entre la gestion des données (composables) et l’affichage (Vue).

Exemple d’utilisation d’un composable dans un composant Vue :

```js
<script setup>
import { useClient } from '~/composables/useClient'

const { clients, fetchClients, addClient } = useClient()

onMounted(() => {
  fetchClients()
})
</script>
```