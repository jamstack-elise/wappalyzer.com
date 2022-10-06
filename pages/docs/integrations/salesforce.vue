<template>
  <div>
    <Page :title="title" :side="side" :crumbs="crumbs" no-hero no-head>
      <h1 class="mb-4">Salesforce</h1>

      <p>
        This guide provides instructions on how to configure your Salesforce org
        to allow Wappalyzer to update account records with technology data.
      </p>

      <p>
        You need to be a Salesforce system administrator to perform these steps
        and have REST API permissions enabled.
      </p>

      <v-alert color="secondary" class="my-8">
        <h3 class="subtitle-2 mb-2">In this guide</h3>

        <ul>
          <li class="mb-2">
            <a href="#connected-app-setup">Connected app setup</a><br />
            Create a connected app in Salesforce to connect Wappalyzer with your
            Salesforce org.
          </li>
          <li class="mb-2">
            <a href="#authentication">Authentication</a><br />
            Grant Wappalyzer permission to update account records in Salesforce.
          </li>
          <li class="mb-2">
            <a href="#field-mappings">Field mappings</a><br />
            Create custom fields in Salesforce and map them to Wappalyzer
            technology categories.
          </li>
          <li class="mb-2">
            <a href="#workflow">Workflow setup</a>
            <br />
            Automatically enrich newly created and updated account records.
          </li>
        </ul>
      </v-alert>

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

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
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

      <p>
        Click <v-chip small outlined label>Save</v-chip>. On the next screen,
        click <v-chip small outlined label>Manage Consumer Details</v-chip>,
        take note of the consumer key and secret store it in a secure location.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/manage-consumer-details.png"
          alt=""
        />
      </v-card>

      <p>
        From Setup, enter 'manage connected apps' in the Quick Find box, then
        select
        <v-chip small outlined label>Manage Connect Apps</v-chip>.
      </p>

      <p>
        Click <v-chip small outlined label>Edit</v-chip> next to the Wappalyzer
        app.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/manage-connected-apps.png"
          alt=""
        />
      </v-card>

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
        <v-card-title class="subtitle-1">OAuth Policies</v-card-title>
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
                <td>IP Relaxation</td>
                <td>
                  <code>Relax IP Restrictions</code>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/relax-ip-restrictions.png"
          alt=""
        />
      </v-card>

      <p>
        Relaxing IP restrictions is needed in order for our servers to access
        the Salesforce API.
      </p>

      <Heading id="authentication" size="2" class="mt-8 mb-2">
        Authentication
      </Heading>

      <p>
        Authenticate to give Wappalyzer access to the connected app. To complete
        this step you will need your Salesforce org's domain name and the
        connected app's consumer and secret keys (see previous steps).
      </p>

      <p>
        From Setup, enter 'my domain' in the Quick Find box, then select
        <v-chip small outlined label>My Domain</v-chip>.
      </p>

      <p>Take note of the 'Current My Domain URL'.</p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/my-domain.png" alt="" />
      </v-card>

      <p>
        Next, go to the
        <nuxt-link to="/integrations/salesforce"
          >Salesforce integration</nuxt-link
        >
        page in your Wappalyzer account. Click
        <v-chip small outlined label>Connect</v-chip> and enter the Salesforce
        org domain name, consumer secret and consumer key. On the next page,
        click <v-chip small outlined label>Allow</v-chip> to complete the
        authentication.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/oauth2.png" alt="" />
      </v-card>

      <Heading id="field-mappings" size="2" class="mt-8 mb-2">
        Field mappings
      </Heading>

      <p>
        Create custom fields for Wappalyzer to populate with technology data.
        For instance, you can create a field called 'CMS' and map that to the
        'CMS' technology category. During a sync, Wappalyzer will update the
        value of the field to show the CMS of website associated with the
        account.
      </p>

      <p>
        Follow these steps for each of the technology categories you want to
        capture. See the
        <nuxt-link to="/technologies/">list of categories</nuxt-link>.
      </p>

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

      <v-card class="my-8">
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
        Optionally, Wappalyzer can automatically update account records as they
        are created or updated (rather than running a full sync and updating all
        account records at once). Create a workflow in Salesforce to enable
        this.
      </p>

      <p>
        From Setup, enter 'outbound messages' in the Quick Find box, then select
        <v-chip small outlined label>Workflow Actions</v-chip> &rarr;
        <v-chip small outlined label>Outbound Messages</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/outbound-messages.png" alt="" />
      </v-card>

      <p>
        Select the 'Account' object from the dropdown menu and click the
        <v-chip small outlined label>Next</v-chip> button.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/new-outbound-message-1.png"
          alt=""
        />
      </v-card>

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
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

      <p>
        Select 'Record-Triggered flow' and click the
        <v-chip small outlined label>Create</v-chip> button.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/record-triggered-flow.png"
          alt=""
        />
      </v-card>

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
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
                <td>Object</td>
                <td>Account</td>
              </tr>
              <tr>
                <td>Trigger the flow When</td>
                <td>A record is created or updated</td>
              </tr>
              <tr>
                <td>Condition Requirements</td>
                <td class="pt-4">
                  All Conditions Are Met (AND)

                  <v-card outlined class="mt-4">
                    <v-simple-table dense>
                      <thead>
                        <tr>
                          <th width="30%">Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Field</td>
                          <td>Website</td>
                        </tr>
                        <tr>
                          <td>Operator</td>
                          <td>Is Changed</td>
                        </tr>
                        <tr>
                          <td>Value</td>
                          <td>True</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/configure-trigger.png" alt="" />
      </v-card>

      <p>
        On the next screen, click the
        <v-chip small outlined label>+</v-chip> icon to add an element.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/trigger-created.png" alt="" />
      </v-card>

      <p>
        Select
        <v-chip small outlined label>Interaction</v-chip> &rarr;
        <v-chip small outlined label>Action</v-chip>.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/trigger-add-element.png"
          alt=""
        />
      </v-card>

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
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
                <td>Action</td>
                <td>Wappalyzer</td>
              </tr>
              <tr>
                <td>Label</td>
                <td>Wappalyzer</td>
              </tr>
              <tr>
                <td>API Name</td>
                <td>Wappalyzer</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img
          src="/images/articles/salesforce/trigger-new-action.png"
          alt=""
        />
      </v-card>

      <p>
        On the next screen, click the
        <v-chip small outlined label>Save</v-chip> button.
      </p>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/flow-complete.png" alt="" />
      </v-card>

      <p>Enter the information as shown:</p>

      <v-card class="my-8">
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
                <td>Flow Label</td>
                <td>Wappalyzer</td>
              </tr>
              <tr>
                <td>Flow API Name</td>
                <td>Wappalyzer</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>

      <v-card class="my-8" :max-width="1080">
        <v-img src="/images/articles/salesforce/save-flow.png" alt="" />
      </v-card>

      <p>
        Click the
        <v-chip small outlined label>Activate</v-chip> button to complete the
        setup.
      </p>

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
