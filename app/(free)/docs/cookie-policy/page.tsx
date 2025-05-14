import type { Metadata } from "next";
import Link from "next/link";

/**
 * Cookie Policy page – static React Server Component.
 * Tailwind’s `prose` class is used for default typography.
 * Custom components (e.g. <Note />) can be swapped in later without
 * touching the core policy text.
 */

export const metadata: Metadata = {
  title: "Cookie Policy | Open Cloud Map",
  description: "Details on cookies and similar technologies used by Open Cloud Map.",
  alternates: { canonical: "https://www.opencloudmap.com/docs/legal/cookie-policy" },
};

const LAST_UPDATED = new Date("2025-05-14").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function CookiePolicyPage() {
  return (
    <article className="prose prose-headings:scroll-mt-32 lg:prose-lg mx-auto py-8 dark:prose-invert">
      <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <h1>Cookie Policy</h1>
      <p>
        This Cookie Policy explains how <strong>Open Cloud Map</strong> uses cookies and similar
        tracking technologies when you visit our website (<Link href="https://www.opencloudmap.com">www.opencloudmap.com</Link>) or use our Services.
      </p>

      <h2 id="what-are-cookies">1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device that help websites recognize your device
        and remember information such as your preferences or login status.
      </p>

      <h2 id="types-of-cookies">2. Types of Cookies We Use</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Cookie Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Essential</strong></td>
              <td>Required for core site functionality (session management).</td>
              <td>Session</td>
            </tr>
            <tr>
              <td><strong>Performance</strong></td>
              <td>Collect anonymous analytics to improve site performance.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td><strong>Functional</strong></td>
              <td>Remember user preferences and settings (e.g., theme).</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td><strong>Analytics</strong></td>
              <td>Track usage patterns via tools like Google Analytics.</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td><strong>Marketing</strong></td>
              <td>Deliver personalized ads through third‑party platforms.</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="third-party-cookies">3. Third‑Party Cookies</h2>
      <p>
        We may allow third‑party services (like Google Analytics, Sentry) to place cookies on your
        device to analyze usage or monitor performance. These providers have their own privacy and
        cookie policies, and you can manage their cookies via your browser settings.
      </p>

      <h2 id="managing-cookies">4. Managing & Disabling Cookies</h2>
      <p>You can control or delete cookies through your browser settings. Below are helpful links:</p>
      <ul>
        <li>
          <strong>Chrome:</strong>{" "}
          <Link href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Manage cookies
          </Link>
        </li>
        <li>
          <strong>Firefox:</strong>{" "}
          <Link href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">
            Manage cookies
          </Link>
        </li>
        <li>
          <strong>Safari:</strong>{" "}
          <Link href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">
            Manage cookies
          </Link>
        </li>
        <li>
          <strong>Edge:</strong>{" "}
          <Link href="https://support.microsoft.com/edge/manage-cookies" target="_blank" rel="noopener noreferrer">
            Manage cookies
          </Link>
        </li>
      </ul>
      <p>Please note that disabling cookies may impact certain features or functionality of our Services.</p>

      <h2 id="consent">5. Consent</h2>
      <p>
        By continuing to use our site and Services, you consent to our use of cookies as described in
        this policy. You can withdraw consent by deleting or blocking cookies, but this may affect your experience.
      </p>

      <h2 id="changes">6. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. The “Last updated” date at the top
        reflects the effective revision. Continued use of our site after changes indicates acceptance of the updated policy.
      </p>

      <h2 id="contact-us">7. Contact Us</h2>
      {/* Replace <aside> with your design‑system Note component if desired */}
      <aside className="border-l-4 border-primary pl-4 italic rounded-md bg-muted/40 py-2">
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
