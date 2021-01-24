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
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="fade" mode="out-in">
          <nuxt :key="$route.fullPath" />
        </transition>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import CapitalizeMixin from '@/mixins/CapitalizeMixin'
import NavDrawer from '@/components/NavDrawer'
import { mapState } from 'vuex'

export default {
  components: {
    NavDrawer,
  },
  mixins: [CapitalizeMixin],
  data: () => ({
    drawerVisible: false,
  }),
  async fetch() {
    await this.$store.dispatch('loadProducts')
    await this.$store.dispatch('loadCategories')
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
