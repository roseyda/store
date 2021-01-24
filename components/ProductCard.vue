<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 16 : 2"
      class="pa-4"
      style="cursor: pointer"
      @click="$emit('clicked', product)"
    >
      <v-img
        :src="product.productImage"
        alt="product.productName"
        contain
        height="200px"
      ></v-img>

      <v-row align="center" justify="center">
        <div
          class="v-card__title"
          :style="{ color: $vuetify.theme.themes.light.primary }"
        >
          {{ product.productName }}
        </div>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
