import Popper from "vue3-popper";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Popper)
})