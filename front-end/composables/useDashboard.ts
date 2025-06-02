// composables/useDashboard.ts
import { ref } from 'vue'

export function useDashboard() {
  const countByNouveau = ref<number>(0)
  const countByEnCours = ref<number>(0)
  const countByPerdu = ref<number>(0)
  const countByGagne = ref<number>(0)
  const dataMonth = ref<number[]>([])

  const totalMonth = 12

  const fetchDashboardData = async () => {
    const apiurl = useRuntimeConfig().public.apiUrl
    const { user } = useAuthUser()
    const authId = user.value?.id

    const nouveau = await $fetch<number>(`${apiurl}/clients/status/count?status=Nouveau&authsId=${authId}`)
    const enCours = await $fetch<number>(`${apiurl}/clients/status/count?status=En cours&authsId=${authId}`)
    const perdu = await $fetch<number>(`${apiurl}/clients/status/count?status=Perdu&authsId=${authId}`)
    const gagne = await $fetch<number>(`${apiurl}/clients/status/count?status=Gagné&authsId=${authId}`)

    countByNouveau.value = nouveau
    countByEnCours.value = enCours
    countByPerdu.value = perdu
    countByGagne.value = gagne

    const monthData: number[] = []
    for (let i = 1; i <= totalMonth; i++) {
      const count = await $fetch<number>(`${apiurl}/clients/month/count?month=${i}&authsId=${authId}`)
      monthData.push(count ?? 0)
    }
    dataMonth.value = monthData
  }

  return {
    countByNouveau,
    countByEnCours,
    countByPerdu,
    countByGagne,
    dataMonth,
    fetchDashboardData,
  }
}
