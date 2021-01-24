<template>
  <v-dialog :value="dialog" persistent max-width="600px">
    <v-card class="pa-6">
      <v-img
        :src="product.productImage"
        alt="product.productName"
        contain
        max-height="400px"
      ></v-img>

      <div
        class="v-card__title my-4"
        :style="{ color: $vuetify.theme.themes.light.primary }"
      >
        {{ product.productName }}
      </div>

      <v-card-subtitle>
        {{ product.productDescription }}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('update:dialog', false)">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
