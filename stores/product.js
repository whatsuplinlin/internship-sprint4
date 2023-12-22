export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
    }),
    actions: {
        addProduct(product) {
            this.products = product
        },
        removeProduct() {
            this.products = []
        }
    },
    persist: true 
})