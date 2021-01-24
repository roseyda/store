export const state = () => ({
  products: [],
  categories: [],
  isMobile: false,
})

export const getters = {
  getProductsByCategoryId: (state) => (categoryId) => {
    // eslint-disable-next-line eqeqeq
    return state.products.filter((product) => product.categoryId == categoryId)
  },
  getCategoryByCategoryId: (state) => (categoryId) => {
    return state.categories.find(
      // eslint-disable-next-line eqeqeq
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
  SET_MOBILE(state, isMobile) {
    state.isMobile = isMobile
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
  setMobile({ commit }) {
    commit('SET_MOBILE', window.screen.width < 600 || window.innerWidth < 600)
  },
}
