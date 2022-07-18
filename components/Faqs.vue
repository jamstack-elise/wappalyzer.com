<template>
  <div class="body-2">
    <v-expansion-panels v-if="topic === 'lists'" flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          What are lead lists?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Our <nuxt-link to="/lists/">lead lists</nuxt-link> are lists of
            websites that use a certain
            <nuxt-link to="/technologies/">web technologies</nuxt-link>, along
            with email addresses and phone numbers. Lead lists help sales and
            marketing teams with prospecting, market research and competitor
            analysis.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What information is included in the lists?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Lead lists include hostnames, version numbers, website country and
            language, traffic rank and metadata such as page title and
            description.
          </p>

          <p>
            On a <nuxt-link to="/pro/">PRO</nuxt-link> plan, available company
            and contact information such as employee counts, email addresses and
            phone numbers are included too.
          </p>

          <p>
            See the full list of
            <nuxt-link to="/docs/fields/">fields</nuxt-link>, all
            <nuxt-link to="/pro/">PROfeatures</nuxt-link>
            and a <nuxt-link to="/lists/sample/">lead list sample</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What segmentation options are available?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Lead lists can be filtered by keyword, company industry and size,
            website traffic, IP country, top-level domain and language.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          A technology I'm looking for is not in the list, can it be added?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            You can
            <nuxt-link to="/technologies/suggest/"
              >suggest a new technology</nuxt-link
            >. We only accept web technologies with an established user base.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What is IP country?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            IP country is the country a website's IP address belongs to.
            Typically this is where the website is hosted, which can be
            indicative of the location the business that owns the website
            operates from.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How is the information being collected?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            We collect limited information through our
            <nuxt-link to="/apps/">browser extension</nuxt-link>
            in accordance with our
            <nuxt-link to="/privacy/">privacy policy</nuxt-link> and perform
            in-depth analysis using in-house crawlers. Our unique methods ensure
            only actively visited websites are included in the lists, including
            pages that traditional crawlers can't reach.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How accurate is the data?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Out technology data is of a very high standard and corroborated
            across multiple sources. Email addresses and phone numbers obtain
            from websites' contact pages are unverified and as-is.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How fresh is the data?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            The data is being updated and added to every day. By default, data
            in the lead lists can be up to three months old but this can be
            lowered down to one month.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How do you determine website traffic?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Website traffic is tracked using our
            <nuxt-link to="/apps/">browser extensions</nuxt-link> with over 2M
            users. The install base provides a large enough sample set to
            determine which websites receive more traffic than others, resulting
            in a relative traffic indicator.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I use a different payment method?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Please <nuxt-link to="/contact/">contact us</nuxt-link> if you wish
            to pay via bank transfer or Bitcoin, or discuss options.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I resell the data or embed it in my customer-facing product?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Reselling or sharing our data is prohibited by our
            <nuxt-link to="/terms/">terms of use</nuxt-link>. If you're an
            Enterprise customer and would like to apply for an exception, please
            <nuxt-link to="/contact/">contact us</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What is your refund policy?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            If you're not satisfied with the quality of a list for any reason,
            we'll work with you to resolve the problem or issue a refund. Please
            refer to the <nuxt-link to="/terms/">terms of use</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-if="topic === 'api'" flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          What information is included in API responses?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            The APIs return hostnames, version numbers, website country and
            language, traffic rank and metadata such as page title and
            description.
          </p>

          <p>
            On a <nuxt-link to="/pro/">PRO</nuxt-link> plan, available company
            and contact information such as employee counts, email addresses and
            phone numbers are included too.
          </p>

          <p>
            See the full list of
            <nuxt-link to="/docs/fields/">fields</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Where do I find my API key?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            You can create your API in the
            <nuxt-link to="/apikey/">API key</nuxt-link> tab in your account.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How is the information being collected?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            We collect limited information through our
            <nuxt-link to="/apps/">browser extension</nuxt-link>
            in accordance with our
            <nuxt-link to="/privacy/">privacy policy</nuxt-link> and perform
            in-depth analysis using in-house crawlers. Our unique methods ensure
            only actively visited websites are included in the lists, including
            pages that traditional crawlers can't reach.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How fresh is the data?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            The data is being updated and added to every day. By default, lookup
            results can be up to three months old but this can be lowered down
            to one month. Live results are real-time.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How do you determine website traffic?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Website traffic is tracked using our
            <nuxt-link to="/apps/">browser extensions</nuxt-link> with over 2M
            users. The install base provides a large enough sample set to
            determine which websites receive more traffic than others, resulting
            in a relative traffic indicator.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I resell the data or embed it in my customer-facing product?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Reselling or sharing our data is prohibited by our
            <nuxt-link to="/terms/">terms of use</nuxt-link>. If you're an
            Enterprise customer and would like to apply for an exception, please
            <nuxt-link to="/contact/">contact us</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Do you offer a free trial?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Sign up for <nuxt-link to="/pricing/">free plan</nuxt-link> to get
            50 credits every month to use with the APIs and other products.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-if="topic === 'pricing'" flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Do you offer a free trial?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Sign up for a free account to get 50 credits every month to spend on
            technology lookups, email verifications and alerts.
          </p>

          <p>
            On a free account, you can create lead lists to get a free sample.
            Once you find what you need you can sign up for a
            <nuxt-link to="/pro/">PRO</nuxt-link> plan or purchase a credit
            bundle to access the full list.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Do I need to sign up for a plan?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Paid plans are generally more cost-effective as they include monthly
            credits at a lower rate. Larger plans also include free lists,
            additional logins and priority support.
          </p>

          <p>
            If you prefer the flexibility of not having a plan and don't need to
            coordinate with team members, you're welcome to sign up for a free
            account and buy credits on a pay-as-you-go basis. Like any of the
            plans, credit bundles include
            <nuxt-link to="/pro/">PRO features</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What are Plus features?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Plus features include extended website lookups. With Plus, you have
            access to company and contact information in invididual technology
            lookups, the browser extension and Android app.
            <nuxt-link to="/plus/">See all Plus features</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What are PRO features?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            PRO features include lead lists, CRM integrations and access to
            company and contact information in all of our data products,
            including technology lookups, APIs and the browser extension.
            <nuxt-link to="/pro/">See all PRO features</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          >Can I pause or cancel my plan?</v-expansion-panel-header
        >
        <v-expansion-panel-content eager>
          <p>
            Yes, you can pause or cancel your plan at any time without losing
            access to your credits or past purchases.
          </p>

          <p>
            You may pause your plan for up to three months. During this time you
            won't be billed and credits included in your plan will not expire.
          </p>

          <p>
            When you cancel, your plan remains active for the remainder of the
            billing period and you can continue using your credits until they
            expire.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>What are credits?</v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Credits can be spent on a range of products, including lead lists,
            technology lookups and APIs. Each product has a fixed spend per
            unit, detailed on the
            <nuxt-link :to="{ path: '/pricing/', hash: '#usage' }"
              >pricing</nuxt-link
            >
            page.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          When do credits expire?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Credits included in plans expire after 60 days. Credits purchased in
            bundles expire after 365 days. Expired credits can no longer be
            used.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I use a different payment method?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            In most cases we only accept credit cards. For larger purchases or
            longer-term commitments, please
            <nuxt-link to="/contact/">contact us</nuxt-link> to discuss options.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What is your refund policy?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            If you're not satisfied with the quality of our offering we will
            either work with you to resolve the issue, credit your account or
            issue a pro-rata refund. Please refer to the
            <nuxt-link to="/terms/">terms of use</nuxt-link>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-if="topic === 'extension'" flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          What's the 'more info' tab about?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          The browser extension shows the technologies a websites uses, for
          free. On PLUS and PRO plans, the 'more info' tab reveals available
          company and contact information for the website as well as social
          media profiles and any other metadata we find.
          <nuxt-link to="/plus/">See all PLUS features</nuxt-link>.

          <v-card class="my-8" :max-width="1118 * 0.5">
            <v-img
              src="/images/faqs/extension-pro.png"
              alt="Wappalyzer PRO extension"
            />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I suggest a technology to be added?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            You can
            <nuxt-link to="/technologies/suggest/"
              >suggest a new technology</nuxt-link
            >. We only accept web technologies with an established user base.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Where can I report a bug?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          If you noticed something wrong or missing, please
          <nuxt-link to="/technologies/report-an-issue/"
            >report an issue</nuxt-link
          >. If you have any comment or suggestions,
          <nuxt-link to="/contact/">contact us</nuxt-link>!
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          How does the extension work?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            The extension inspects HTML, scripts, cookies and network requests
            and certificates of pages you visit, looking for unique technology
            fingerprints.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Can I hide technologies on my website from Wappalyzer?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            Although in many cases it's possible to change a software
            application's output to obfuscate its charactaristics, it's often
            impractical and unnecessary. If you're worried about security,
            ensure your software is always up-to-date. For more information, see
            <nuxt-link to="/articles/how-to-hide-technologies-from-wappalyzer/"
              >How to hide technologies from Wappalyzer</nuxt-link
            >.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          What information do you collect?
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <p>
            We collect information in accordance with our
            <nuxt-link to="/privacy/">privacy policy</nuxt-link>. By default,
            when you visit a website, we record the domain name and identified
            technologies in a way that can't be traced back to you. You can
            disable this behaviour in the extension's settings.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    topic: {
      type: String,
      default: 'lists',
    },
  },
}
</script>
