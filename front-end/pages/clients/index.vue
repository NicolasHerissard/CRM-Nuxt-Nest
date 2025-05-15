<script setup lang="ts">
    import { onMounted } from 'vue';
    import type { Client } from '~/models';
    
    const { data: clients } = await useFetch<Client[]>('http://localhost:3001/clients');
    const { data: countClients } = await useFetch<number>('http://localhost:3001/clients/count');

    onMounted(() => {
        const sidebarClients = document.querySelector('.sidebar-clients');
        const btnAjouts = document.querySelector('.btn-ajouts');

        btnAjouts?.addEventListener('click', () => {
            if(sidebarClients?.classList.contains('hidden')) {
                sidebarClients.classList.remove('hidden');
            } else {
                sidebarClients?.classList.add('hidden');
            }
        })
    })

    const searchClient = ref('');

    async function HandleSearchClients() {
        const url = searchClient.value
            ? `http://localhost:3001/clients/search?name=${searchClient.value}`
            : 'http://localhost:3001/clients';
        
        console.log('URL:', url);
        const { data } = await useFetch<Client[]>(url);

        if(data.value) {
            clients.value = data.value;
        }
    }
</script>

<template>
    <div class="h-full w-full space-y-5">
        <div class="flex p-2 justify-between items-center">
            <div>
                <h1 class="text-xl">Bienvenue Utilisateur !</h1>
            </div>
            <div>
                <select class="border border-gray-200 rounded-lg px-2 py-1">
                    <option value="">Profil</option>
                    <option value="">Voir mon Profil</option>
                    <option value="">Déconnexion</option>
                </select>
            </div>
        </div>
        <!-- Infos utilisateur -->
        <div class="border h-24 rounded-2xl shadow p-8 flex flex-col justify-center items-center">
            <div class="flex">
                <div class="rounded-full bg-blue-100 h-14 w-full flex justify-center items-center">
                    <p class="text-3xl">{{ countClients }}</p>
                </div>
                <div class="flex flex-row justify-center items-center ml-2">
                    <h1 class="text-xl">Total clients</h1>
                </div>
            </div>
        </div>
        <!-- Sidebar ajouts clients -->
        <SidebarClients />
        <!-- Tableau liste clients -->
        <div class="border h-screen p-4 shadow rounded-2xl">
            <div class="flex flex-row justify-between items-center">
                <h1 class="text-2xl">Clients</h1>
                <div class="flex flex-row space-x-5">
                    <button class="btn-ajouts bg-blue-500 text-white px-4 py-2 rounded-sm shadow hover:bg-blue-600 transition duration-200">
                        Ajouter un client
                    </button>
                    <input v-model="searchClient" @input="HandleSearchClients()" class="border border-gray-200 rounded-lg px-2 py-1" type="text" placeholder="Rechercher un client" />
                </div>
            </div>
            <div class="overflow-x-auto mt-5 p-5">
                <table class="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead class="bg-gray-100 sticky top-0">
                    <tr class="text-left text-sm text-gray-600 uppercase tracking-wider">
                        <th class="px-4 py-3">Nom</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Téléphone</th>
                        <th class="px-4 py-3">Entreprise</th>
                        <th class="px-4 py-3">Adresse</th>
                        <th class="px-4 py-3">Commentaires</th>
                        <th class="px-4 py-3">Statut</th>
                    </tr>
                    </thead>
                    <tbody class="text-gray-800 text-sm">
                        <tr v-for="(client, index) in clients" :key="index" class="border-t hover:bg-gray-50 transition-colors">
                            <td class="px-4 py-3 font-medium">{{ client.name }}</td>
                            <td class="px-4 py-3">{{ client.email }}</td>
                            <td class="px-4 py-3">{{ client.phone }}</td>
                            <td class="px-4 py-3">{{ client.company }}</td>
                            <td class="px-4 py-3">{{ client.address }}</td>
                            <td class="px-4 py-3 italic text-gray-500">{{ client.comments }}</td>
                            <td class="px-4 py-3">
                            <span v-if="client.status === 'Nouveau'" class="inline-flex items-center px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                {{ client.status }}
                            </span>
                            <span v-else-if="client.status === 'En cours'" class="inline-flex items-center px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                                🕒 {{ client.status }}
                            </span>
                            <span v-else-if="client.status === 'Perdu'" class="inline-flex items-center px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                                ❌ {{ client.status }}
                            </span>
                            <span v-else-if="client.status === 'Gagné'" class="inline-flex items-center px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                                ✅ {{ client.status }}
                            </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>