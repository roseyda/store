<template>
  <v-navigation-drawer
    :value="drawerVisible"
    app
    absolute
    :permanent="!isMobile"
    :clipped="!isMobile"
    :temporary="isMobile"
    touchless
    @input="$emit('update:drawerVisible', $event)"
  >
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
</template>

<script>
import CapitalizeMixin from '@/mixins/CapitalizeMixin'
import { mapState } from 'vuex'

export default {
  mixins: [CapitalizeMixin],
  props: {
    drawerVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['isMobile']),
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
  watch: {
    isMobile(newVal) {
      if (newVal) {
        this.$emit('update:drawerVisible', false)
      }
    },
  },
}
</script>
