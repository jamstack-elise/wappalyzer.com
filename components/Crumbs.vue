<template>
  <v-sheet class="header" color="secondary">
    <v-container class="d-flex body-2">
      <v-breadcrumbs :items="items" class="pa-0">
        <template #divider>
          <span class="caption">/</span>
        </template>
        <template #item="{ item }">
          <nuxt-link v-if="item.to" :to="item.to" class="caption primary--text">
            {{ item.title }}
          </nuxt-link>
          <template v-else>
            <span class="caption">
              {{ item.title }}
            </span>
          </template>
        </template>
      </v-breadcrumbs>

      <div
        v-if="showDemoLink"
        class="book-a-demo d-none d-sm-block flex-grow-1 text-right"
      >
        Want to learn more?
        <a
          href="https://calendly.com/wappalyzer/demo"
          class="primary--text"
          target="_blank"
          >Book a free demo</a
        >
      </div>
    </v-container>

    <v-divider v-if="!$vuetify.theme.dark" />
  </v-sheet>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      showDemoLink: false,
    }
  },
  computed: {
    items() {
      return [
        {
          title: 'Home',
          to: '/',
        },
        ...this.crumbs,
      ]
    },
  },
  mounted() {
    console.log(
      `${this.$route.path}${this.$route.path.endsWith('/') ? '' : '/'}${
        this.$route.hash
      }`
    )
    if (
      [
        '/alerts/',
        '/api/',
        '/lists/',
        '/lookup/',
        '/pricing/',
        '/verify/',
        '/websites/',
      ].some((path) =>
        `${this.$route.path}${this.$route.path.endsWith('/') ? '' : '/'}${
          this.$route.hash
        }`.startsWith(path)
      )
    ) {
      this.showDemoLink = true
      console.log(this.showDemoLink)
    }
  },
}
</script>

<style>
.book-a-demo {
  font-size: 0.75rem;
}
</style>
