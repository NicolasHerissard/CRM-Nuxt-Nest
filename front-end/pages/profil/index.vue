<script setup lang="ts">

definePageMeta({
    layout: 'profil',
})

const { user } = useAuthUser()
const role = ref<string>('')
const { GetCountConnexions, countConnexions } = useProfil()
const { countClient, GetCountClient } = useClients()

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

onMounted(() => {
    GetCountConnexions()
    GetCountClient()
})

</script>

<template>
  <div class="min-h-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-400 p-8 text-white">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden">
      
      <!-- En-tête -->
      <div class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 p-6 flex items-center gap-4">
        <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
          <img src="../../assets/img/lazarus.jpg" class="object-cover w-full h-full" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">{{ user?.username }}</h2>
          <UBadge class="bg-blue-400 rounded-2xl">{{ role }}</UBadge>
        </div>
      </div>

      <!-- Corps -->
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">

        <!-- Infos personnelles -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Informations personnelles</h3>
          <ul class="space-y-1">
            <li><strong>Email :</strong> {{ user?.email }}</li>
            <li><strong>Téléphone :</strong> ...</li>
            <li><strong>Adresse :</strong> ...</li>
          </ul>
          <UButton size="sm" class="mt-4" label="Modifier" />
        </div>

        <!-- Préférences -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Préférences</h3>
          <ul class="space-y-1">
            <li><strong>Langue :</strong> Français</li>
            <li><strong>Notifications :</strong> Activées</li>
            <li><strong>Thème :</strong> Système</li>
          </ul>
          <UButton size="sm" class="mt-4" label="Modifier" />
        </div>

        <!-- Sécurité -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm md:col-span-2">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Sécurité</h3>
          <ul class="space-y-1">
            <li><strong>Mot de passe modifié le :</strong> {{ user?.updated_at }}</li>
            <li><strong>Authentification 2FA :</strong> Non activée</li>
          </ul>
          <div class="flex gap-4 mt-4">
            <UButton label="Changer le mot de passe" variant="soft" />
            <UButton label="Activer 2FA" variant="soft" />
          </div>
        </div>

        <!-- Statistiques personnelles -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm md:col-span-2">
          <h3 class="text-lg font-semibold text-emerald-600 mb-2">Activité</h3>
          <ul class="space-y-1">
            <li><strong>Nombre de connexions :</strong> {{ countConnexions }} ce mois-ci</li>
            <li><strong>Dernière connexion :</strong> Il y a 2 jours</li>
            <li><strong>Clients créés :</strong> {{ countClient }}</li>
          </ul>
        </div>

        <!-- Actions rapides -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <UButton icon="i-heroicons-arrow-right-on-rectangle" label="Se déconnecter" />
        </div>
      </div>
    </div>
  </div>
</template>
