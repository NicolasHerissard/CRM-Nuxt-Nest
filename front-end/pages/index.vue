<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Chart } from "chart.js/auto"
import { useAuthUser } from "#imports"

const { user } = useAuthUser()
const chartStatus = ref<HTMLCanvasElement | null>(null)
const chartMonth = ref<HTMLCanvasElement | null>(null)

const { data: countByNouveau } = await useFetch<number>(`http://localhost:3001/clients/status/count?status=Nouveau&authsId=${user.value?.id}`)
const { data: countByEnCours } = await useFetch<number>(`http://localhost:3001/clients/status/count?status=En cours&authsId=${user.value?.id}`)
const { data: countByPerdu } = await useFetch<number>(`http://localhost:3001/clients/status/count?status=Perdu&authsId=${user.value?.id}`)
const { data:countByGagne } = await useFetch<number>(`http://localhost:3001/clients/status/count?status=Gagné&authsId=${user.value?.id}`)
const data = [
  { status: "Nouveau", count: countByNouveau },
  { status: "En cours", count: countByEnCours },
  { status: "Perdu", count: countByPerdu },
  { status: "Gagné", count: countByGagne },
]

const totalMonth = ref(12)
const dataMonth = ref<number[]>([])

for (let i = 1; i < totalMonth.value; i++) {
    const { data: countByMonth } = await useFetch<number>(`http://localhost:3001/clients/month/count?month=${i}&authsId=${user.value?.id}`)
    dataMonth.value.push(countByMonth.value ?? 0)
}

onMounted(() => {
  if (!chartStatus.value) return
  if (!chartMonth.value) return

  new Chart(chartStatus.value, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.status),
      datasets: [
        {
          label: "Nombre de clients",
          data: data.map((d) => d.count),
          backgroundColor: [
            "#60a5fa", // Bleu clair
            "#f97316", // Orange
            "#ef4444", // Rouge
            "#22c55e"  // Vert
        ]
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "left",
        },
      },
    },
  })

  new Chart(chartMonth.value, {
    type: 'bar',
    data: {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [{
        label: 'Clients',
        data: dataMonth.value,
        backgroundColor: [
          '#60a5fa', // Bleu clair
        ],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    }
  })
})
</script>

<template>
  <div class="p-5">
    <div class="grid grid-cols-2 gap-4">
      <div class="w-full max-w-md flex flex-col justify-center items-center">
        <h2 class="font-semibold">Pourcentage de clients par status</h2>
        <canvas ref="chartStatus"></canvas>
      </div>
      <div class="w-full max-w-md flex flex-col justify-center items-center">
        <h2 class="font-semibold">Clients par mois</h2>
        <canvas ref="chartMonth"></canvas>
      </div>
    </div>
  </div>
</template>
