<template>
  <v-navigation-drawer
    color="secondary"
    height="auto"
    width="100%"
    floating
    permanent
  >
    <v-list class="px-0" nav dense>
      <template v-for="(item, i) in items">
        <v-list-item :key="i" :to="item.to" class="mx-2" color="primary" nuxt>
          <v-list-item-icon>
            <v-icon>{{ mdi[item.icon] }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-if="item.items">
          <div v-for="(subitem, j) in item.items" :key="`${i}-${j}`">
            <v-list-item :to="subitem.to" class="mx-2" color="primary" nuxt>
              <v-list-item-icon />
              <v-list-item-content>
                <v-list-item-title class="font-weight-regular">
                  {{ subitem.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <template
              v-if="
                subitem.to.replace(/\/$/, '') ===
                  $route.path.replace(/\/$/, '') && subitem.items
              "
            >
              <v-list-item
                v-for="(subsubitem, j) in subitem.items"
                :key="`${i}-${j}`"
                :to="subsubitem.to"
                class="mx-2"
                color="primary"
                nuxt
              >
                <v-list-item-icon />
                <v-list-item-content>
                  <v-list-item-title class="font-weight-regular pl-4">
                    {{ subsubitem.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2" />
            </template>
          </div>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiAccount,
  mdiCalculator,
  mdiCreditCard,
  mdiAlphaCCircle,
  mdiTagOutline,
  mdiCart,
  mdiFileDocumentOutline,
  mdiKeyVariant,
  mdiPuzzle,
  mdiFilterVariant,
  mdiLogoutVariant,
  mdiMonitor,
  mdiConsole,
  mdiStar,
  mdiDomain,
  mdiPowerPlug,
  mdiLayersOutline,
  mdiEmailCheckOutline,
} from '@mdi/js'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mdi: {
        mdiAccount,
        mdiCalculator,
        mdiCreditCard,
        mdiAlphaCCircle,
        mdiCart,
        mdiFileDocumentOutline,
        mdiKeyVariant,
        mdiPuzzle,
        mdiFilterVariant,
        mdiLogoutVariant,
        mdiMonitor,
        mdiConsole,
        mdiTagOutline,
        mdiStar,
        mdiDomain,
        mdiPowerPlug,
        mdiLayersOutline,
        mdiEmailCheckOutline,
      },
    }
  },
}
</script>
