<template>
  <v-app v-resize="onResize" dark>
    <NavDrawer :drawer-visible.sync="drawerVisible" />
    <v-app-bar clipped-left fixed app color="primary">
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click.stop="drawerVisible = !drawerVisible"
      />
      <transition name="fade" mode="out-in">
        <v-toolbar-title :key="$route.fullPath">
          {{ pageTitle }}
        </v-toolbar-title>
      </transition>
      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="on"
            @click="contactDialog = true"
          >
            <v-icon dark> mdi-email </v-icon>
          </v-btn>
        </template>
        <span>Contact</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <transition name="fade" mode="out-in">
          <nuxt :key="$route.fullPath" />
        </transition>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <ContactDialog
      v-if="contactDialog"
      :dialog.sync="contactDialog"
    ></ContactDialog>
  </v-app>
</template>

<script>
import CapitalizeMixin from '@/mixins/CapitalizeMixin'
import NavDrawer from '@/components/NavDrawer'
import { mapState } from 'vuex'

export default {
  components: {
    NavDrawer,
    ContactDialog: () =>
      import(/* webpackPrefetch: true */ '@/components/ContactDialog'),
  },
  mixins: [CapitalizeMixin],
  data: () => ({
    drawerVisible: false,
    contactDialog: false,
  }),
  async fetch() {
    await this.$store.dispatch('loadCategories')
    await this.$store.dispatch('loadProducts')
  },

  computed: {
    ...mapState(['isMobile']),
    pageTitle() {
      return (
        this.capitalize(
          this.$store.getters.getCategoryByCategoryId(
            this.$route.params.categoryId
          )?.categoryName
        ) ?? 'Home'
      )
    },
  },
  methods: {
    onResize() {
      this.$store.dispatch('setMobile')
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
