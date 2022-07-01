<template>
  <Page :title="title" :loading="loading && !error" secure>
    <v-alert v-if="success" type="success" text>
      {{ success }}
    </v-alert>
    <v-alert v-if="error" type="error" text>
      {{ error }}
    </v-alert>

    <p class="mb-6" style="max-width: 600px">
      Credits can be spent on any product, including technology lookups, APIs
      and lead lists.
    </p>

    <template v-if="!loading">
      <div class="mb-6">
        <v-btn
          v-if="isAdmin"
          color="success"
          class="mr-2"
          outlined
          @click="addDialog = true"
        >
          <v-icon left>
            {{ mdiAlphaCCircle }}
          </v-icon>
          Add credits
        </v-btn>

        <v-btn
          v-if="isAdmin"
          color="success"
          class="mr-2"
          outlined
          @click="spendDialog = true"
        >
          <v-icon left>
            {{ mdiAlphaCCircle }}
          </v-icon>
          Spend credits
        </v-btn>

        <v-btn class="mr-2" depressed @click="$refs.faqDialog.open()">
          <v-icon left>
            {{ mdiForum }}
          </v-icon>
          FAQs
        </v-btn>

        <v-btn href="/pricing" class="mr-2" depressed>
          <v-icon left>
            {{ mdiCalculator }}
          </v-icon>
          Plans &amp; pricing
        </v-btn>
      </div>

      <v-card>
        <v-card-title>Buy credits</v-card-title>

        <v-card-text class="pb-0">
          <p style="max-width: 600px">
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

        <v-divider />

        <v-card-title class="d-flex justify-space-between">
          <span>Auto top-up</span>
          <v-chip
            to="/pro/"
            class="font-weight-regular"
            color="primary"
            x-small
            outlined
            >PRO</v-chip
          >
        </v-card-title>
        <v-card-text v-if="autoTopUp.enabled">
          <p>
            When your balance reaches
            <strong>{{ formatNumber(autoTopUp.threshold) }}</strong>
            credits, automatically buy
            <strong>{{ formatNumber(autoTopUp.credits) }}</strong> credits.
          </p>
        </v-card-text>
        <v-card-text v-else>
          <v-alert color="accent" class="mb-0" text>
            Turned off. Turn on to automatically buy credits when your balance
            is low.
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="accent"
            text
            :disabled="!isPro"
            @click="autoTopUpDialog = true"
          >
            <v-icon left>{{ mdiPencil }}</v-icon>

            Configure
          </v-btn>
        </v-card-actions>

        <v-divider />

        <v-card-title>Bundles</v-card-title>
        <v-card-text v-if="!adds.length" class="pb-0">
          <v-alert color="info" text>
            You don't have any active credit bundles.
          </v-alert>
        </v-card-text>
        <v-card-text v-else class="px-0">
          <p class="px-4">These are your remaining credits.</p>

          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="20%">Added</th>
                <th width="20%">Expires</th>
                <th width="15%">Credits</th>
                <th width="15%">Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in adds" :key="index">
                <td
                  v-if="item.subscriptionId && item.subscriptionId !== 'free'"
                >
                  <nuxt-link to="/plan/">{{ item.description }}</nuxt-link>

                  <v-chip
                    v-if="
                      item.credits >= 5000 &&
                      item.creditsRemaining &&
                      !item.pausedAt
                    "
                    to="/pro/"
                    color="primary"
                    class="ml-1"
                    x-small
                    outlined
                    >PRO</v-chip
                  >
                </td>
                <td v-else-if="item.orderId">
                  <nuxt-link :to="`/orders/${item.orderId}/`">{{
                    item.description
                  }}</nuxt-link>

                  <v-chip
                    v-if="
                      item.credits >= 5000 &&
                      item.creditsRemaining &&
                      !item.pausedAt
                    "
                    to="/pro/"
                    color="primary"
                    class="ml-1"
                    x-small
                    outlined
                    >PRO</v-chip
                  >
                </td>
                <td v-else>
                  {{ item.description }}
                </td>
                <td>
                  {{ formatDate(new Date(item.createdAt * 1000)) }}
                </td>
                <td v-if="item.pausedAt" class="text--disabled">Paused</td>
                <td v-else>
                  {{ formatDate(new Date(item.expiresAt * 1000)) }}
                </td>
                <td>
                  {{ formatNumber(item.credits) }}
                </td>
                <td>
                  {{ formatNumber(item.creditsRemaining) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-title>Usage</v-card-title>
        <v-card-text class="pb-0">
          These are your credit spends for the last 60 days.
        </v-card-text>
        <v-card-text v-if="!spends.length">
          <v-alert color="info" class="mb-0" text>
            You don't have credit usage.
          </v-alert>
        </v-card-text>
        <v-card-text v-else class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th>Description</th>
                <th width="20%">Date</th>
                <th width="20%">Credits</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in spends" :key="index">
                <td v-if="item.orderId">
                  <nuxt-link
                    v-if="item.orderId.startsWith('lkp_')"
                    :to="`/lookup/lists/${item.orderId}/`"
                  >
                    {{ item.description }}
                  </nuxt-link>
                  <nuxt-link
                    v-else-if="item.orderId.startsWith('vrf_')"
                    :to="`/verify/lists/${item.orderId}/`"
                  >
                    {{ item.description }}
                  </nuxt-link>
                  <nuxt-link v-else :to="`/orders/${item.orderId}/`">
                    {{ item.description }}
                  </nuxt-link>
                </td>
                <td v-else-if="item.listId">
                  <nuxt-link :to="`/lists/${item.listId}/`">
                    {{ item.description }}
                  </nuxt-link>
                </td>
                <td v-else>
                  {{ item.description }}
                </td>
                <td>
                  {{ formatDate(new Date(item.createdAt * 1000)) }}
                </td>
                <td>
                  {{ formatNumber(item.credits) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-dialog v-model="addDialog" max-width="400px" eager>
        <v-card>
          <v-card-title>Add credits</v-card-title>
          <v-card-text class="pb-0">
            <v-alert v-if="addError" type="error" text>
              {{ addError }}
            </v-alert>

            <v-form>
              <v-text-field
                v-model="credits"
                :rules="rules.credits"
                label="Credits"
              />
              <v-text-field v-model="addDescription" label="Description" />
              <v-text-field v-model="expiry" label="Expiry (days)" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" text @click="addDialog = false">
              Cancel
            </v-btn>
            <v-btn :loading="adding" color="accent" text @click="add">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="spendDialog" max-width="400px" eager>
        <v-card>
          <v-card-title>Spend credits</v-card-title>
          <v-card-text class="pb-0">
            <v-alert v-if="spendError" type="error" text>
              {{ spendError }}
            </v-alert>

            <v-form>
              <v-text-field
                v-model="credits"
                :rules="rules.credits"
                label="Credits"
              />
              <v-text-field v-model="spendDescription" label="Description" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" text @click="spendDialog = false">
              Cancel
            </v-btn>
            <v-btn :loading="spending" color="accent" text @click="spend">
              Spend
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="autoTopUpDialog" max-width="600px" eager>
        <v-card>
          <v-card-title>Automatic top-up</v-card-title>
          <v-card-text>
            <v-form ref="autoTopUp" v-model="autoTopUpValid">
              <v-alert v-if="autoTopUpError" type="error" text>
                {{ autoTopUpError }}
              </v-alert>

              <p>When your balance reaches:</p>

              <v-text-field
                v-model="autoTopUpThreshold"
                :rules="[
                  (v) => (!v || /^[0-9]+$/.test(v) ? true : 'Invalid amount'),
                ]"
                label="Credits"
                placeholder="1000"
                outlined
                dense
              />

              <p>Then, automatically buy:</p>

              <v-text-field
                v-model="autoTopUpCredits"
                :rules="rules.credits"
                label="Credits"
                placeholder="5000"
                outlined
                dense
              >
                <template v-slot:append>
                  <v-chip
                    :disabled="!isPro"
                    color="primary lighten-1 primary--text"
                    label
                    small
                  >
                    Price:
                    {{
                      formatCurrency(
                        creditsToCents(parseInt(autoTopUpCredits, 10)) / 100
                      )
                    }}
                  </v-chip>
                </template>
              </v-text-field>

              <v-switch
                v-model="autoTopUpEnabled"
                label="Enable automatic top-up"
                class="mt-0"
                hide-details
                inset
              />

              <v-alert
                v-if="
                  autoTopUpCredits &&
                  parseInt(autoTopUpThreshold, 10) >
                    parseInt(autoTopUpCredits, 10)
                "
                color="secondary"
                border="left"
                class="mt-8 mb-2"
                dense
              >
                <small>
                  Your balance will be topped up to meet your minimum of
                  {{ formatNumber(parseInt(autoTopUpThreshold, 10)) }}, plus
                  {{ formatNumber(parseInt(autoTopUpCredits, 10)) }} credits.
                  The maximum charge is
                  {{
                    formatCurrency(
                      creditsToCents(
                        parseInt(autoTopUpThreshold, 10) +
                          parseInt(autoTopUpCredits, 10)
                      ) / 100
                    )
                  }}.
                </small>
              </v-alert>
            </v-form>
          </v-card-text>

          <v-divider />

          <v-card-title>Payment method</v-card-title>

          <v-card-text class="px-0 pb-0">
            <div v-if="!cardsLoaded" class="d-flex justify-center pt-2 pb-6">
              <Progress />
            </div>

            <CreditCards
              mode-select
              @load="cardsLoaded = true"
              @select="(id) => (stripePaymentMethod = id)"
            />
          </v-card-text>

          <v-divider />

          <v-card-actions class="pt-4">
            <v-spacer />
            <v-btn color="error" text @click="autoTopUpDialog = false">
              Cancel
            </v-btn>
            <v-btn
              :loading="submittingAutoTopUp"
              :disabled="!autoTopUpValid"
              color="accent"
              text
              @click="submitAutoTopUp"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <FaqDialog ref="faqDialog" topic="pricing" />
  </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  mdiAlphaCCircle,
  mdiForum,
  mdiCalculator,
  mdiArrowRight,
  mdiLockOpenVariantOutline,
  mdiCart,
  mdiPencil,
} from '@mdi/js'
import { creditTiers } from '~/assets/json/pricing.json'

import Page from '~/components/Page.vue'
import FaqDialog from '~/components/FaqDialog.vue'
import CreditCards from '~/components/CreditCards.vue'
import Progress from '~/components/Progress.vue'
import BuyCredits from '~/components/BuyCredits.vue'

export default {
  components: {
    Page,
    FaqDialog,
    CreditCards,
    Progress,
    BuyCredits,
  },
  data() {
    return {
      title: 'Credits',
      adds: [],
      addDialog: false,
      autoTopUpValid: true,
      autoTopUpDialog: false,
      autoTopUpEnabled: false,
      autoTopUpThreshold: 0,
      autoTopUpCredits: 100,
      cardsLoaded: false,
      spendDialog: false,
      adding: false,
      spending: false,
      addError: false,
      autoTopUpError: false,
      spendError: false,
      credits: 5000,
      creditTiers,
      addDescription: 'Complimentary credits',
      spendDescription: 'Subscription cancellation',
      expiry: 365,
      mdiAlphaCCircle,
      mdiForum,
      mdiCalculator,
      mdiArrowRight,
      mdiLockOpenVariantOutline,
      mdiCart,
      mdiPencil,
      rules: {
        credits: [
          (v) => (!v || /^[0-9]+$/.test(v) ? true : 'Invalid amount'),
          (v) =>
            parseInt(v) >= 100 || this.isAdmin ? true : 'Minimum 100 credits',
          (v) => (parseInt(v) < 10000000 ? true : 'Maximum 10,000,000 credits'),
        ],
      },
      orderDialog: false,
      orderError: false,
      order: false,
      submitting: false,
      submittingAutoTopUp: false,
      spends: [],
      stripePaymentMethod: null,
      error: false,
      loading: true,
      success: false,
    }
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.attrs,
      isAdmin: ({ user }) =>
        user.attrs.admin || (user.impersonator && user.impersonator.admin),
      isPro: ({ credits }) => credits.pro,
      autoTopUp: ({ credits }) => credits.autoTopUp,
    }),
  },
  watch: {
    async '$store.state.user.isSignedIn'(isSignedIn) {
      if (isSignedIn) {
        try {
          ;({ add: this.adds, spend: this.spends } = (
            await this.$axios.get('credits/usage')
          ).data)

          this.loading = false
        } catch (error) {
          this.error = this.getErrorMessage(error)
        }
      }
    },
    async autoTopUp() {
      this.autoTopUpEnabled = this.autoTopUp.enabled
      this.autoTopUpThreshold = this.autoTopUp.threshold
      this.autoTopUpCredits = Math.max(100, this.autoTopUp.credits)
    },
  },
  async created() {
    if (this.$store.state.user.isSignedIn) {
      try {
        await Promise.all([
          ({ add: this.adds, spend: this.spends } = (
            await this.$axios.get('credits/usage')
          ).data),
        ])

        this.loading = false
      } catch (error) {
        this.error = this.getErrorMessage(error)
      }
    }

    if (this.$route.query.buy) {
      this.orderDialog = true
    }
  },
  methods: {
    ...mapActions({
      getCredits: 'credits/get',
    }),
    async add() {
      this.addError = ''
      this.adding = true

      try {
        await this.$axios.put('credits', {
          credits: parseInt(this.credits, 10),
          description: this.addDescription,
          expiry: parseInt(this.expiry, 10),
        })

        this.getCredits()
        ;({ add: this.adds, spend: this.spends } = (
          await this.$axios.get('credits/usage')
        ).data)

        this.addDialog = false
      } catch (error) {
        this.addError = this.getErrorMessage(error)
      }

      this.adding = false
    },
    async spend() {
      this.spendError = ''
      this.spending = true

      try {
        await this.$axios.delete('credits', {
          data: {
            credits: parseInt(this.credits, 10),
            description: this.spendDescription,
          },
        })

        this.getCredits()

        //
        ;({ add: this.adds, spend: this.spends } = (
          await this.$axios.get('credits/usage')
        ).data)

        this.spendDialog = false
      } catch (error) {
        this.spendError = this.getErrorMessage(error)
      }

      this.spending = false
    },
    async submit() {
      this.orderError = ''
      this.submitting = true

      try {
        const order = (
          await this.$axios.put('orders', {
            product: 'Credits',
            credits: Math.min(
              10000000,
              Math.max(100, parseInt(this.credits, 10))
            ),
          })
        ).data

        this.$router.push(`/orders/${order.id}`)
      } catch (error) {
        this.orderError = this.getErrorMessage(error)
      }

      this.submitting = false
    },
    async submitAutoTopUp() {
      if (this.$refs.autoTopUp.validate()) {
        this.autoTopUpError = ''
        this.submittingAutoTopUp = true

        try {
          await this.$axios.put('credits/auto', {
            stripePaymentMethod: this.stripePaymentMethod,
            threshold: this.autoTopUpThreshold,
            credits: this.autoTopUpCredits,
            enabled: this.autoTopUpEnabled,
          })

          await this.getCredits()

          this.success = 'Your changes have been saved.'
          this.autoTopUpDialog = false
        } catch (error) {
          this.autoTopUpError = this.getErrorMessage(error)
        }

        this.submittingAutoTopUp = false
      }
    },
  },
}
</script>
