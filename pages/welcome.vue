<template>
  <Page
    :title="title"
    :hero="{
      title: 'Thanks for signing up!',
    }"
    :crumbs="false"
    no-head
  >
    <article>
      <v-row class="mb-6" justify="center" no-gutters>
        <v-col sm="10" lg="8">
          <h1 class="text-h1 mb-8">Where to next?</h1>

          <p class="body-1 mb-8">
            You now have basic access to all our products. Every month, we'll
            deposit 50 credits into your account for free. You can spend these
            on <nuxt-link to="/lookup/">technology lookups</nuxt-link>,
            <nuxt-link to="/verify/">email verifications</nuxt-link>,
            <nuxt-link to="/alerts/">website alerts</nuxt-link> and to
            <nuxt-link to="/api/">trial our APIs</nuxt-link>.
          </p>

          <v-card
            color="primary lighten-1 primary--text"
            class="mb-4 body-1"
            flat
          >
            <v-card-title class="subtitle-2">
              <v-icon color="primary" size="20" left>
                {{ mdiLockOpenVariantOutline }}
              </v-icon>
              Unlock PRO features
            </v-card-title>
            <v-card-text
              class="primary--text pb-0 body-2"
              style="line-height: 1.5rem"
            >
              Sign up for a
              <v-chip to="/pro/" color="primary" x-small outlined>PRO</v-chip>
              plan to get more credits, access lead lists, company and contact
              details in all our data products, CRM integrations and more.
            </v-card-text>
            <v-card-actions>
              <v-spacer />

              <v-btn to="/pricing/" color="primary" text>
                Compare plans
                <v-icon right>
                  {{ mdiArrowRight }}
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <h3 class="text-h3 mt-8 mb-2">Browser extenion</h3>

          <p>
            If you haven't already, install our
            <nuxt-link to="/apps/">free browser extension</nuxt-link> to see the
            technologies, company and contact details of websites you visit.
          </p>

          <h3 class="text-h3 mt-8 mb-2">Technology lookup</h3>

          <p>
            Use our <nuxt-link to="/lookup/">technology lookup</nuxt-link> tool
            to reveal the technology stack, company and contact details of any
            website, individually or in
            <nuxt-link to="/lookup/#bulk">bulk</nuxt-link>.
          </p>

          <h3 class="text-h3 mt-8 mb-2">Lead lists</h3>

          <p>
            Create a list of websites that use a certain web technology with
            <nuxt-link to="/lists/">lead lists</nuxt-link>. Thousands of
            customers use our lead lists for market research and to find new
            sales prospects. Reach out to companies that use
            <nuxt-link to="/technologies/ecommerce/shopify/">Shopify</nuxt-link
            >,
            <nuxt-link to="/technologies/ecommerce/magento/">Magento</nuxt-link
            >,
            <nuxt-link to="/technologies/ecommerce/woocommerce/"
              >WooCommerce</nuxt-link
            >
            or <nuxt-link to="/technologies/">any other software</nuxt-link>.
          </p>

          <h3 class="text-h3 mt-8 mb-2">Email verification</h3>

          <p>
            We can help improve the quality of your mailing list with
            <nuxt-link to="/verify/">email verification</nuxt-link>. Prevent
            bounces when sending cold emails to avoid getting blocked by major
            email providers such as Gmail and Outlook.
          </p>

          <h2 class="text-h2 mt-8 mb-2">Unlock PRO features</h2>

          <p>
            Sign up for a plan to unlock
            <nuxt-link to="/pro/"
              ><v-chip to="/pro/" color="accent" class="mr-1" x-small outlined
                >PRO</v-chip
              >features</nuxt-link
            >. Each plan includes a number of monthly credits and full access to
            all our products including lead lists. Subscribe to get started
            immediately or <nuxt-link to="/contact/">contact us</nuxt-link> to
            book a demo!
          </p>
        </v-col>
      </v-row>

      <Pricing />
    </article>

    <template #footer>
      <Logos apps use-cases />
    </template>
  </Page>
</template>

<script>
import { mdiArrowRight, mdiLockOpenVariantOutline } from '@mdi/js'

import Page from '~/components/Page.vue'
import Pricing from '~/components/Pricing.vue'
import Logos from '~/components/Logos.vue'

export default {
  components: {
    Page,
    Pricing,
    Logos,
  },
  data() {
    return {
      title: 'Thanks for signing up',
      mdiArrowRight,
      mdiLockOpenVariantOutline,
    }
  },
}
</script>
