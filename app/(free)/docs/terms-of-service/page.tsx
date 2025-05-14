import type { Metadata } from "next";
import Link from "next/link";

/**
 * Terms of Service page – static React Server Component.
 * Converts the original MDX into a typed, framework-agnostic page.
 */

export const metadata: Metadata = {
  title: "Terms of Service | Open Cloud Map",
  description: "Terms and conditions governing your use of Open Cloud Map services.",
  alternates: { canonical: "https://www.opencloudmap.com/docs/legal/terms-of-service" },
};

const LAST_UPDATED = new Date("2025-05-14").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function TermsOfServicePage() {
  return (
    <article className="prose lg:prose-lg mx-auto py-8 dark:prose-invert prose-headings:scroll-mt-32">
      <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <p>
        These terms and conditions govern your use of Open Cloud Map’s services, unless you have an active executed order.
      </p>
      <p>Welcome to the future of mapping! We're glad you're here.</p>
      <p>
        This website, <Link href="https://www.opencloudmap.com">www.opencloudmap.com</Link> (the "site"), is owned and operated by Open Cloud Map, Inc. and our direct and indirect wholly-owned subsidiaries ("Open Cloud Map", "we" or "us"). By using the site, the Services and our proprietary software and related data we make available to you via the site or a third-party marketplace ("Marketplace"), or map content we make available to you through the Services (all the foregoing collectively, "Services"), you agree to be bound by the following Terms of Service, as updated from time to time (collectively, the "Terms"). Please read them carefully. If you don’t agree to these Terms, you may not use the Services.
      </p>
      <p>
        If you reside in Japan or if your principal place of business is in Japan, your access to and use of the Services is governed by the Japan Terms of Service.
      </p>

      <h2 id="signing-up">Signing Up</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          In order to use most Services, you must register for or authenticate into an Open Cloud Map account. To use our Services through a Marketplace, you may additionally or alternatively be required to register for or authenticate into a separate account for that Marketplace. When you use our application programming interfaces (APIs), each request to an API must include one of your account's unique API keys.
        </li>
        <li>
          Please carefully guard the security of your account and monitor use of your API keys. You are responsible for all use of the Services under your account, whether authorized or not. At our discretion, we may make limited exceptions for unauthorized use if you notify us of the problem promptly.
        </li>
        <li>
          You must be 18 years or older to use the Services. By registering or providing personal information on the site, you represent that you are at least 18 years old.
        </li>
        <li>
          If you are entering into this agreement on behalf of a company or another legal entity, you represent that you have authority to bind that entity to these Terms, in which case “you” refers to that entity.
        </li>
      </ol>

      <h2 id="our-services">Our Services</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Subject to these Terms, we grant you a non-exclusive, non-transferable, non-sublicensable, revocable license to:
          <ol className="list-decimal pl-6 space-y-2">
            <li>Incorporate the Services in Licensed Applications (as defined in the Product Terms).</li>
            <li>Make the Services as incorporated available to End Users (as defined in the Product Terms).</li>
          </ol>
        </li>
        <li>Your rights for non-production use are conditional on purchasing additional licenses when required under these Terms.</li>
        <li>If your Licensed Application is related to business intelligence, analytics, cloud database management, real estate, or vehicle usage, separate commercial and/or development licenses may be required.</li>
        <li>Contact us if you need enterprise products or volume-based discounts.</li>
        <li>We may make beta or evaluation products available (“Evaluation Products”). Such products are for internal evaluation only and must be destroyed upon our written request.</li>
      </ol>

      <h2 id="end-users">End Users and Notification</h2>
      <p>
        You may not allow End Users or third parties to use the Services in a way that would violate these Terms if done by you. You agree to take reasonable efforts to prevent such use and to promptly notify us in writing of any unauthorized use.
      </p>

      <h2 id="service-terms">Service Terms &amp; Policies</h2>
      <p>
        You will comply with these Terms, our Product Terms, Data Processing Addendum, and Privacy Policy, each of which is incorporated by reference. You also agree to adhere to any additional policies posted on the site in conjunction with the Services.
      </p>

      <h2 id="charges">Charges and Payment</h2>
      <p>You agree to pay all fees owed for your use of the Services based on:</p>
      <ul>
        <li>Our publicly available pricing at <Link href="https://www.opencloudmap.com/pricing">opencloudmap.com/pricing</Link>, if you use Services directly through our site.</li>
        <li>Pricing in Marketplace listings if you transact via a third-party Marketplace.</li>
      </ul>
      <p>
        All charges are non-refundable unless prohibited by law. Late payments may bear interest at 1.5% per month (or the highest permissible rate). You are responsible for any bank or currency exchange fees. Taxes (other than those on our net income) are your responsibility.
      </p>

      <h2 id="content-data">Content and Data</h2>
      <p><strong>Your Content</strong>:</p>
      <ul>
        <li>You retain ownership of all content you upload or create via the Services.</li>
        <li>You grant us a license to host, copy, cache, publish, display, distribute, modify, and store Your Content solely to provide the Services.</li>
        <li>Upon account termination, we will remove Your Content, although caching may persist temporarily.</li>
      </ul>
      <p><strong>Our Content &amp; Third-Party Content</strong>:</p>
      <ul>
        <li>All content other than Your Content is owned by us or our licensors and protected by law.</li>
        <li>You may not remove proprietary notices or labels from any content.</li>
        <li>We may anonymize and aggregate data for our own use.</li>
      </ul>

      <h2 id="feedback">Feedback</h2>
      <p>You agree that any feedback, suggestions, or ideas you provide may be used by us without restriction.</p>

      <h2 id="publicity">Publicity</h2>
      <p>
        During the term of these Terms, you grant us a license to use your name and logo to identify you as an Open Cloud Map customer. Let us know if you prefer otherwise.
      </p>

      <h2 id="account-cancellation">Account Cancellation or Suspension</h2>
      <ul>
        <li>You may cancel your account at any time; however, we do not provide pro-rated refunds for mid-cycle cancellations.</li>
        <li>We may terminate or suspend your access immediately upon breach of these Terms or with 30 days' notice for any reason.</li>
        <li>You are responsible for backing up your data before cancellation or suspension.</li>
      </ul>

      <h2 id="changes">Changes to Services or Terms</h2>
      <p>
        We may modify these Terms or the Services by posting updated terms on the site. Changes are effective upon posting unless a later date is specified. Continued use constitutes acceptance of the new terms.
      </p>

      <h2 id="indemnification">Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Open Cloud Map and its representatives from any claim arising out of:
      </p>
      <ul>
        <li>Your use of the Services.</li>
        <li>Violation of these Terms.</li>
        <li>End User misuse of the Services in your application.</li>
        <li>Content you or End Users submit.</li>
      </ul>

      <h2 id="disclaimers">Disclaimers</h2>
      <p>
        <strong>THE SERVICES ARE PROVIDED “AS IS,” WITHOUT WARRANTIES OF ANY KIND.</strong> TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
      </p>

      <h2 id="liability">Limitation of Liability</h2>
      <p>
        UNDER NO CIRCUMSTANCES SHALL OPEN CLOUD MAP OR ITS AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF $100 USD OR THE AMOUNTS YOU PAID US IN THE PRIOR 12 MONTHS.
      </p>

      <h2 id="dmca">Digital Millennium Copyright Act (DMCA) Compliance</h2>
      <p>If you believe any content infringes your copyright, provide our Copyright Agent with a notice containing:</p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>A signature of the copyright owner or agent.</li>
        <li>Identification of the copyrighted work.</li>
        <li>Identification of the infringing material and its location.</li>
        <li>Contact information for the complaining party.</li>
        <li>A statement of good-faith belief of infringement.</li>
        <li>A statement under penalty of perjury that the information is accurate.</li>
      </ol>
      <p>
        Send notice to: <Link href="mailto:mathewlewallen@gmail.com" className="underline">mathewlewallen@gmail.com</Link>
      </p>

      <h2 id="additional-terms">Additional Terms</h2>
      <ul>
        <li>Keep your contact information current.</li>
        <li>Do not encourage others to violate these Terms.</li>
        <li>We may audit your use once per 12-month period to ensure compliance.</li>
        <li>These Terms are governed by the laws of New York, USA, and disputes must be filed in New York courts.</li>
        <li>Headings are for convenience only and have no legal effect.</li>
      </ul>
      <p>
        You agree that no joint venture, partnership, employment, or agency relationship exists between you and Open Cloud Map as a result of these Terms.
      </p>
    </article>
  );
}
