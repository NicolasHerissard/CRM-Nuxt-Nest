<script setup lang="ts">
import type { User } from '~/models'
definePageMeta({
  layout: 'auth',
})

import { ref } from 'vue'

const email = ref('')
const password = ref('')
const username = ref('')
const error = ref('')

const register = async () => {
  try {
    const apiurl = useRuntimeConfig().public.apiUrl
    const user = await $fetch<User>(`${apiurl}/auth/register`, {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
        email: email.value,
      },
      credentials: 'include',
    })

    navigateTo('/login')
  }
  catch (err: any) {
    error.value = err.message
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div class="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Créer un compte</h2>

    <form @submit.prevent="register" class="space-y-6">
      <div>
        <label for="username" class="block mb-2 text-gray-700 font-medium">Nom d'utilisateur</label>
        <input
          v-model="username"
          id="username"
          type="text"
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label for="email" class="block mb-2 text-gray-700 font-medium">Email</label>
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label for="password" class="block mb-2 text-gray-700 font-medium">Mot de passe</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
      >
        S’inscrire
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-700">
      Déjà un compte ?
      <NuxtLink to="/auth/login" class="text-green-700 font-semibold hover:underline">
        Connexion
      </NuxtLink>
    </p>
  </div>
</template>
