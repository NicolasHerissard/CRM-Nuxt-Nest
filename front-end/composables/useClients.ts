import type { Client } from "~/models"

export function useClients() {
    const clients = ref<Client[]>([])
    const countClient = ref<number>(0)
    const apiurl = useRuntimeConfig().public.apiUrl
    const { user } = useAuthUser()

    async function FetchClients() {
        clients.value = await $fetch<Client[]>(`${apiurl}/clients?authsId=${user.value?.id}`)
    }

    async function GetCountClient() {
        countClient.value = await $fetch<number>(`${apiurl}/clients/count?authsId=${user.value?.id}`)
    }

    async function HandleAddClient(formClient: Ref<Client>) {
        await useFetch('http://localhost:3001/clients/create', {
            method: 'POST',
            body: formClient.value,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }

    return {
        clients,
        countClient,
        FetchClients,
        GetCountClient,
        HandleAddClient,
    }
}