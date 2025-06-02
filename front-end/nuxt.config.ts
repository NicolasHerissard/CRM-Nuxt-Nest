// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [],
      title: 'CRM',
      script: [
        {
          src: 'https://kit.fontawesome.com/6a69cfa461.js',
          crossorigin: 'anonymous',
        }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/ui'],
  colorMode: {
    preference: 'system',
    classSuffix: '',
  }
})
