<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Chart } from "chart.js/auto"

const toast = useToast()

const chartStatus = ref<HTMLCanvasElement | null>(null)
const chartMonth = ref<HTMLCanvasElement | null>(null)

const { countByNouveau, countByEnCours, countByPerdu, countByGagne, dataMonth, fetchDashboardData } = useDashboard()
fetchDashboardData()
const data = [
  { status: "Nouveau", count: countByNouveau },
  { status: "En cours", count: countByEnCours },
  { status: "Perdu", count: countByPerdu },
  { status: "Gagné", count: countByGagne },
]

function showToast() {
  toast.add({
    title: "Données récupérées",
    description: "Les données ont bien été récupérées",
    color: "success"
  })
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
