// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    '~/plugins/toolsTip'
  ],
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Poppins: [300, 400, 500],
          Montserrat: [700],
        },
      },
    ],
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ]
});