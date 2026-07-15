import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — goldiracalculators.app',
  description: 'About goldiracalculators.app — free 2026 gold IRA calculators for retirement planning, precious metals allocation, and 401k rollover analysis.',
  alternates: { canonical: 'https://goldiracalculators.app/about' },
  robots: { index: true, follow: true },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'goldiracalculators.app',
  url: 'https://goldiracalculators.app',
  description: 'Free 2026 gold IRA calculators for retirement planning, precious metals allocation, 401k rollover, and gold vs stocks comparison.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobggic.webp')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">About goldiracalculators.app</h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Free, private, and accurate gold IRA calculators for 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-6 py-5">
              <h2 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">Our mission</h2>
              <p className="text-amber-800 dark:text-amber-400">
                goldiracalculators.app provides free, accurate, and private gold IRA calculation tools for the 2026 tax year. Our six calculators cover Gold IRA growth projection, 401k to Gold IRA rollover analysis, gold vs stocks comparison, fee impact calculation, precious metals allocation, and IRA contribution planning — all updated for 2026 IRS rules.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Educational purpose</h2>
              <p>
                All calculators on goldiracalculators.app are provided for <strong>educational and informational purposes only</strong>. They are designed to help retirement savers understand approximately how a self-directed Gold IRA grows over time, how a 401k to Gold IRA rollover affects taxes, and how precious metals allocation interacts with portfolio diversification.
              </p>
              <p className="mt-3">
                <strong>These calculators do not constitute tax, legal, or financial advice.</strong> Gold IRA performance depends on gold spot prices, custodian fees, storage fees at approved depositories, and many other factors our calculators simplify or approximate. Always consult a licensed financial advisor before making any investment decisions regarding precious metals, self-directed IRAs, or 401k rollovers. For official IRA rules, refer to the Internal Revenue Service at <a href="https://www.irs.gov" className="text-[#d97706] dark:text-amber-400 underline" target="_blank" rel="noopener noreferrer">irs.gov</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">YMYL compliance — investment content quality</h2>
              <p>
                Gold IRA content is classified by Google as &quot;Your Money or Your Life&quot; (YMYL) — content that could significantly impact readers&apos; financial wellbeing. We take this responsibility seriously. Every page on this site includes prominent disclaimers about estimates vs. actual results, &quot;consult a licensed financial advisor&quot; language, and &quot;past performance does not guarantee future results&quot; notices. We do not make specific buy/sell recommendations or guarantee any level of gold IRA returns.
              </p>
              <p className="mt-3">
                Our 2026 IRS data includes: annual contribution limits ($7,000 under 50, $8,000 age 50+ with catch-up), required minimum distribution age (73), early withdrawal penalty rate (10% under age 59½), IRS-approved gold purity standards (.995 minimum), and approved precious metals coins (American Gold Eagle, American Gold Buffalo, Canadian Gold Maple Leaf, Australian Gold Kangaroo).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy — your data stays with you</h2>
              <p>
                All Gold IRA calculations happen entirely in your browser using JavaScript. Your retirement balance, contribution amounts, ages, and other financial data are never sent to any server. We do not collect, store, or transmit any personal financial information. Calculator inputs are saved only to your browser&apos;s localStorage for convenience across sessions on the same device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Affiliate disclosure</h2>
              <p>
                This site may display affiliate links to Gold IRA companies including Augusta Precious Metals, Goldco, and Birch Gold Group. If you click an affiliate link and request information from one of these companies, we may receive compensation. This compensation does not affect our calculator results, recommendations, or editorial content. We only link to reputable, established Gold IRA custodians with strong customer reviews and BBB ratings. Our calculators are free, unbiased, and are not influenced by affiliate relationships.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Disclaimer</h2>
              <p className="text-amber-700 dark:text-amber-400 font-medium">
                These calculators provide estimates for educational purposes only. Gold IRA performance depends on gold prices, fees, and market conditions which vary. Past performance does not guarantee future results. Consult a licensed financial advisor before making any investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
