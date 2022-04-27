<template>
  <Page :title="title" :loading="!cardsLoaded" secure>
    <v-card class="mb-4">
      <v-card-title>Credit cards</v-card-title>

      <CreditCards @load="cardsLoaded = true" />
    </v-card>
  </Page>
</template>

<script>
import Page from '~/components/Page.vue'
import CreditCards from '~/components/CreditCards.vue'

export default {
  components: {
    Page,
    CreditCards,
  },
  data() {
    return {
      title: 'Payment methods',
      cardsLoaded: false,
    }
  },
}
</script>
