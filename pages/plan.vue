<template>
  <Page :title="title" :loading="!plan && !error" secure>
    <v-alert v-if="success" type="success" text>
      {{ success }}
    </v-alert>
    <v-alert v-if="error" type="error" text>
      {{ error }}
    </v-alert>

    <template v-if="plan">
      <v-alert v-if="plan.status === 'Pending'" type="warning" prominent text>
        Your plan is awaiting payment and is not currently active.
      </v-alert>

      <v-alert
        v-if="isPro && plan.cancelAt && plan.status !== 'Cancelled'"
        class="primary lighten-1 primary--text"
      >
        <p class="subtitle-2">Get $50/mo off</p>

        Your plan will cancel soon. If you wish to re-subscribe, please use the
        promo code
        <code>RETURN50</code> for a $50/mo discount for up to 12 months on any
        <v-chip color="primary" to="/pro/" x-small outlined>PRO</v-chip>
        plan.
      </v-alert>

      <v-btn
        v-if="isAdmin"
        :href="`https://dashboard.stripe.com/subscriptions/${plan.subscriptionId}`"
        color="success lighten-5 success--text"
        target="_blank"
        depressed
      >
        Stripe subscription
        <v-icon right>
          {{ mdiOpenInNew }}
        </v-icon>
      </v-btn>

      <v-alert v-if="!plan.status" color="accent" text>
        <p>
          You're currently on the Free plan. Sign up for a
          <v-chip color="accent" to="/pro/" x-small outlined>PRO</v-chip> plan
          to access lead lists and include company and contact details in all
          data products.
        </p>

        <v-btn to="/pricing/" color="accent" depressed>
          Compare plans

          <v-icon right>
            {{ mdiArrowRight }}
          </v-icon>
        </v-btn>
      </v-alert>

      <template v-else>
        <v-card class="my-4" :disabled="plan.status === 'Pending'">
          <v-card-text class="px-0 pb-0">
            <v-simple-table>
              <tbody>
                <tr>
                  <th width="30%"></th>
                  <td class="d-flex align-center">
                    <span class="subtitle-1 font-weight-medium">
                      {{ plan.name }}
                    </span>
                    <v-chip
                      v-if="plan.pro"
                      color="primary"
                      class="ml-2"
                      to="/pro/"
                      x-small
                      outlined
                      >PRO</v-chip
                    >
                  </td>
                  <td width="1"></td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <span
                      v-if="plan.coupon"
                      class="text-decoration-line-through text--disabled"
                      >{{
                        formatCurrency(plan.amount / 100, plan.currency)
                      }}</span
                    >

                    {{ formatCurrency(plan.total / 100, plan.currency) }}
                    / {{ plan.interval === 'year' ? 'yr' : 'mo'
                    }}<v-chip
                      v-if="plan.coupon"
                      class="ml-2"
                      color="success lighten-5 success--text"
                      label
                      small
                      >{{ plan.coupon }}</v-chip
                    >
                  </td>
                  <td class="text-right">
                    <v-btn text to="/pricing/">
                      Change plan
                      <v-icon right>
                        {{ mdiTagOutline }}
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <th>Users</th>
                  <td>
                    {{ formatNumber(plan.seats) }}
                  </td>
                  <td class="text-right">
                    <v-btn text to="/organisation/">
                      Manage users
                      <v-icon right>
                        {{ mdiDomain }}
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <th>Credits</th>
                  <td>{{ formatNumber(plan.credits) }} / mo</td>
                  <td class="text-right">
                    <v-btn text to="/credits/">
                      Buy credits
                      <v-icon right>
                        {{ mdiAlphaCCircle }}
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <th>Free lists</th>
                  <td colspan="2">{{ formatNumber(plan.lists) }} / mo</td>
                </tr>
                <tr v-if="plan.status !== 'Cancelled' && !plan.cancelAt">
                  <th>Payment method</th>
                  <td>
                    <CreditCard
                      v-if="plan.paymentMethodId"
                      :brand="plan.paymentMethodBrand"
                      :last4="plan.paymentMethodLast4"
                      :exp-month="plan.paymentMethodExpMonth"
                      :exp-year="plan.paymentMethodExpYear"
                    />
                    <template v-else>Use default</template>
                  </td>
                  <td class="text-right">
                    <v-btn text @click="paymentMethodDialog = true">
                      Change card
                      <v-icon right>
                        {{ mdiCreditCardOutline }}
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <template v-if="plan.status !== 'Cancelled'">
                  <tr v-if="plan.cancelAt" class="red--text">
                    <th>Cancels at</th>
                    <td colspan="2">
                      {{ formatDate(new Date(plan.cancelAt * 1000)) }}
                    </td>
                  </tr>
                  <tr v-else>
                    <th>Renews after</th>
                    <td>
                      {{ formatDate(new Date(plan.currentPeriodEnd * 1000)) }}
                    </td>
                    <td class="text-right">
                      <v-btn text @click="cancelDialog = true">
                        Cancel plan
                        <v-icon right>
                          {{ mdiTagRemoveOutline }}
                        </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </tbody>
            </v-simple-table>
          </v-card-text>

          <v-card-actions v-if="!plan.cancelAt && plan.status !== 'Cancelled'">
            <v-spacer />
          </v-card-actions>
        </v-card>

        <small class="text--disabled"
          >Prices are in United States dollars.</small
        >
      </template>

      <v-dialog
        v-if="!confirmCancelDialog"
        v-model="cancelDialog"
        max-width="500px"
        eager
      >
        <v-card>
          <v-card-title>Cancel plan</v-card-title>

          <v-card-text class="pb-0">
            <v-alert v-if="cancelError" type="error" text>
              {{ cancelError }}
            </v-alert>

            Please take a moment to tell us why you're cancelling your plan. We
            read every comment.

            <v-form>
              <v-radio-group v-model="cancelReason">
                <v-radio
                  label="I only wanted to subscribe for one month"
                  value="I only wanted to subscribe for one month"
                />
                <v-radio
                  label="I no longer need this product"
                  value="I no longer need this product"
                />
                <v-radio
                  label="I'm switching to another plan"
                  value="I'm switching to another plan"
                />
                <v-radio
                  label="The product is too expensive"
                  value="The product is too expensive"
                  hint="foo"
                />
                <v-radio
                  label="It doesn't work as expected (please explain)"
                  value="It doesn't work as expected"
                />
                <v-radio label="Different reason" value="Different reason" />
              </v-radio-group>

              <v-textarea
                v-model="cancelComment"
                label="What can we do better?"
                class="mb-4"
                rows="3"
                hide-details
                outlined
              />
            </v-form>

            <p>Your plan will be cancelled at the end of the billing period.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" text @click="cancelDialog = false">
              Cancel
            </v-btn>
            <v-btn :loading="cancelling" color="error" text @click="cancel()">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <v-dialog v-model="confirmCancelDialog" max-width="400px">
      <SignIn
        mode-confirm
        @confirm="cancel(true)"
        @close="confirmCancelDialog = false"
      />
    </v-dialog>

    <v-dialog v-model="paymentMethodDialog" max-width="600px" eager>
      <v-card>
        <v-card-title>Payment method</v-card-title>
        <v-card-text>
          <v-alert v-if="paymentMethodError" type="error" text>
            {{ paymentMethodError }}
          </v-alert>

          <div v-if="paymentMethodsLoading || paymentMethodSaving" class="mt-4">
            <Progress />
          </div>
          <v-alert
            v-else-if="!paymentMethods.length"
            color="info"
            class="mx-4 mb-0"
            text
          >
            You don't currently have any
            <nuxt-link to="/paymentmethods/">payment methods</nuxt-link>.
          </v-alert>
          <v-card v-else outlined>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Name on card</th>
                  <th>Card details</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="paymentMethod in paymentMethods"
                  :key="paymentMethod.id"
                  style="cursor: pointer"
                  @click="savePaymentMethod(paymentMethod.id)"
                >
                  <td>{{ paymentMethod.name }}</td>
                  <td>
                    <CreditCard
                      :brand="paymentMethod.brand"
                      :last4="paymentMethod.last4"
                      :exp-month="paymentMethod.expMonth"
                      :exp-year="paymentMethod.expYear"
                    />
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" text @click="paymentMethodDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import {
  mdiOpenInNew,
  mdiKeyVariant,
  mdiCreditCardOutline,
  mdiTagOutline,
  mdiTagRemoveOutline,
  mdiDomain,
  mdiAlphaCCircle,
  mdiArrowRight,
} from '@mdi/js'

