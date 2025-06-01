// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
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
  
})
