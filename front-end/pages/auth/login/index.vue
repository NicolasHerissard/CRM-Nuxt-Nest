<script setup lang="ts">
import { ref } from 'vue'
import { useAuthUser } from "#imports"
import { useAuth } from '~/composables/useAuth'
import type { HistoryConnexion, User } from '~/models'

definePageMeta({
  layout: 'auth',
})

const username = ref('')
const password = ref('')
const error = ref('')
const visible = ref(false)
const { getDeviceType, getOS, getBrowser, getIP } = usePlatform()
const { Handlelogin } = useAuth() // Appel de la fonction useAuth pour récupérer les composants utilisés
const { postHistory } = useAuthHistory()

async function login() {
    try {
        const userData: User = await Handlelogin(username.value, password.value) // Appel de la fonction Handlelogin avec les paramètres de l'utilisateur

        if(userData) {
            const formHistory = ref<HistoryConnexion>({
            authId: userData.id,
            date: new Date(),
            ip_address: await getIP(),
            userAgent: navigator.userAgent,
            device: getDeviceType(navigator.userAgent),
            os: getOS(navigator.userAgent),
            browser: getBrowser(navigator.userAgent),
            })

            await postHistory(formHistory.value)
            navigateTo('/')
        } else {
            // Gérer l'erreur de connexion
            error.value = 'Nom d\'utilisateur ou mot de passe incorrect'
            showNotification()
        }
    }
    catch (err: any) {
      error.value = err.message // Gestion de l'erreur de connexion
      showNotification()
    }
}

function showNotification() {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
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
  </div>
  <div
      v-if="visible"
      class="fixed bottom-4 right-4 bg-green-100 text-green-900 px-4 py-3 rounded shadow transition-opacity"
    >
      {{ error }}
  </div>
</template>