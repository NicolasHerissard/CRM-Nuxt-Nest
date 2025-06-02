<script setup lang="ts">
    import { useAuthUser } from "#imports";

    const { user } = useAuthUser();
    const { logout } = useAuth();

    async function HandleLogout() {
        await logout()

        navigateTo('/auth/login')
    }
</script>

<template>
    <div class="shadow-lg border-b bg-green-300">
        <div class="flex p-6 justify-between items-center rounded-2xl">
            <div class="flex items-center gap-2">
                <div class="flex flex-col">
                    <span class="text-xl">Utilisateur connecté : {{ user?.username }}</span>
                    <span class="text-sm text-gray-500">Email : {{ user?.email }}</span>
                </div>
            </div>
            <div>
                <button @click="HandleLogout" class="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
                    Déconnexion
                </button>
            </div>
        </div>
    </div>
</template>