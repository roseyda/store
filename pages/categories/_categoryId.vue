<template>
  <v-row>
    <v-col
      v-for="product in productToDisplay"
      :key="product.id"
      cols="12"
      md="6"
      lg="4"
    >
      <ProductCard
        :product="product"
        @clicked="showProduct($event)"
      ></ProductCard>
    </v-col>
    <ProductDialogue
      v-if="dialog"
      :dialog.sync="dialog"
      :product="selectedProduct"
    ></ProductDialogue>
  </v-row>
</template>

<script>
import ProductCard from '@/components/ProductCard'

export default {
  components: {
    ProductCard,
    ProductDialogue: () =>
      import(/* webpackPrefetch: true */ '@/components/ProductDialogue'),
  },
  data: () => ({
    dialog: false,
    selectedProduct: undefined,
  }),
  computed: {
    productToDisplay() {
      return this.$store.getters.getProductsByCategoryId(
        this.$route.params.categoryId
      )
    },
  },
  methods: {
    showProduct(product) {
      this.selectedProduct = product
      this.dialog = true
    },
  },
}
</script>
