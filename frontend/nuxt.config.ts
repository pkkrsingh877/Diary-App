// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL // Make it available on the client side
    }
  },
  nitro: {
    devProxy: {
      '/': {
        target: 'https://api.diary.prabhatkumar.site/',
        changeOrigin: true, // Important for cookies, etc.
      },
    },
  },
})
