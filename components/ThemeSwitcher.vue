<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-switch
          v-model="$vuetify.theme.dark"
          hide-details
          dark
          inset
          color="blue-grey darken-3"
        >
          <template #label>
            <v-icon :color="themeIconColor">
              {{ themeIcon }}
            </v-icon>
          </template>
        </v-switch>
      </div>
    </template>
    <span>Tooglr theme</span>
  </v-tooltip>
</template>

<script>
export default {
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark
        ? 'mdi-moon-waning-crescent'
        : 'mdi-white-balance-sunny'
    },
    themeIconColor() {
      return this.$vuetify.theme.dark ? 'blue-grey darken-3' : 'yellow darken-1'
    },
  },
}
</script>
