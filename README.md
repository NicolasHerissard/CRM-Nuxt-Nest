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

🧠 Fonctionnalités
    - 🧾 **Liste des clients** avec informations détaillées (recherche, tri, pagination)
    - ➕ **Ajout, modification et suppression de clients**
    - 📄 **Liste des articles** (produits/services)
    - ➕ **Ajout, modification et suppression d’articles**
    - 🧾 **Création et gestion des factures** (sélection de client, ajout d’articles, calcul automatique du total)
    - 📅 **Calendrier des rendez-vous** et gestion des tâches associées à chaque client
    - 🔍 **Recherche globale** sur les clients, articles et factures
    - 📊 **Tableau de bord** avec statistiques (nombre de clients, factures, chiffre d’affaires, etc.)
    - 🔒 **Authentification** (connexion/déconnexion, gestion des droits d’accès)

🔐 API attendue
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
