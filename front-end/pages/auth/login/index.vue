<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '~/models'
import { useAuthUser } from "#imports"

definePageMeta({
  layout: 'auth',
})

const username = ref('')
const password = ref('')
const error = ref('')

const { setUser } = useAuthUser()

async function login() {
    try {
        const apiurl = useRuntimeConfig().public.apiUrl
        const user = await $fetch<User>(`${apiurl}/auth/login`, {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value
            },
            credentials: 'include',
        })

        if(user) {
            // Redirection après connexion réussie
            setUser(user)
            navigateTo('/')
        } else {
            // Gérer l'erreur de connexion
            error.value = 'Nom d\'utilisateur ou mot de passe incorrect'
            setTimeout(() => {
                error.value = ''
            }, 3000)
        }
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
  <div
    class="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl p-10"
  >
    <h2 class="text-3xl font-extrabold text-green-900 mb-8 text-center">
      Connexion
    </h2>

    <form @submit.prevent="login" class="space-y-6">
      <div>
        <label for="username" class="block text-green-900 font-semibold mb-2"
          >Nom d'utilisateur</label
        >
        <input
          v-model="username"
          id="username"
          type="text"
          required
          class="w-full px-5 py-3 border border-green-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder="Nom d'utilisateur"
        />
      </div>

      <div>
        <label for="password" class="block text-green-900 font-semibold mb-2"
          >Mot de passe</label
        >
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="w-full px-5 py-3 border border-green-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition"
      >
        Se connecter
      </button>
    </form>

    <p class="mt-6 text-center text-green-900 font-medium">
      Pas encore de compte ?
      <NuxtLink
        to="/auth/register"
        class="text-green-700 hover:text-green-900 underline font-semibold"
        >Inscription</NuxtLink
      >
    </p>
    <p class="mt-4 text-red-600 text-center">{{ error }}</p>
  </div>
</template>

function definePageMeta(arg0: { layout: string }) {
  throw new Error('Function not implemented.')
}
