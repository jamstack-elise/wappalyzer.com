<template>
  <Page :title="title" :loading="!orders && !error" secure>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <div v-if="isMember" class="mb-4 text-right">
      <v-switch
        v-if="orders && orders.length !== myOrders.length"
        v-model="viewMine"
        class="ma-0 d-inline-block"
        label="Show only my orders"
        hide-details
      />
    </div>

    <template v-if="orders">
      <v-alert v-if="!filteredOrders.length" color="info" text>
        <p>You don't have any orders.</p>

        <v-btn to="/pricing/" color="accent" outlined>
          Plans &amp; pricing
          <v-icon right>
            {{ mdiArrowRight }}
          </v-icon>
        </v-btn>
      </v-alert>
      <v-card v-else class="mb-4">
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Description</th>
                <th width="1">Total</th>
                <th width="1"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="order in filteredOrders">
                <v-hover v-slot="{ hover }">
                  <tr :key="order.createdAt">
                    <td>
                      <nuxt-link :to="`/orders/${order.id}`">
                        {{ order.id }}
                      </nuxt-link>
                    </td>
                    <td>
                      <v-chip
                        :color="
                          order.status === 'Complete'
                            ? 'success'
                            : order.status === 'Pending'
                            ? 'warning'
                            : 'accent'
                        "
                        label
                        outlined
                        small
                      >
                        {{ order.status }}
                      </v-chip>
                    </td>
                    <td>{{ formatDate(new Date(order.createdAt * 1000)) }}</td>
                    <td v-if="order.product === 'Subscription'">
                      {{ order.plan.name }} plan
                    </td>
                    <td v-else>
                      {{ order.product }}
                    </td>
                    <td style="white-space: nowrap">
                      {{
                        formatCurrency(order.total / 100, order.currency, true)
                      }}
                    </td>
                    <td style="white-space: nowrap">
                      <div :style="hover ? '' : 'visibility: hidden'">
                        <v-btn
                          :disabled="order.status === 'Complete'"
                          color="error"
                          icon
                          @click="
                            selected = order
                            cancelDialog = true
                          "
                        >
                          <v-icon>{{ mdiDelete }}</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </v-hover>
              </template>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <small class="text--disabled">Prices are in United States dollars.</small>
    </template>

    <v-dialog v-model="cancelDialog" max-width="400px" eager>
      <v-card>
        <v-card-title>Cancel order</v-card-title>
        <v-card-text>
          <v-alert v-if="cancelError" type="error" text>
            {{ cancelError }}
          </v-alert>

          <div>
            The order <strong>{{ selected.id }}</strong> will be cancelled.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" text @click="cancelDialog = false">
            Cancel
          </v-btn>
          <v-btn :loading="cancelling" color="error" text @click="cancel">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import { mdiArrowRight, mdiPencil, mdiDelete } from '@mdi/js'
import Page from '~/components/Page.vue'
import Spinner from '~/components/Spinner.vue'

export default {
  components: {
    Page,
    Spinner,
  },
  data() {
    return {
      title: 'Orders',
      cancelDialog: false,
      cancelError: false,
      cancelling: false,
      error: false,
      orders: null,
      mdiArrowRight,
      mdiPencil,
      mdiDelete,
      selected: {},
      viewMine: false,
    }
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.attrs,
      isMember: ({ user }) =>
        !user.attrs.admin && user.impersonator && !user.impersonator.admin,
      credits: ({ credits: { credits } }) => credits,
      impersonator: ({ user }) => user.impersonator,
    }),
    myOrders() {
      return this.orders.filter(
        ({ memberId }) => memberId === this.impersonator.sub
      )
    },
    filteredOrders() {
      return this.viewMine ? this.myOrders : this.orders
    },
  },
  watch: {
    async '$store.state.user.isSignedIn'(isSignedIn) {
      if (isSignedIn) {
        try {
          this.orders = (await this.$axios.get('orders')).data
        } catch (error) {
          this.error = this.getErrorMessage(error)
        }
      }
    },
  },
  async created() {
    if (this.$store.state.user.isSignedIn) {
      try {
        this.orders = (await this.$axios.get('orders')).data
      } catch (error) {
        this.error = this.getErrorMessage(error)
      }
    }
  },
  methods: {
    async cancel() {
      this.cancelError = false
      this.cancelling = true

      try {
        await this.$axios.delete(`orders/${this.selected.id}`)

        try {
          this.orders = (await this.$axios.get('orders')).data
        } catch (error) {
          this.error = this.getErrorMessage(error)
        }

        this.cancelDialog = false
      } catch (error) {
        this.cancelError = this.getErrorMessage(error)
      }

      this.cancelling = false
    },
  },
}
</script>
