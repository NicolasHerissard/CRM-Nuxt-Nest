export function useProfil() {

    const apiurl = useRuntimeConfig().public.apiUrl
    const { user } = useAuthUser()
    let countConnexions = ref<number>(0)

    async function GetCountConnexions() {

        let authId = user.value?.id
        let month = new Date().getMonth() + 1

        countConnexions.value = await $fetch<number>(`${apiurl}/historique-connexion/count/month?month=${month}&authId=${authId}`, {
            method: 'GET',
            credentials: 'include',
        })
    }

    return {
        GetCountConnexions,
        countConnexions,
    }
}