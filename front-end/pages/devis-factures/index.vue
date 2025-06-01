<script setup lang="ts">
import type { Client, Article } from '~/models'
import { ref, reactive, onMounted } from 'vue'

const clients = ref<Client[]>([])
const articles = ref<Article[]>([])
let confirmErrorMSG = ref('')
const apiurl = useRuntimeConfig().public.apiUrl

const form = reactive({
  clientId: 0,
  articles: [
    {
      articleId: 0,
      quantity: 1,
    }
  ]
})

onMounted(async () => {
  clients.value = await $fetch<Client[]>(`${apiurl}/clients`)
  articles.value = await $fetch<Article[]>(`${apiurl}/articles`)
})

async function addClientArticle() {
  // Vérification simple
  if (!form.clientId || form.articles.length === 0) {
    GetConfirmOrErrorMessage()
    return
  }

  // Préparation des données à envoyer
  const payload = {
    clientId: form.clientId,
    articles: form.articles.map(a => ({
      articleId: a.articleId,
      quantity: a.quantity,
    })),
  }

  try {
    const response = await $fetch(`${apiurl}/articles-clients`, {
      method: 'POST',
      body: payload,
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

function clearArticles() {
  form.articles.length = 0
}


function addArticleRow() {
  form.articles.push({
    articleId: 0,
    quantity: 1,
  })
}

function getArticleById(id: number) {
  return articles.value.find(a => a.id === id)
}

function getArticlePrice(id: number) {
  const article = getArticleById(id)
  let price = article ? article.priceHT.toFixed(2) : ''
  return price + " €"
}

function removeArticleRow(index: number) {
  form.articles.splice(index, 1)
}

function getTotalHT() {
  return form.articles.reduce((total, article) => {
    const articleData = getArticleById(article.articleId)
    if (articleData) {
      return total + (articleData.priceHT * article.quantity)
    }
    return total
  }, 0).toFixed(2)
}

function getTotalTTC() {
  const totalHT = parseFloat(getTotalHT())
  const tva = 0.2 // 20% de TVA
  return (totalHT * (1 + tva)).toFixed(2)
}

function getTVA() {
  const totalHT = parseFloat(getTotalHT())
  const tva = 0.2 // 20% de TVA
  return (totalHT * tva).toFixed(2)
}

function GetConfirmOrErrorMessage() {
  if(form.clientId && form.articles.length > 0) {
    confirmErrorMSG.value = `Devis enregistré avec ${form.articles.length} article(s)`
    setTimeout(() => {
      confirmErrorMSG.value = ''
    }, 3000)
  } else {
    confirmErrorMSG.value = 'Veuillez sélectionner un client et au moins un article.'
    setTimeout(() => {
      confirmErrorMSG.value = ''
    }, 3000)
  }
}

async function generatePDF() {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF()

  const client = clients.value.find(c => c.id === form.clientId)
  const currentDate = new Date().toLocaleDateString()

  // Titre et client
  doc.setFontSize(18)
  doc.text('Devis', 14, 20)

  doc.setFontSize(12)
  doc.text(`Client : ${client?.name || 'Non défini'}`, 14, 30)
  doc.text(`Date : ${currentDate}`, 14, 36)

  // Construction du tableau
  const tableBody = form.articles.map((articleForm) => {
    const articleData = articles.value.find(a => a.id === articleForm.articleId)
    if (!articleData) return []

    return [
      articleData.name,
      articleForm.quantity.toString(),
      articleData.priceHT.toFixed(2) + ' €',
      (articleData.priceHT * articleForm.quantity).toFixed(2) + ' €'
    ]
  })

  autoTable(doc, {
    head: [['Article', 'Quantité', 'Prix unitaire HT', 'Total HT']],
    body: tableBody,
    startY: 45,
    theme: 'striped',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
    styles: {
      fontSize: 10,
    },
  })

  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Totaux
  const totalHT = getTotalHT()
  const tva = getTVA()
  const totalTTC = getTotalTTC()

  doc.setFontSize(12)
  doc.text(`Total HT : ${totalHT} €`, 14, finalY)
  doc.text(`TVA (20%) : ${tva} €`, 14, finalY + 6)
  doc.text(`Total TTC : ${totalTTC} €`, 14, finalY + 12)

  const signatureY = finalY + 30

  doc.setFontSize(10)
  doc.text(`Fait le : ${currentDate}`, 14, signatureY + 10)
  doc.setFontSize(12)
  doc.text('Signature du client :', 14, signatureY)

  doc.rect(60, signatureY - 6, 100, 20)

  doc.save(`devis-${client?.name || 'client'}.pdf`)
}



</script> 

<template>
  <div class="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- FORM -->
    <div class="md:col-span-2 space-y-6">
      <h1 class="text-2xl font-bold mb-4">Créer un devis</h1>

      <!-- Client -->
      <div>
        <label class="block mb-1 font-medium">Client</label>
        <select v-model="form.clientId" class="w-full border rounded px-3 py-2">
          <option :value="null" disabled>-- Choisir un client --</option>
          <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <!-- Articles -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Articles</h2>
        <div class="grid grid-cols-12 gap-2 items-center mb-2" v-for="(article, index) in form.articles" :key="index">
          <select
            v-model="article.articleId"
            class="col-span-5 border rounded px-3 py-2"
          >
            <option :value="null" disabled>-- Choisir un article --</option>
            <option v-for="a in articles" :key="a.id" :value="a.id">
              {{ a.name }}
            </option>
          </select>

          <input
            :value="getArticlePrice(article.articleId)"
            disabled
            class="col-span-2 border rounded px-3 py-2 bg-gray-100"
          />

          <input
            v-model.number="article.quantity"
            type="number"
            min="1"
            placeholder="Quantité"
            class="col-span-2 border rounded px-3 py-2"
            title="Quantité"
          />

          <button
            @click="removeArticleRow(index)"
            type="button"
            class="col-span-1 text-red-600 hover:underline text-sm"
          >
            X
          </button>
        </div>
        <button
          @click="addArticleRow"
          type="button"
          class="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          + Ajouter un article
        </button>
      </div>

      <!-- Notes -->
      <div>
        <label class="block mb-1 font-medium">Notes</label>
        <textarea
          rows="3"
          placeholder="Conditions, remarques, etc."
          class="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2">
        <div>
          <label class="text-red-600 text-sm">{{confirmErrorMSG}}</label>
        </div>
        <button @click="clearArticles" type="button" class="bg-gray-100 text-gray-700 px-4 py-2 rounded">
          Annuler
        </button>
        <button type="button" @click="addClientArticle" class="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer le devis
        </button>
        <button @click="generatePDF" type="button" class="bg-blue-600 text-white px-4 py-2 rounded">
          Générer le PDF
        </button>
      </div>
    </div>

    <!-- RECAP -->
    <div class="bg-gray-50 rounded-xl p-4 shadow-sm sticky top-4">
      <h2 class="text-lg font-semibold mb-4">Récapitulatif</h2>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span>Total HT :</span>
          <span class="font-medium text-gray-800">{{ getTotalHT() }} €</span>
        </div>
        <div class="flex justify-between">
          <span>TVA :</span>
          <span class="font-medium text-gray-800">{{ getTVA() }} €</span>
        </div>
        <div class="flex justify-between border-t pt-2 font-semibold text-gray-900">
          <span>Total TTC :</span>
          <span>{{ getTotalTTC() }} €</span>
        </div>
      </div>
    </div>
  </div>
</template>
