import type { HistoryConnexion } from "~/models"

export function useAuthHistory() {

    const apiurl = useRuntimeConfig().public.apiUrl
    const { user } = useAuthUser()

    async function postHistory(historyConnexion: HistoryConnexion) {
        await $fetch(`${apiurl}/historique-connexion`, {
            method: 'POST',
            body: historyConnexion,
            credentials: 'include',
        })
    }

    return {
        postHistory,
    }
}