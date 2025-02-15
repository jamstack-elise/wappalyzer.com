<template>
  <div>
    <v-divider class="mb-12" />

    <template v-if="useCases">
      <v-container class="mb-12">
        <div class="text-h3 mb-4">Empower your sales and marketing teams</div>

        <p class="mb-8">
          Use our tools for lead generation, market analysis and competitor
          research.
        </p>

        <UseCases />
      </v-container>

      <v-divider class="mb-12" />
    </template>

    <template v-if="apps">
      <v-container class="mb-8">
        <div class="text-h3 mb-4">Apps</div>

        <p>Wappalyzer works with the tools you use every day.</p>

        <Apps feature />
      </v-container>

      <v-divider class="mb-12" />
    </template>

    <v-container class="logos text-center">
      <p class="overline font-weight-regular">
        Wappalyzer is trusted by thousands of professionals world-wide
      </p>

      <v-row align="center">
        <v-col v-for="(logo, name) in logos" :key="name" cols="3" sm="2" lg="1">
          <component :is="name" class="companies__logo mx-auto d-block" />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <Testimonials class="mt-4" />
    </v-container>

    <v-container class="text-center mb-4">
      <a
        href="https://www.g2.com/products/wappalyzer/reviews?utm_source=rewards-badge"
        target="_blank"
        rel="noopener"
      >
        <G2
          alt="High performer - Spring 2022"
          class="d-inline-block"
          height="120px"
        />
      </a>
    </v-container>
  </div>
</template>

<script>
import Testimonials from '~/components/Testimonials.vue'
import Apps from '~/components/Apps.vue'
import UseCases from '~/components/UseCases.vue'

import Adobe from '~/assets/images/logos/Adobe.svg?inline'
import Amazon from '~/assets/images/logos/Amazon.svg?inline'
import Ebay from '~/assets/images/logos/Ebay.svg?inline'
import Google from '~/assets/images/logos/Google.svg?inline'
import IBM from '~/assets/images/logos/IBM.svg?inline'
import Microsoft from '~/assets/images/logos/Microsoft.svg?inline'
import Oracle from '~/assets/images/logos/Oracle.svg?inline'
import PayPal from '~/assets/images/logos/PayPal.svg?inline'
import Salesforce from '~/assets/images/logos/Salesforce.svg?inline'
import SAP from '~/assets/images/logos/SAP.svg?inline'
import Shopify from '~/assets/images/logos/Shopify.svg?inline'
import Stripe from '~/assets/images/logos/Stripe.svg?inline'
import G2 from '~/assets/images/awards/g2-2022-spring.svg?inline'

export default {
  components: {
    Testimonials,
    Apps,
    UseCases,
    Google,
    Oracle,
    Amazon,
    IBM,
    PayPal,
    Ebay,
    Shopify,
    Stripe,
    SAP,
    Microsoft,
    Salesforce,
    Adobe,
    G2,
  },
  props: {
    apps: {
      type: Boolean,
      default: false,
    },
    useCases: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logos: {
        Google,
        Oracle,
        Amazon,
        IBM,
        PayPal,
        Ebay,
        Shopify,
        Stripe,
        SAP,
        Microsoft,
        Salesforce,
        Adobe,
      },
    }
  },
}
</script>

<style>
.companies__logo {
  opacity: 0.5;
  width: 100%;
  max-width: 100px;
  height: auto;
}
</style>
