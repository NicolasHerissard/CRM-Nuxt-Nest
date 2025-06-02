<script setup lang="ts">
import { ref } from 'vue'
import type { Article } from '~/models'

const showForm = ref(false)
const editedArticle = ref<Article>()
const searchArticle = ref('')
const { articles, FetchArticles, HandleAddArticle, HandleDeleteArticle, HandleUpdateArticle } = useArticles()

onMounted(() => {
  FetchArticles()
})

const formArticle = ref<Article>({
  id: 0,
  name: '',
  description: '',
  priceHT: 0,
  tva: 0,
  priceTTC: 0
})

async function AddArticle() {

  formArticle.value.priceTTC = formArticle.value.priceHT * (1 + formArticle.value.tva / 100)

  await HandleAddArticle(formArticle)

  FetchArticles()
  cancelEdit()
}

function editArticle(article: Article) {
  formArticle.value = { ...article }
  editedArticle.value = article
  showForm.value = true
}

function cancelEdit() {
  showForm.value = false
  editedArticle.value = undefined
  formArticle.value = {
    id: 0,
    name: '',
    description: '',
    priceHT: 0,
    tva: 0,
    priceTTC: 0
  }
}

async function HandleSearchArticles() {
  const url = searchArticle.value
    ? `http://localhost:3001/articles/search?name=${searchArticle.value}`
    : 'http://localhost:3001/articles'

  const { data } = await useFetch<Article[]>(url)

  if (data.value) {
    articles.value = data.value
  }
}

async function DeleteArticle(id: number) {
  await HandleDeleteArticle(id)

  FetchArticles()
}

async function UpdateArticle(id: number) {
  formArticle.value.priceTTC = formArticle.value.priceHT * (1 + formArticle.value.tva / 100)
  
  await HandleUpdateArticle(id, formArticle)

  FetchArticles()
  cancelEdit()
}

</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Articles</h1>
            <div class="flex items-center gap-4">
              <button @click="showForm = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ajouter un article
              </button>
              <input @input="HandleSearchArticles" v-model="searchArticle" type="text" placeholder="Rechercher un article" class="border border-gray-300 rounded px-4 py-2" />
            </div>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
            v-for="article in articles"
            :key="article.id"
            class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold">{{ article.name }}</h2>
                <span class="text-sm text-gray-500">{{ article.tva }}% TVA</span>
            </div>

            <p class="text-gray-600 text-sm mb-2">{{ article.description }}</p>

            <div class="flex justify-between items-center mt-4 text-sm">
                <div>
                  <p><span class="text-gray-500">HT :</span> {{ article.priceHT.toFixed(2) }} €</p>
                  <p><span class="text-gray-500">TTC :</span> {{ article.priceTTC.toFixed(2) }} €</p>
                </div>

                <div class="flex gap-2">
                <button
                    class="text-blue-600 hover:underline text-sm"
                    @click="editArticle(article)"
                >
                    Modifier
                </button>
                <button
                    class="text-red-600 hover:underline text-sm"
                    @click="DeleteArticle(article.id)"
                >
                    Supprimer
                </button>
                </div>
            </div>
            </div>
        </div>

        <!-- Slide-over -->
        <Transition name="slide-fade">
            <div v-if="showForm" class="fixed inset-0 z-50 flex justify-end">
            <!-- Overlay flouté -->
            <div
                class="absolute inset-0 backdrop-blur-sm bg-white/30 transition-opacity duration-300"
                @click="cancelEdit"
            ></div>

            <!-- Panneau latéral stylisé -->
            <div class="relative w-full max-w-md h-full bg-white shadow-xl rounded-l-2xl p-6 overflow-y-auto transition-all duration-300 ease-in-out">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">
                {{ editedArticle ? 'Modifier l\'article' : 'Ajouter un article' }}
              </h2>

              <form class="space-y-5" @submit.prevent="editedArticle ? UpdateArticle(formArticle.id) : AddArticle()">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    v-model="formArticle.name"
                    type="text"
                    placeholder="Nom de l'article"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    v-model="formArticle.description"
                    type="text"
                    placeholder="Courte description"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="flex gap-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Prix HT (€)</label>
                    <input
                      v-model.number="formArticle.priceHT"
                      type="number"
                      step="0.01"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">TVA (%)</label>
                    <input
                      v-model.number="formArticle.tva"
                      type="number"
                      step="0.1"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    @click="cancelEdit"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>

            </div>
        </Transition>
    </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>