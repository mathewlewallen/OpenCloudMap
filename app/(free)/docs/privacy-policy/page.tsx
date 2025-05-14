import type { Metadata } from "next";
import Link from "next/link";

/**
 * Privacy Policy page – static React Server Component.
 * Mirrors the MDX content of `privacy-policy.mdx` while staying framework‑agnostic.
 */

export const metadata: Metadata = {
  title: "Privacy Policy | Open Cloud Map",
  description: "How Open Cloud Map collects, uses, and protects your personal information.",
  alternates: { canonical: "https://www.opencloudmap.com/docs/legal/privacy-policy" },
};

const LAST_UPDATED = new Date("2025-05-14").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function PrivacyPolicyPage() {
  return (
    <article className="prose lg:prose-lg mx-auto py-8 dark:prose-invert prose-headings:scroll-mt-32">
      <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <h1>Privacy Policy</h1>
      <p>
        At <strong>Open Cloud Map</strong>, your privacy is of utmost importance. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (<Link href="https://www.opencloudmap.com">www.opencloudmap.com</Link>) or use our services (all collectively, the “Services”). By accessing or using our Services, you agree to the terms of this Privacy Policy.
      </p>

      <h2 id="information-we-collect">1. Information We Collect</h2>
      <h3 id="information-you-provide">1.1 Information You Provide</h3>
      <ul>
        <li>
          <strong>Account Registration:</strong> Name, email address, password, and other profile details when you create an account.
        </li>
        <li>
          <strong>Communications:</strong> Any messages or support requests you submit via contact forms or email.
        </li>
        <li>
          <strong>Content &amp; Feedback:</strong> Feedback, comments, and other content you post or upload through our platform.
        </li>
      </ul>
      <h3 id="automatically-collected">1.2 Automatically Collected Information</h3>
      <ul>
        <li>
          <strong>Usage Data:</strong> Pages visited, features used, time spent, and other analytics captured by cookies and web beacons.
        </li>
        <li>
          <strong>Device &amp; Technical Data:</strong> IP address, browser type, operating system, and device identifiers.
        </li>
      </ul>
      <h3 id="cookies">1.3 Cookies &amp; Similar Technologies</h3>
      <p>We use cookies, local storage, and tracking pixels to:</p>
      <ul>
        <li>Maintain your session and preferences.</li>
        <li>Analyze usage patterns and improve our Services.</li>
        <li>Serve relevant marketing or support messages.</li>
      </ul>
      <p>You can manage or disable cookies via your browser settings, though this may affect certain features.</p>

      <h2 id="how-we-use-data">2. How We Use Your Information</h2>
      <p>We use collected data to:</p>
      <ul>
        <li>
          <strong>Provide &amp; Maintain Services:</strong> Authenticate users, process requests, and deliver features.
        </li>
        <li>
          <strong>Improve &amp; Personalize:</strong> Analyze usage trends, optimize performance, and customize your experience.
        </li>
        <li>
          <strong>Communication:</strong> Send security alerts, account updates, newsletters, or promotional offers (you may opt out at any time).
        </li>
        <li>
          <strong>Legal &amp; Security:</strong> Prevent fraud, enforce our Terms of Service, and comply with applicable laws.
        </li>
      </ul>

      <h2 id="data-sharing">3. Data Sharing &amp; Disclosure</h2>
      <p>We do <strong>not</strong> sell or rent your personal information. We may share your data with:</p>
      <ul>
        <li>
          <strong>Service Providers:</strong> Third parties who assist with hosting, analytics, email delivery, and payment processing.
        </li>
        <li>
          <strong>Affiliates &amp; Subsidiaries:</strong> For consistent service delivery across our corporate group.
        </li>
        <li>
          <strong>Legal Authorities:</strong> When required by law, court order, or to protect our rights, property, or safety.
        </li>
      </ul>

      <h2 id="security">4. Data Security</h2>
      <p>
        We implement industry-standard safeguards (e.g., encryption at rest and in transit, access controls) to protect your information. However, no system is fully secure; please take precautions when transmitting sensitive data.
      </p>

      <h2 id="transfers">5. International Data Transfers</h2>
      <p>
        By using our Services, you consent to transfer and processing of your data in regions outside your jurisdiction, including the United States, which may have different data protection laws.
      </p>

      <h2 id="children">6. Children’s Privacy</h2>
      <p>
        Our Services are not intended for users under 16. We do not knowingly collect personal data from minors. If we learn that we have inadvertently collected such data, we will delete it promptly.
      </p>

      <h2 id="rights">7. Your Privacy Rights</h2>
      <p>Depending on your jurisdiction, you may have rights to:</p>
      <ul>
        <li>Access, correct, or delete your personal data.</li>
        <li>Object to or restrict processing.</li>
        <li>Receive a portable copy of your data.</li>
      </ul>
      <p>To exercise these rights, contact us using the information below.</p>

      <h2 id="changes">8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated” date at the top will reflect the effective revision. Continued use after changes constitutes acceptance of the new policy.
      </p>

      <h2 id="contact">9. Contact Us</h2>
      <aside className="border-l-4 border-primary pl-4 rounded-md bg-muted/40 py-2">
        <p className="font-semibold mb-1">Contact Information</p>
        <p>
          Email:{" "}
          <Link href="mailto:mathewlewallen@gmail.com" className="underline">
            mathewlewallen@gmail.com
          </Link>
        </p>
      </aside>
    </article>
  );
}
