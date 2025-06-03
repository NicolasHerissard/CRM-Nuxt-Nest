<script setup lang="ts">

definePageMeta({
    layout: 'profil',
})

const { user } = useAuthUser()
const role = ref<string>('')

switch(user.value?.role) {
    case 0:
        role.value = 'Administrateur'
        break
    case 1:
        role.value = 'Commercial'
        break
    case 2:
        break
    case 3:
        break
    default:
        break
}

</script>

<template>
  <div class="min-h-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-400 p-8 text-white">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 p-6 flex items-center gap-4">
        <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
          <!-- Avatar -->
          <img  src="../../assets/img/lazarus.jpg" class="object-cover w-full h-full" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">{{ user?.username }}</h2>
          <UBadge class="bg-blue-400 rounded-2xl">{{ role }}</UBadge>
        </div>
      </div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <!-- Bloc d'informations -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Informations personnelles</h3>
          <ul class="space-y-1">
            <li><strong>Email :</strong> {{ user?.email }}</li>
            <li><strong>Téléphone :</strong> ...</li>
            <li><strong>Adresse :</strong> ...</li>
          </ul>
        </div>

        <!-- Bloc de configuration -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Préférences</h3>
          <ul class="space-y-1">
            <li><strong>Langue :</strong> Français</li>
            <li><strong>Notifications :</strong> Non</li>
            <li><strong>Thème : </strong></li>
          </ul>
        </div>

        <!-- Bloc sécurité -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm md:col-span-2">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Sécurité</h3>
          <ul class="space-y-1">
            <li><strong>Mot de passe modifié le :</strong> {{ user?.updated_at }}</li>
            <li><strong>Authentification 2FA :</strong> ...</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>