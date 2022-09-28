<template>
  <div>
    <Page :title="title" no-head>
      <h1 class="text-center mt-n2 mb-6">{{ title }}</h1>

      <Pricing :billing="annually ? 'annually' : 'monthly'" class="mb-2" />

      <small class="text--disabled">
        <nuxt-link to="/contact/">Contact us</nuxt-link> for tailored plans.
        Discounted plans available for startups, education and nonprofits.<br />
        Credits included in plans expire after 60 days.<br />
        Prices are in United States dollars.
      </small>

      <v-divider class="mt-12 my-8" />

      <v-card style="max-width: 800px; margin: 0 auto" flat>
        <v-card-title>Pay as you go</v-card-title>

        <v-card-text>
          <p>
            Buy credits as needed, on a free or paid plan. Credit bundles
            include
            <nuxt-link to="/pro/">
              <v-chip to="/pro/" color="accent" class="mr-1" x-small outlined
                >PRO</v-chip
              >features</nuxt-link
            >
            and are valid for one year.
          </p>
        </v-card-text>

        <BuyCredits />
      </v-card>

      <template v-if="!isSignedIn">
        <v-divider class="mt-6 mb-8" />

        <v-card style="max-width: 800px; margin: 0 auto" flat>
          <v-card-title>Free trial</v-card-title>
          <v-card-text>
            <div>
              <p>
                Get 50 free credits every month, forever. Spend credits on
                technology lookups, email verifications and website alerts.
                Includes free samples for any lead list.
              </p>
            </div>

            <v-btn
              color="primary"
              class="mt-1 mb-2"
              depressed
              @click="signInDialog = true"
              >Sign up free</v-btn
            >
          </v-card-text>
        </v-card>
      </template>

      <v-divider class="my-8" />

      <v-card
        id="usage"
        class="mb-8"
        style="max-width: 800px; margin: 0 auto"
        flat
      >
        <v-card-title>Credit usage</v-card-title>
        <v-card-text class="px-0">
          <p class="px-4 mb-2">
            Credits can be spent on any product, including lead lists,
            technology lookups and APIs.
          </p>

          <v-simple-table>
            <thead>
              <tr>
                <th width="40%">Product</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ name, to, units } in creditsPerUnit" :key="name">
                <td>
                  <nuxt-link :to="to">
                    {{ name }}
                  </nuxt-link>
                </td>
                <td>
                  {{
                    units
                      .map(({ per, credits }) => `${credits} per ${per}`)
                      .join(' or ')
                  }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-divider class="my-8" />

      <v-card style="max-width: 800px; margin: 0 auto" flat>
        <v-card-title>Take a tour</v-card-title>

        <v-card-text>
          <Vimeo id="651847462" height="600px" />
        </v-card-text>
      </v-card>

      <v-divider class="mt-12 mb-8" />

      <v-card style="max-width: 800px; margin: 0 auto" flat>
        <v-card-title class="px-6">Frequently asked questions</v-card-title>
        <v-card-text class="px-0">
          <Faqs topic="pricing" />
        </v-card-text>
      </v-card>

      <div class="mt-8 pa-8 text-center">
        <v-btn
          href="https://calendly.com/wappalyzer/demo"
          target="_blank"
          color="primary"
          depressed
          x-large
        >
          Book a free demo
        </v-btn>
      </div>

      <template #footer>
        <Logos />
      </template>
    </Page>

    <v-dialog v-model="signInDialog" max-width="400px">
      <SignIn mode-sign-up />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mdiAlphaCCircle, mdiUnfoldMoreVertical } from '@mdi/js'

import Page from '~/components/Page.vue'
import Pricing from '~/components/Pricing.vue'
import Logos from '~/components/Logos.vue'
import Faqs from '~/components/Faqs.vue'
import Vimeo from '~/components/Vimeo.vue'
import SignIn from '~/components/SignIn.vue'
import BuyCredits from '~/components/BuyCredits.vue'
import { creditsPerUnit, creditTiers } from '~/assets/json/pricing.json'

export default {
  components: {
    Page,
    Pricing,
    Logos,
    Faqs,
    Vimeo,
    SignIn,
    BuyCredits,
  },
  computed: {
    ...mapState({
      isSignedIn: ({ user }) => user.isSignedIn,
    }),
  },
  data() {
    return {
      title: 'Pricing',
      annually: false,
      creditsPerUnit,
      creditTiers,
      credits: 1000,
      signInDialog: false,
      mdiAlphaCCircle,
      mdiUnfoldMoreVertical,
    }
  },
  mounted() {
    const { billing } = this.$route.query

    if (billing) {
      this.annually = billing === 'annually'

      this.$router.replace(this.$route.path)
    }
  },
}
</script>
