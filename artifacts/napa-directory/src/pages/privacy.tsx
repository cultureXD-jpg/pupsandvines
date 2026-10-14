import { PageMeta } from "@/components/page-meta";

export default function Privacy() {
  return (
    <div className="w-full bg-background pb-20">
      <PageMeta
        title="Privacy Policy"
        description="Privacy Policy for Pups & Vines, the dog-friendly winery directory for Napa Valley and Sonoma County."
        canonical="/privacy"
        noindex
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-2">Effective Date: April 25, 2026</p>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: May 17, 2026</p>

        <div className="space-y-10">

          <section>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Pups &amp; Vines ("we," "us," or "our") collects, uses, and shares information about you when you visit <strong className="text-foreground">pupsandvines.com</strong> (the "Website"). By using the Website, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Information We Collect</h2>

            <h3 className="text-base font-semibold text-foreground mb-2">a. Information You Provide Voluntarily</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">When you contact us or submit a winery listing, you may provide:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed mb-6">
              <li>Name and email address</li>
              <li>Business information (winery name, location, dog-friendly details)</li>
              <li>Any other information submitted through contact or listing forms</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mb-2">b. Log Files</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Like most websites, Pups &amp; Vines uses log files. The information collected in log files includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed mb-4">
              <li>Internet Protocol (IP) address</li>
              <li>Browser type and version</li>
              <li>Internet Service Provider (ISP)</li>
              <li>Date and time stamp of each visit</li>
              <li>Referring and exit pages</li>
              <li>Number of clicks and pages visited</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              This information is used to analyze trends, administer the site, track user movement, and gather broad demographic information. It is not linked to personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
              <li>Operate, maintain, and improve the Website</li>
              <li>Review and publish directory submissions</li>
              <li>Respond to inquiries from users and winery owners</li>
              <li>Understand how visitors use the Website</li>
              <li>Serve relevant advertising through third-party ad partners</li>
              <li>Monitor and prevent fraudulent or abusive activity</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and enable advertising. Cookies are small data files placed on your device. You can disable cookies through your browser settings, though some features of the Website may not function properly as a result.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">We use the following types of cookies:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
              <li><strong className="text-foreground">Essential cookies</strong> — required for the Website to function</li>
              <li><strong className="text-foreground">Preference cookies</strong> — remember your settings and selections</li>
              <li><strong className="text-foreground">Analytics cookies</strong> — help us understand how visitors use the site</li>
              <li><strong className="text-foreground">Advertising cookies</strong> — used by our ad partners to deliver relevant, interest-based advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Google AdSense &amp; Third-Party Advertising</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Website uses <strong className="text-foreground">Google AdSense</strong>, an advertising service provided by Google LLC ("Google"). Google AdSense uses cookies, including the <strong className="text-foreground">DoubleClick cookie</strong>, to serve interest-based advertisements to visitors of this Website based on their prior visits to this site and other sites across the internet.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Interest-based advertising:</strong> Google uses the information collected via these cookies to show you ads that are more relevant to your interests. This includes combining data about your visits to this site with data from other Google products and services, and from third-party partner sites and applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">How to opt out of personalized advertising:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                Visit{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Ads Settings
                </a>
                {" "}to manage or opt out of Google personalized ads
              </li>
              <li>
                Visit{" "}
                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  aboutads.info
                </a>
                {" "}to opt out of interest-based advertising from participating companies
              </li>
              <li>
                Visit the{" "}
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Network Advertising Initiative (NAI) opt-out page
                </a>
                {" "}to opt out from NAI member ad networks
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Note that opting out of personalized ads does not mean you will stop seeing ads — it means the ads you see will no longer be tailored to your interests.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For more information on how Google collects and uses data when you visit sites that use Google products, please review{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google's Privacy Policy
              </a>
              {" "}and{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                How Google uses data from sites that use Google services
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Other Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may use additional third-party tools — including analytics providers, hosting services, and map providers — to help operate and improve the Website. These services have access to certain information as needed to perform their functions and are bound by their own privacy policies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Third-party services used on this Website may include Yelp (for ratings and reviews data), Google Maps (for location data), and others. We are not responsible for the privacy practices of any third-party service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Advertising &amp; Sponsored Listings</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Website displays advertisements served by Google AdSense and may feature sponsored directory listings. Advertising revenue helps us maintain and grow the directory at no cost to visitors or listed businesses.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ads on this site are clearly distinguishable from editorial content. We do not control the specific ads served, but we are committed to a relevant and respectful ad experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Data Sharing &amp; Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
              <li>With service providers who assist in operating the Website (subject to confidentiality obligations)</li>
              <li>With advertising partners (Google AdSense) as described in Section 4</li>
              <li>When required by law, court order, or governmental authority</li>
              <li>To protect the rights, property, or safety of Pups &amp; Vines, its users, or others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of any data you provide to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">9. California Residents — CCPA Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed mb-4">
              <li><strong className="text-foreground">Right to Know</strong> — what personal information we collect, use, and share</li>
              <li><strong className="text-foreground">Right to Delete</strong> — request deletion of personal information we have collected</li>
              <li><strong className="text-foreground">Right to Opt Out</strong> — we do not sell personal information; however, the use of advertising cookies by Google AdSense may constitute "sharing" under California law. You may opt out via the links in Section 4.</li>
              <li><strong className="text-foreground">Right to Non-Discrimination</strong> — we will not discriminate against you for exercising any of these rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise your rights, contact us at{" "}
              <a href="mailto:pupsandvines@gmail.com" className="text-primary hover:underline">
                pupsandvines@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">10. European Users — GDPR</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA) or United Kingdom, you have rights under the General Data Protection Regulation (GDPR), including the right to access, correct, or erase your personal data, and the right to restrict or object to processing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our legal basis for processing personal data is our legitimate interest in operating the Website and serving relevant advertising. To exercise your GDPR rights or withdraw consent, contact us at{" "}
              <a href="mailto:pupsandvines@gmail.com" className="text-primary hover:underline">
                pupsandvines@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">12. Links to Other Websites</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Website contains links to external websites, including winery websites and Yelp listings. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">13. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. The most current version will always be available on this page with an updated "Last Updated" date. We encourage you to review this page periodically. Continued use of the Website after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:{" "}
              <a href="mailto:pupsandvines@gmail.com" className="text-primary hover:underline">
                pupsandvines@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
