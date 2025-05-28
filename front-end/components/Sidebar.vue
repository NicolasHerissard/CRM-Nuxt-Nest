<script setup>
    
let items = [
    { name: 'Dashboard', path: '/' },
    { name: 'Clients', path: '/clients' },
    { name: 'Articles', path: '/articles' },
    { name: 'Factures / Devis', path: '/devis-factures' },
    { name: 'Tâches / Activités', path: '/taches' },
    { name: 'Ventes', path: '/ventes' },
]

</script>

<template>
    <div class="border-2 h-full w-50 p-5 rounded flex justify-center">
        <div class="">
            <h1 class="text-center mb-10 text-2xl">CRM</h1>
            <div class="flex flex-col space-y-5 w-full">
                <div class="w-full" v-for="(item, index) in items" :key="index">
                    <button class="border border-white shadow w-38 h-10 cursor-pointer rounded" @click="$router.push(item.path)">{{ item.name }}</button>
                </div>
            </div>
        </div>
    </div>
</template>