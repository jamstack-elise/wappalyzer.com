<template>
  <div>
    <Page :title="title" :side="side" :crumbs="crumbs" no-hero no-head>
      <h1 class="mb-4">Salesforce</h1>

      <p>
        Connect Wappalyzer to Salesforce to see the technology stacks of your
        leads without leaving your CRM.
      </p>

      <p>
        Enrich all company records at once with a sync and automatically update
        new records. This information is yours to keep and can be used to create
        custom reports in Salesforce.
      </p>

      <Heading id="connected-app-setup" size="2" class="mt-8 mb-2">
        Connected app setup
      </Heading>

      <p>
        From Setup, enter 'app manager' in the Quick Find box, then select
        <v-chip small outlined label>App Manager</v-chip> &rarr;
        <v-chip small outlined label>New Connected App</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/app-manager.png" alt="" />
      </v-card>

      <v-card class="mb-4">
        <v-card-title class="subtitle-1">Basic Information</v-card-title>
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Connect App Name</td>
                <td>
                  <code>Wappalyzer</code>
                </td>
              </tr>
              <tr>
                <td>API Name</td>
                <td>
                  <code>Wappalyzer</code>
                </td>
              </tr>
              <tr>
                <td>Contact Email</td>
                <td>
                  <code>hello@wappalyzer.com</code>
                </td>
              </tr>
              <tr>
                <td>Contact Email</td>
                <td>
                  <code>hello@wappalyzer.com</code>
                </td>
              </tr>
              <tr>
                <td>Logo Image URL</td>
                <td>
                  <code>https://www.wappalyzer.com/images/logo/light.png</code>
                </td>
              </tr>
              <tr>
                <td>Icon URL</td>
                <td>
                  <code
                    >https://www.wappalyzer.com/images/logo/icon_512.png</code
                  >
                </td>
              </tr>
              <tr>
                <td>Info URL</td>
                <td>
                  <code
                    >https://www.wappalyzer.com/docs/integrations/salesforce/</code
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-title class="subtitle-1">
          API (Enable OAuth Settings)
        </v-card-title>
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Enable OAuth Settings</td>
                <td>
                  <code>Yes</code>
                </td>
              </tr>
              <tr>
                <td>Callback URL</td>
                <td>
                  <code
                    >https://www.wappalyzer.com/integrations/salesforce/</code
                  >
                </td>
              </tr>
              <tr>
                <td>Selected OAuth Scopes</td>
                <td>
                  <ul>
                    <li>
                      Access the identity URL service (id, profile, email,
                      address, phone)
                    </li>
                    <li>Full access (full)</li>
                    <li>
                      Perform requests at any time (refresh_token,
                      offline_access)
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-title class="subtitle-1">Web App Settings</v-card-title>
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Start URL</td>
                <td>
                  <code
                    >https://www.wappalyzer.com/integrations/salesforce/</code
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/new-connected-app.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/manage-consumer-details.png"
          alt=""
        />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/manage-connected-apps.png"
          alt=""
        />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/relax-ip-restrictions.png"
          alt=""
        />
      </v-card>

      <Heading id="authentication" size="2" class="mt-8 mb-2">
        Authentication
      </Heading>

      <p>
        From Setup, enter 'my domain' in the Quick Find box, then select
        <v-chip small outlined label>My Domain</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/my-domain.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/oauth2.png" alt="" />
      </v-card>

      <Heading id="field-mappings" size="2" class="mt-8 mb-2">
        Field mappings
      </Heading>

      <p>
        From Setup, enter 'object manager' in the Quick Find box, then select
        Object Manager. From there, select
        <v-chip small outlined label>Account</v-chip> &rarr;
        <v-chip small outlined label>Fields &amp; Relationships</v-chip> &rarr;
        <v-chip small outlined label>New</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/object-manager.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/fields-and-relationships.png"
          alt=""
        />
      </v-card>

      <p>
        Select 'Text' as the field type and click the
        <v-chip small outlined label>Next</v-chip> button.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/field-type.png" alt="" />
      </v-card>

      <p>
        Fill out the form as shown below and click the
        <v-chip small outlined label>Next</v-chip> button.
      </p>

      <v-card class="mb-4">
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Field label</td>
                <td>Category name, e.g. <code>Ecommerce</code></td>
              </tr>
              <tr>
                <td>Length</td>
                <td>
                  <code>255</code>
                </td>
              </tr>
              <tr>
                <td>Field name</td>
                <td>
                  Prefixed category name, e.g. <code>Wappalyzer_Ecommerce</code>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/new-custom-field.png" alt="" />
      </v-card>

      <p>At step 3, click the 'Next' button again.</p>

      <p>
        At step 4, click <v-chip small outlined label>Save &amp; New</v-chip> to
        add another field or click <v-chip small outlined label>Save</v-chip>
        to finish.
      </p>

      <Heading id="workflow" size="2" class="mt-8 mb-2">Workflow setup</Heading>

      <p>
        From Setup, enter 'outbound messages' in the Quick Find box, then select
        <v-chip small outlined label>Workflow Actions</v-chip> &rarr;
        <v-chip small outlined label>Outbound Messages</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/outbound-messages.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/new-outbound-message-1.png"
          alt=""
        />
      </v-card>

      <v-card class="mb-4">
        <v-card-text class="px-0">
          <v-simple-table>
            <thead>
              <tr>
                <th width="30%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Wappalyzer</td>
              </tr>
              <tr>
                <td>Unique Name</td>
                <td>
                  <code>Wappalyzer</code>
                </td>
              </tr>
              <tr>
                <td>Endpoint URL</td>
                <td>
                  <code>https://api.wappalyzer.com/v2/salesforce/account/</code>
                </td>
              </tr>
              <tr>
                <td>Account fields to send</td>
                <td>
                  <ul>
                    <li>Id</li>
                    <li>Website</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/new-outbound-message-2.png"
          alt=""
        />
      </v-card>

      <p>
        From Setup, enter 'flows' in the Quick Find box, then select
        <v-chip small outlined label>Process Automation</v-chip> &rarr;
        <v-chip small outlined label>Flows</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/flows.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/record-triggered-flow.png"
          alt=""
        />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/configure-trigger.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/trigger-created.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/trigger-add-element.png"
          alt=""
        />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/trigger-new-action.png"
          alt=""
        />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/flow-complete.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/save-flow.png" alt="" />
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/activate-flow.png" alt="" />
      </v-card>
    </Page>
  </div>
</template>

<script>
import { mdiLightbulbOnOutline } from '@mdi/js'

import Page from '~/components/Page.vue'
import Heading from '~/components/Heading.vue'
import side from '~/assets/json/nav/docs.json'

export default {
  components: {
    Page,
    Heading,
  },
  data() {
    return {
      title: 'Salesforce',
      side,
      mdiLightbulbOnOutline,
      crumbs: [
        { title: 'Developer documentation', to: '/docs/' },
        { title: 'Integrations', to: '/docs/integrations/' },
      ],
    }
  },
}
</script>
