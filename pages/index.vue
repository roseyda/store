<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" justify="center" align="center">
        <h1>Welcome to our super store</h1>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="6" md="4" justify="center" align="center">
        <h2 :style="{ color: $vuetify.theme.themes.light.primary }">
          {{ this.$store.state.products.length }} products available
        </h2>
      </v-col>
      <v-col cols="6" md="4" justify="center" align="center">
        <h2 :style="{ color: $vuetify.theme.themes.light.primary }">
          {{ this.$store.state.categories.length }} categories available
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>
