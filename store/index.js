export const state = () => ({
  products: [],
  categories: [],
})

export const getters = {
  getProductsByCategoryId: (state) => (categoryId) => {
    return state.products.filter((product) => product.categoryId == categoryId)
  },
  getCategoryByCategoryId: (state) => (categoryId) => {
    return state.categories.find(
      (category) => category.categoryId == categoryId
    )
  },
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
}

export const actions = {
  async loadProducts({ commit }) {
    const { products } = await this.$axios.$get('/products')
    const { productsCategoriesPivot } = await this.$axios.$get(
      '/productsCategoriesPivot'
    )
    commit(
      'SET_PRODUCTS',
      products.map((product) => ({
        ...product,
        categoryId: productsCategoriesPivot.find(
          (el) => el.productId === product.productId
        )?.categoryId,
      }))
    )
  },
  async loadCategories({ commit }) {
    const { categories } = await this.$axios.$get('/categories')
    commit('SET_CATEGORIES', categories)
  },
}
