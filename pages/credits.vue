<template>
  <Page :title="title" :loading="loading && !error" secure>
    <v-alert v-if="success" type="success" text>
      {{ success }}
    </v-alert>
    <v-alert v-if="error" type="error" text>
      {{ error }}
    </v-alert>

    <p class="mb-8" style="max-width: 600px">
      Credits can be spent on any product, including technology lookups, APIs
      and lead lists.
    </p>

    <template v-if="!loading">
      <v-btn
        v-if="isAdmin"
        color="success lighten-5 success--text"
        class="mr-2 mb-4"
        depressed
        @click="addDialog = true"
      >
        <v-icon left>
          {{ mdiAlphaCCircle }}
        </v-icon>
        Add credits
      </v-btn>

      <v-btn
        v-if="isAdmin"
        color="success lighten-5 success--text"
        class="mr-2 mb-4"
        depressed
        @click="spendDialog = true"
      >
        <v-icon left>
          {{ mdiAlphaCCircle }}
        </v-icon>
        Spend credits
      </v-btn>

      <v-btn class="mr-2 mb-4" depressed @click="$refs.faqDialog.open()">
        <v-icon left>
          {{ mdiForum }}
        </v-icon>
        FAQs
      </v-btn>

      <v-btn href="/pricing" class="mr-2 mb-4" depressed>
        <v-icon left>
          {{ mdiCalculator }}
        </v-icon>
        Plans &amp; pricing
      </v-btn>

      <v-card
        v-if="!isPro"
        color="primary lighten-1 primary--text"
        class="mb-6"
        flat
      >
        <v-card-title class="subtitle-2">
          <v-icon color="primary" size="20" left>
            {{ mdiLockOpenVariantOutline }}
          </v-icon>
          Unlock PRO features
        </v-card-title>
        <v-card-text class="primary--text pb-0">
          Sign up for a
          <v-chip to="/pro/" color="primary" x-small outlined>PRO</v-chip>
          plan to get monthly credits. If you ever need more, you can purchase
          additional credits here at any time.
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

      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-card height="100%">
            <v-card-title class="d-flex justify-space-between">
              <span>Buy credits</span>
              <v-chip
                to="/pro/"
                class="font-weight-regular"
                color="primary"
                x-small
                outlined
                >PRO</v-chip
              >
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submit" :disabled="!isPro">
                <v-row>
                  <v-col class="flex-grow-1 flex-shrink-0 pr-0">
                    <v-text-field
                      v-model="credits"
                      :rules="rules.credits"
                      label="Credits"
                      placeholder="1000"
                      hide-details="auto"
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
                              creditsToCents(parseInt(credits, 10)) / 100
                            )
                          }}
                        </v-chip>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col class="flex-grow-0 flex-shrink-1">
                    <v-btn
                      :loading="submitting"
                      :disabled="!isPro"
                      color="primary"
                      style="height: 40px"
                      depressed
                      @click="submit"
                    >
                      Create order
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card height="100%">
            <v-card-title class="d-flex justify-space-between">
              <span>Automatic top-up</span>
              <v-chip
                to="/pro/"
                class="font-weight-regular"
                color="primary"
                x-small
                outlined
                >PRO</v-chip
              >
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitAuto" :disabled="!isPro">
                <p>When my balance reaches:</p>

                <v-text-field
                  v-model="creditsThreshold"
                  :rules="
                    (v) => (!v || /^[0-9]+$/.test(v) ? true : 'Invalid amount')
                  "
                  label="Credits"
                  placeholder="1000"
                  class="mb-4"
                  hide-details="auto"
                  outlined
                  dense
                />

                <p>Then, automatically buy:</p>

                <v-text-field
                  v-model="creditsAutoTopUp"
                  :rules="rules.credits"
                  label="Credits"
                  placeholder="1000"
                  class="mb-4"
                  hide-details="auto"
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
                          creditsToCents(parseInt(creditsAutoTopUp, 10)) / 100
                        )
                      }}
                    </v-chip>
                  </template>
                </v-text-field>

                <v-switch label="Enable automatic top-up" hide-details inset />
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card>
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
                  <nuxt-link :to="`/subscriptions/${item.subscriptionId}/`">
                    {{ item.description }}
                  </nuxt-link>
                </td>
                <td v-else-if="item.orderId">
                  <nuxt-link :to="`/orders/${item.orderId}/`">
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
                  <nuxt-link :to="`/orders/${item.orderId}/`">
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
} from '@mdi/js'
import { creditTiers } from '~/assets/json/pricing.json'

import Page from '~/components/Page.vue'
import FaqDialog from '~/components/FaqDialog.vue'

export default {
  components: {
    Page,
    FaqDialog,
  },
  data() {
    return {
      title: 'Credits',
      adds: [],
      addDialog: false,
      spendDialog: false,
      adding: false,
      spending: false,
      addError: false,
      spendError: false,
      credits: 5000,
      creditsThreshold: 1000,
      creditsAutoTopUp: 5000,
      creditTiers,
      addDescription: 'Complimentary credits',
      spendDescription: 'Subscription cancellation',
      expiry: 365,
      mdiAlphaCCircle,
      mdiForum,
      mdiCalculator,
      mdiArrowRight,
      mdiLockOpenVariantOutline,
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
      spends: [],
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
  },
}
</script>
