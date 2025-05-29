<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Client } from '~/models';
import { useAuthUser } from "#imports";

const { user } = useAuthUser();

onMounted(() => {
    const btnClose = document.querySelector('.btn-close');

    btnClose?.addEventListener('click', () => {
        const sidebarClients = document.querySelector('.sidebar-clients');
        sidebarClients?.classList.add('hidden');
    })
})

const formClient = ref<Client>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    comments: '',
    status: '',
    authsId: user.value?.id
})

async function AddClient() {
    try {
        const { data } = await useFetch('http://localhost:3001/clients/create', {
            method: 'POST',
            body: formClient.value,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });

        console.log('Client added:', data.value);

        await refreshNuxtData();
    }
    catch (error) {
        console.error('Error adding client:', error);
    }
}

</script>

<template>
    <div class="sidebar-clients hidden fixed top-0 right-0 w-96 h-screen bg-white shadow-lg border-l z-50 p-6 overflow-y-auto transition-transform duration-300 ease-in-out translate-x-0 rounded-2xl">
        <div class="flex justify-between items-center mb-5">
            <h1 class="text-2xl">Ajouter un client</h1>
            <button class="btn-close cursor-pointer rounded-full bg-gray-300 h-7 w-7 flex items-center justify-center">X</button>
        </div>
        <div>
            <form @submit.prevent="AddClient" class="flex flex-col space-y-5">
                <div class="flex flex-col space-y-2">
                    <label for="nom" class="text-sm">Nom</label>
                    <input v-model="formClient.name" type="text" class="border border-gray-200 rounded-lg px-2 py-1" id="nom" placeholder="Nom du client" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="email" class="text-sm">Email</label>
                    <input v-model="formClient.email" type="email" class="border border-gray-200 rounded-lg px-2 py-1" id="email" placeholder="Email du client" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="telephone" class="text-sm">Téléphone</label>
                    <input v-model="formClient.phone" type="tel" class="border border-gray-200 rounded-lg px-2 py-1" id="telephone" placeholder="Téléphone du client" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="entreprise" class="text-sm">Entreprise</label>
                    <input v-model="formClient.company" type="text" class="border border-gray-200 rounded-lg px-2 py-1" id="entreprise" placeholder="Entreprise du client" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="adresse" class="text-sm">Adresse</label>
                    <input v-model="formClient.address" type="text" class="border border-gray-200 rounded-lg px-2 py-1" id="adresse" placeholder="Adresse du client" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="commentaires" class="text-sm">Commentaires</label>
                    <textarea v-model="formClient.comments" class="border border-gray-200 rounded-lg px-2 py-1" id="commentaires" placeholder="Commentaires du client"></textarea>
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="statut" class="text-sm">Statut</label>
                    <select v-model="formClient.status" class="border border-gray-200 rounded-lg px-2 py-1" id="statut">
                        <option value="">Sélectionner un statut</option>
                        <option value="Nouveau">Nouveau</option>
                        <option value="En cours">En cours</option>
                        <option value="Perdu">Perdu</option>
                        <option value="Gagné">Gagné</option>
                    </select>
                </div>
                <div class="flex flex-col space-y-2">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200">
                        Ajouter
                    </button>
                </div>
            </form>
        </div> 
    </div>
</template>