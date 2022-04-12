<template>
  <Page
    :title="title"
    :crumbs="[{ title: 'Technologies', to: '/technologies/' }]"
    narrow
  >
    <div class="mt-4 mb-8">
      <p>Thanks for taking the time to report an issue.</p>

      <p>
        Please fill out the form as much as you can as this will help us resolve
        the issue quicker.
      </p>
    </div>

    <v-alert v-if="success" type="success" text>
      {{ success }}
    </v-alert>

    <v-alert v-if="error" type="error" text>
      {{ error }}
    </v-alert>

    <v-card class="mb-4">
      <v-form ref="form">
        <v-card-title class="subtitle-2">Issue type</v-card-title>
        <v-card-text>
          <p>What is the issue about?</p>

          <v-radio-group v-model="form.type" hide-details="auto">
            <v-radio
              label="A technology is not being identified when it should"
              value="A technology is not being identified when it should"
            />
            <v-radio
              label="A technology is incorrectly identified"
              value="A technology is incorrectly identified"
            />
            <v-radio label="Something else" value="Something else" />
          </v-radio-group>
        </v-card-text>
      </v-form>

      <v-divider />

      <v-form v-model="valid" :disabled="!form.type">
        <v-card-title class="subtitle-2">Basic information</v-card-title>

        <v-card-text>
          <p>
            If applicable, which technology is this about? If you can't find the
            technology in the list, please
            <nuxt-link to="/technologies/suggest"
              >suggest a new technology</nuxt-link
            >
            instead.
          </p>

          <Technologies
            @select="(item) => (form.technology = item.name)"
            no-categories
            no-loading
          />
        </v-card-text>

        <v-divider />

        <v-card-text>
          <p>Please provide a detailed description of the issue.</p>

          <v-textarea
            v-model="form.description"
            label="Description"
            rows="5"
            placeholder="E.g. My website is using Shopify but it's not being detected."
            hide-details="auto"
            required
            outlined
          />
        </v-card-text>

        <v-divider />

        <v-card-title class="subtitle-2">Additional information</v-card-title>
        <v-card-text>
          <p>If applicable, on which website did you notice the issue?</p>

          <v-text-field
            v-model="form.website"
            label="Website"
            placeholder="https://example.com"
            :rules="websiteRules"
            hide-details="auto"
            outlined
            dense
          />
        </v-card-text>

        <v-divider />

        <v-card-title class="subtitle-2">Your contact details</v-card-title>
        <v-card-text>
          <p>We'll follow up when your issue has been looked into.</p>

          <v-row>
            <v-col>
              <v-text-field
                v-model="form.name"
                label="Name"
                placeholder="John Connor"
                hide-details="auto"
                outlined
                dense
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.email"
                label="Email address"
                placeholder="info@example.com"
                hide-details="auto"
                outlined
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-title class="subtitle-2">Are you a robot?</v-card-title>
        <v-card-text>
          <recaptcha />
        </v-card-text>
      </v-form>
    </v-card>

    <v-btn
      color="primary"
      class="mt-4 mb-4"
      large
      :loading="submitting"
      :disabled="!form.type || !form.description || !valid"
      @click="submit"
      depressed
    >
      Submit
    </v-btn>
  </Page>
</template>

<script>
import { mapState } from 'vuex'

import Page from '~/components/Page.vue'
import Technologies from '~/components/Technologies.vue'

export default {
  components: {
    Page,
    Technologies,
  },
  data() {
    return {
      title: 'Report an issue',
      success: '',
      error: '',
      submitting: false,
      formInit: {
        type: '',
        technology: '',
        description: '',
        website: '',
        name: '',
        email: '',
      },
      form: {},
      websiteRules: [
        (v) => {
          console.log({ v })

          if (!v) {
            return true
          }

          try {
            const { hostname } = new URL(v)

            if (
              ['localhost', '127.', '172.16.', '192.168.', '.local'].some(
                (match) => hostname.includes(match)
              )
            ) {
              throw new Error(
                "Provide a link to a live website so that we can verify the issue. Please don't link to a local development environment."
              )
            }

            return true
          } catch (error) {
            return error.message || error.toString()
          }
        },
      ],
      valid: false,
    }
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.attrs,
    }),
  },
  watch: {
    user() {
      this.form.name = this.user.name
      this.form.email = this.user.email
    },
  },
  mounted() {
    this.form = { ...this.formInit }
    this.form.website = this.$route.query.url || ''
    this.form.name = this.user.name
    this.form.email = this.user.email
  },
  methods: {
    async submit() {
      this.success = ''
      this.error = ''
      this.submitting = true

      try {
        let recaptchaToken = ''

        try {
          recaptchaToken = await this.$recaptcha.getResponse()

          await this.$recaptcha.reset()
        } catch (error) {
          throw new Error('Are you a robot?')
        }

        const data = {
          ...this.form,
          recaptchaToken,
        }

        await this.$axios.post('technologies/issue', data)

        this.$refs.form.reset()
        this.form = { ...this.formInit }
        this.form.name = this.user.name
        this.form.email = this.user.email

        this.success = "Thank you! We'll follow up via email soon."
      } catch (error) {
        this.error = this.getErrorMessage(error)
      }

      this.submitting = false

      this.scrollToTop()
    },
  },
}
</script>
