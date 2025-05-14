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
    - 🧾 Liste des clients avec informations détaillées

    - ➕ Sidebar pour ajouter un nouveau client (affichée dynamiquement)

    - 🔄 Rafraîchissement des données après ajout

    - 🔍 Barre de recherche (statique pour l'instant)

    - 🎨 Statuts colorés (Nouveau, En cours, Validé, Annulé)

🔐 API attendue
    - GET /clients : Retourne tous les clients
    - GET /clients/count : Retourne le nombre de clients
    - POST /clients : Ajoute un nouveau client
    - (À venir) PUT, DELETE, GET /clients/:id