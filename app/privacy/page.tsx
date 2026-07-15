import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — goldiracalculators.app',
  description: 'Privacy policy for goldiracalculators.app. All gold IRA calculations are done locally in your browser. No personal financial data is collected or transmitted.',
  alternates: { canonical: 'https://goldiracalculators.app/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobggic.webp')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">Your financial data never leaves your device</p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-xs text-gray-400 dark:text-gray-500">Last updated: July 2026</p>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No personal financial data collected</h2>
            <p>All Gold IRA calculations on goldiracalculators.app are performed entirely within your web browser using JavaScript. Your retirement balance, IRA contributions, rollover amounts, ages, and other financial information are <strong>never transmitted to our servers</strong>. We have no access to your financial data.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">localStorage</h2>
            <p>We use your browser&apos;s localStorage to save your calculator inputs so they persist across page reloads on the same device. Keys used: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-growth</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-rollover</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-comparison</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-fees</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-allocation</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-contribution</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-theme</code> (dark mode preference). This data is stored only on your device and is never sent to any server. Clear it at any time through your browser&apos;s site data settings.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Google AdSense</h2>
            <p>We display advertisements through Google AdSense (publisher ID: ca-pub-5035661017594256). Google may use cookies and similar technologies to show you relevant ads based on your browsing activity. Google&apos;s privacy policy governs this data use. You can opt out of personalized ads through Google&apos;s ad settings at <a href="https://adssettings.google.com" className="text-[#d97706] dark:text-amber-400 underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Google Analytics</h2>
            <p>We use Google Analytics (GA4, property ID: G-KMD293K0CC) to understand aggregate site usage — pages visited, session counts, and general traffic patterns. Analytics data is aggregated and does not identify individual users or contain any financial information you enter into our calculators.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Affiliate links</h2>
            <p>This site contains affiliate links to Gold IRA companies including Augusta Precious Metals, Goldco, and Birch Gold Group. If you click an affiliate link and request information from a company, we may receive compensation. Clicking an affiliate link does not transmit your calculator data to the affiliate company — it simply navigates you to their website.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cookies</h2>
            <p>We use a single localStorage key (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">gic-theme</code>) to remember your dark mode preference. Google AdSense and Google Analytics may set their own cookies in accordance with their respective privacy policies.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact</h2>
            <p>For privacy-related questions, please contact us through the Contact link in the footer.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