import Page from '~/components/Page.vue'
import CreditCard from '~/components/CreditCard.vue'
import SignIn from '~/components/SignIn.vue'
import Progress from '~/components/Progress.vue'

export default {
  components: {
    Page,
    CreditCard,
    SignIn,
    Progress,
  },
  data() {
    return {
      title: 'Pricing plan',
      cancelDialog: false,
      confirmCancelDialog: false,
      cancelError: false,
      cancelling: false,
      cancelReason: '',
      cancelComment: '',
      error: false,
      mdiOpenInNew,
      mdiKeyVariant,
      mdiCreditCardOutline,
      mdiTagOutline,
      mdiTagRemoveOutline,
      mdiDomain,
      mdiAlphaCCircle,
      mdiArrowRight,
      paymentMethodDialog: false,
      paymentMethodError: false,
      paymentMethodSaving: false,
      paymentMethods: false,
      paymentMethodsLoading: false,
      plan: null,
      success: false,
    }
  },
  computed: {
    ...mapState({
      isSignedIn: ({ user }) => user.isSignedIn,
      isPro: ({ credits }) => credits.pro,
      isAdmin: ({ user }) =>
        user.attrs.admin || (user.impersonator && user.impersonator.admin),
    }),
  },
  watch: {
    async isSignedIn() {
      if (this.isSignedIn) {
        try {
          this.plan = (await this.$axios.get('plan')).data
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.plan = {}
          } else {
            this.error = this.getErrorMessage(error)
          }
        }
      }
    },
    async paymentMethodDialog(isOpen) {
      if (isOpen) {
        this.success = false
        this.paymentMethodError = false
        this.paymentMethodsLoading = true

        const { data: paymentMethods } = await this.$axios.get('paymentmethods')

        this.paymentMethods = paymentMethods

        this.paymentMethodsLoading = false
      }
    },
  },
  async created() {
    if (this.isSignedIn) {
      try {
        this.plan = (await this.$axios.get('plan')).data
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.plan = {}
        } else {
          this.error = this.getErrorMessage(error)
        }
      }
    }
  },
  methods: {
    async cancel(confirmed) {
      this.success = false
      this.cancelError = false

      if (!confirmed) {
        this.confirmCancelDialog = true

        return
      }

      this.confirmCancelDialog = false
      this.cancelling = true

      try {
        await this.$axios.delete('plan', {
          data: {
            reason: this.cancelReason,
            comment: this.cancelComment,
          },
        })

        this.plan = (await this.$axios.get('plan')).data

        this.cancelDialog = false

        // this.success = 'Your plan will be cancelled at the end of the billing period.'
      } catch (error) {
        this.cancelError = this.getErrorMessage(error)
      }

      this.cancelling = false
    },
    async savePaymentMethod(id) {
      this.paymentMethodError = false
      this.paymentMethodSaving = true

      try {
        await this.$axios.patch('plan', {
          default_payment_method: id,
        })

        this.plan = (await this.$axios.get('plan')).data

        this.success = 'The payment method has been udpated.'

        this.paymentMethodDialog = false
      } catch (error) {
        this.paymentMethodError = this.getErrorMessage(error)
      }

      this.scrollToTop()

      this.paymentMethodSaving = false
    },
  },
}
</script>
