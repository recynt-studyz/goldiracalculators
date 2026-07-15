import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import GoldIRAGrowthCalculatorWrapper from '@/components/GoldIRAGrowthCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gold IRA Calculator 2026 — Project Your Retirement Growth',
  description:
    'Free gold IRA growth calculator for 2026. Project your retirement balance with IRS contribution limits, historical gold returns, and inflation-adjusted projections.',
  alternates: { canonical: 'https://goldiracalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much does a gold IRA grow on average?',
    a: 'A gold IRA\'s growth depends on the gold spot price, your contributions, and fees. Over the past 20 years, gold has returned approximately 8.7% annually. Over the past 10 years the annualized return has been 9.1%, and over 5 years it has been 12.4%. However, gold prices are volatile and can fall sharply in short periods — it rose over 25% in 2020 but was relatively flat in 2021 and 2022. A realistic long-term planning assumption is 7–9% annually, though past performance does not guarantee future results.',
  },
  {
    q: 'What is a realistic return for a gold IRA?',
    a: 'For long-term retirement planning, most financial analysts use 7–9% annually for gold IRA projections. The 30-year annualized return for gold bullion is approximately 7.9%, which accounts for both strong periods (post-2008, post-2020) and weaker periods. At the current gold spot price of approximately $3,300/oz, the precious metals market has already priced in significant economic uncertainty. Setting your expected return at 8% in this calculator is a reasonable, historically-grounded assumption for a self-directed IRA investing primarily in gold bullion.',
  },
  {
    q: 'How does a gold IRA compare to a traditional IRA?',
    a: 'Both Traditional Gold IRAs and Traditional stock/bond IRAs share the same tax structure: contributions may be deductible, growth is tax-deferred, and withdrawals are taxed as ordinary income. The key difference is what you hold inside the account. A traditional IRA typically holds stocks, bonds, and mutual funds. A self-directed Gold IRA holds IRS-approved physical gold bullion — American Gold Eagles, American Gold Buffalos, Canadian Maple Leafs, or Australian Kangaroos — stored in an IRS-approved depository. Gold provides portfolio diversification, inflation hedging, and tends to preserve purchasing power over long periods.',
  },
  {
    q: 'Can I lose money in a gold IRA?',
    a: 'Yes. Gold prices fluctuate significantly, and a gold IRA is not a risk-free investment. Gold lost approximately 28% from its 2011 peak to 2015. However, unlike stocks of individual companies, gold bullion is unlikely to go to zero since it has maintained value for thousands of years. Gold IRAs also carry custodian fees, storage fees at IRS-approved depositories, and dealer markups on purchases (typically 3–8% above spot price), which all reduce your net return. This is why most advisors recommend gold as a portfolio diversification tool — typically 10–20% of a retirement portfolio — rather than the sole holding.',
  },
  {
    q: 'How much should I put in a gold IRA?',
    a: 'Most financial advisors recommend allocating 10–20% of a retirement portfolio to precious metals as an inflation hedge and portfolio diversification tool. The exact percentage depends on your age, risk tolerance, and years to retirement. At age 40–55 a 10–15% allocation is typical; at age 55–65 a 15–20% allocation provides more downside protection as retirement approaches. The 2026 IRS annual contribution limit for a gold IRA is $7,000 (under age 50) or $8,000 (age 50+ with catch-up). Many investors fund their gold IRA through a 401k to gold IRA rollover, which has no contribution limit restriction.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Gold IRA Growth Calculator 2026',
  url: 'https://goldiracalculators.app',
  description: 'Free gold IRA growth calculator with 2026 IRS contribution limits, historical gold returns, and inflation-adjusted projections.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Gold IRA Growth',
  step: [
    { '@type': 'HowToStep', name: 'Enter your current age, retirement age, and Gold IRA balance', text: 'Start by entering your current age and target retirement age to determine your investment horizon. Then enter your current gold IRA balance — this could be a new account starting at $0 or an existing self-directed IRA with accumulated precious metals.' },
    { '@type': 'HowToStep', name: 'Set your annual contribution and expected return', text: 'Enter how much you plan to contribute annually to your gold IRA. The 2026 IRS limit is $7,000 (under 50) or $8,000 (age 50+ with catch-up contribution). Use the return slider to set your assumed annual gold return — 8% is a reasonable historical average.' },
    { '@type': 'HowToStep', name: 'Review your projected value and comparison', text: 'Your projected gold IRA value at retirement appears instantly, along with a breakdown showing starting balance, total contributions, investment growth, and inflation-adjusted value. A comparison shows how the same inputs perform in an S&P 500 index fund to help you see the full picture.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobggic.webp')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Gold IRA Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Project your gold IRA growth at retirement. Includes 2026 IRS contribution limits, historical gold returns, inflation adjustment, and comparison to stocks. Instant, private, free.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <GoldIRAGrowthCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Stays in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results as you type' },
              { icon: '🥇', label: '2026 Updated', sub: 'Current IRS rules' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How This Gold IRA Growth Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This calculator uses compound interest math to project how your self-directed Gold IRA will grow from today to your retirement date. The core formula — the same one used by financial professionals — is: <strong className="text-gray-900 dark:text-white">Future Value = Current Balance × (1 + rate)^years + Annual Contribution × ((1 + rate)^years − 1) / rate</strong>. This captures both the compound growth on your existing precious metals balance and the accumulated value of each year&apos;s new contributions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The &quot;expected annual return&quot; slider defaults to 8%, which falls near the middle of gold&apos;s historical return range. Gold has returned 12.4% annualized over the past 5 years, 9.1% over 10 years, 8.7% over 20 years, and 7.9% over 30 years. A self-directed IRA holding physical gold bullion in an IRS-approved depository grows tax-deferred, meaning you pay no annual capital gains tax on appreciation — a meaningful advantage that increases the effective return compared to holding gold in a taxable brokerage account.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The inflation-adjusted value uses a 3.2% average annual inflation rate, representing historical long-run average CPI inflation in the United States. This shows you what your projected gold IRA balance would be worth in today&apos;s purchasing power at retirement — the number that actually matters for planning your retirement income.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The stocks comparison runs the same inputs through a 10.5% return assumption — the historical average for the S&P 500 index. This side-by-side view helps you understand the trade-off between gold&apos;s inflation-hedging and crisis-protection benefits versus equities&apos; higher long-run returns. Most advisors recommend a diversified retirement portfolio that includes both — typically 10–20% in gold and precious metals with the remainder in stocks and bonds.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Patricia&apos;s Gold IRA Growth Projection</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Patricia is 52 years old with $85,000 in her self-directed Gold IRA, currently holding American Gold Eagle coins and gold bullion bars in a custodian depository. She plans to retire at 68 — giving her 16 years of continued growth. She contributes $8,000 per year (the maximum for age 50+ in 2026) and assumes an 8% average annual gold return.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Current balance:          $85,000</div>
                <div>Annual contribution:       $8,000 (catch-up eligible at 52)</div>
                <div>Expected return:           8% / year</div>
                <div>Years to retirement:       16</div>
                <div>Growth factor:             (1.08)^16 = 3.426</div>
                <div className="pt-2">Balance growth: $85,000 × 3.426 =     $291,210</div>
                <div>Contribution growth: $8,000 × (3.426−1)/0.08 = $242,600</div>
                <div className="font-bold pt-1">Projected Total:           $533,810</div>
                <div>Inflation-adj (3.2%):     $533,810 / (1.032)^16 = $325,040</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Patricia&apos;s gold IRA is projected to reach approximately $534,000 at retirement, or about $325,000 in today&apos;s purchasing power. Her total contributions over 16 years would be $128,000 — meaning investment growth in her precious metals account accounts for over $320,000 of the final balance. If she had started at 42 instead of 52, the same inputs would project to over $1.1 million — illustrating the extraordinary power of starting a self-directed IRA early and letting compound growth work over decades.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Gold IRA Growth</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Gold spot price and market conditions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The gold spot price — currently approximately $3,300 per troy ounce in 2026 — directly determines the value of your gold bullion holdings. Gold tends to rise during periods of high inflation, geopolitical uncertainty, and dollar weakness, and to fall or stagnate during strong economic expansions. Diversifying your self-directed IRA across gold, silver, and other IRS-approved precious metals can smooth volatility.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Annual contribution consistency</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Maxing out your annual contribution every year is among the highest-leverage actions available to a Gold IRA investor. The 2026 IRS limit is $7,000 for those under 50 and $8,000 for those 50 and older (including the $1,000 catch-up contribution). A 55-year-old who maxes out contributions for 10 years adds $80,000 in principal alone — which at 8% grows to approximately $123,000 by retirement.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Custodian and storage fees</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Gold IRA fees include custodian fees ($75–$300/year), depository storage fees ($100–$300/year for non-segregated storage), and dealer markups on purchases (3–8% above spot price). Over 20 years, high fees can cost you tens of thousands in lost compounding. Choosing a low-fee custodian like Augusta Precious Metals, Goldco, or Birch Gold Group can preserve substantially more of your precious metals portfolio at retirement.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Time in the market and starting age</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The earlier you open and fund a self-directed Gold IRA, the more time compound growth has to work. Starting at 40 instead of 50 with the same annual contribution nearly doubles the projected balance at 65. A rollover of a 401k to a Gold IRA in your 40s or early 50s, rather than waiting, is one of the most impactful financial decisions a retirement saver can make.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
