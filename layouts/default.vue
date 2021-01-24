<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('loadProducts')
    await this.$store.dispatch('loadCategories')
  },

  computed: {
    pageTitle() {
      return (
        this.capitalize(
          this.$store.getters.getCategoryByCategoryId(
            this.$route.params.categoryId
          )?.categoryName
        ) ?? 'Home'
      )
    },
    navItems() {
      return [
        {
          title: 'Home',
          to: '/',
        },
        ...this.$store.state.categories.map((cat) => ({
          title: this.capitalize(cat.categoryName),
          to: `/categories/${cat.categoryId}`,
        })),
      ]
    },
  },
  methods: {
    capitalize(string) {
      return typeof string === 'string'
        ? string.charAt(0).toUpperCase() + string.slice(1)
        : undefined
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
