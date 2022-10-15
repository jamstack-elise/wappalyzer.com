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

          <v-alert
            v-if="
              form.type === 'A technology is incorrectly identified' ||
              form.type === 'Something else'
            "
            color="warning"
            class="mt-4 mb-0"
            text
          >
            <p class="subtitle-2">Try this first</p>

            Open the extension settings (<v-icon color="warning" small>{{
              mdiCog
            }}</v-icon
            >) and click the 'clear detections cache' button. This may fix the
            issue you're reporting.
          </v-alert>
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

          <v-alert v-if="technologyError" color="warning" text>
            {{ technologyError }}
          </v-alert>

          <v-alert
            v-if="
              form.type ===
                'A technology is not being identified when it should' &&
              !form.technology
            "
            color="info"
            class="mb-0"
            text
          >
            If you're not sure which technology should be identified then
            there's no need to report it. If the extension doesn't show a
            website's CMS, programming language or other technology, it often
            means it's not possible to detect.
          </v-alert>
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
      :disabled="!form.type || !form.description || !valid || !!technologyError"
      @click="submit"
      depressed
    >
      Submit
    </v-btn>
  </Page>
</template>

<script>
import { mapState } from 'vuex'
import { mdiCog } from '@mdi/js'

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
      technologyError: '',
      submitting: false,
      formInit: {
        type: '',
        technology: '',
        description: '',
        website: '',
        version: '',
        agent: '',
        name: '',
        email: '',
      },
      form: {},
      mdiCog,
      websiteRules: [
        (v) => {
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

            if (this.hostnameBlacklisted(hostname)) {
              throw new Error(
                'Reports for this website are not accepted for technical reasons.'
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
    'form.type'() {
      if (
        this.form.type ===
          'A technology is not being identified when it should' &&
        !this.form.technology
      ) {
        this.technologyError =
          "Select the technology that the website is using but not shown in the extension. If this issue is not about a specific technology, please select 'Something else' as the issue type."
      } else {
        this.technologyError = ''
      }
    },
    'form.technology'() {
      if (
        this.form.type ===
          'A technology is not being identified when it should' &&
        ['React', 'Angular', 'Laravel', 'Django'].includes(this.form.technology)
      ) {
        this.technologyError = `${this.form.technology} is a technology that we can't always reliably detect. There's no need to report this issue, we're aware of it and will continue to find ways to improve. Thank you!`
      } else {
        this.technologyError = ''
      }
    },
  },
  mounted() {
    this.form = { ...this.formInit }
    this.form.website = this.$route.query.url || ''
    this.form.version = this.$route.query.version || ''
    this.form.agent = window.navigator.userAgent
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
