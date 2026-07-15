import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import ContributionCalculatorWrapper from '@/components/ContributionCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gold IRA Contribution Calculator 2026 — Maximize Your Savings',
  description:
    'Free gold IRA contribution calculator for 2026. Shows IRS limits, catch-up contributions for age 50+, and projected retirement balance at maximum savings.',
  alternates: { canonical: 'https://goldiracalculators.app/contribution' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the gold IRA contribution limit for 2026?',
    a: 'The 2026 IRS contribution limit for a Gold IRA (which follows the same rules as a traditional or Roth IRA) is $7,000 per year for individuals under age 50, and $8,000 per year for those age 50 and older. The extra $1,000 for those 50+ is called the "catch-up contribution." These limits apply to all your IRAs combined — if you contribute $4,000 to a traditional IRA, you can contribute a maximum of $3,000 more to a Gold IRA (for a combined $7,000 under age 50). These limits are set by the IRS and are subject to income limits for Roth IRA contributions.',
  },
  {
    q: 'Can I contribute to both a gold IRA and a 401k?',
    a: 'Yes. You can contribute to both a Gold IRA and a workplace 401k plan in the same year, and your 401k contributions do not count against your IRA contribution limit. The 2026 401k contribution limit is $23,500 ($31,000 for age 50+ with catch-up), completely separate from the $7,000/$8,000 IRA limit. High-earning investors often max out both — contributing $23,500 to a 401k for its employer match and tax deferral, while also contributing $7,000–$8,000 to a self-directed Gold IRA for precious metals exposure and portfolio diversification.',
  },
  {
    q: 'What is a catch-up contribution for a gold IRA?',
    a: 'The catch-up contribution is an additional $1,000/year that Americans age 50 and older can contribute to an IRA above the standard limit. In 2026, those under 50 can contribute up to $7,000 to a Gold IRA, while those 50 and older can contribute up to $8,000. The catch-up provision was created by Congress to help older workers who may have fallen behind on retirement savings to accumulate more tax-advantaged wealth in the final stretch before retirement. If you turned 50 at any point during 2026, you qualify for the full catch-up contribution for the entire year.',
  },
  {
    q: 'Is it better to contribute to a traditional or Roth gold IRA?',
    a: 'The choice between a Traditional and Roth Gold IRA depends primarily on your current tax rate versus your expected tax rate in retirement. If you expect to be in a higher tax bracket in retirement than you are now — common for younger earners early in their careers — a Roth Gold IRA is generally better: you pay taxes on contributions now at your lower rate, and all future gold appreciation and withdrawals are completely tax-free. If you expect a lower tax rate in retirement — common for investors near or at their peak earning years — a Traditional Gold IRA may be better, taking the deduction now at the higher rate and paying taxes at the lower rate later. Many investors hedge by holding both types.',
  },
  {
    q: 'Can I contribute to a gold IRA if I am retired?',
    a: 'Yes, you can contribute to a Roth Gold IRA at any age as long as you have earned income — wage, salary, self-employment income, or alimony (under pre-2019 agreements). However, you can no longer contribute to a Traditional IRA once you reach age 73, as required minimum distributions (RMDs) must begin. Note that RMDs apply only to Traditional Gold IRAs, not Roth Gold IRAs, which have no RMD requirement during the owner\'s lifetime. Retired individuals with part-time income or business income can continue to grow their Roth Gold IRA indefinitely.',
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
  name: 'Gold IRA Contribution Calculator 2026',
  url: 'https://goldiracalculators.app/contribution',
  description: 'Free gold IRA contribution calculator with 2026 IRS limits, catch-up contributions, and projected retirement balance at maximum contributions.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Gold IRA Contribution Strategy',
  step: [
    { '@type': 'HowToStep', name: 'Enter your age, retirement age, and current balance', text: 'Enter your current age and planned retirement age to determine your investment horizon. Input your current Gold IRA balance. If your age is 50 or older, the calculator automatically shows that you qualify for the $8,000 catch-up contribution limit.' },
    { '@type': 'HowToStep', name: 'Enter your planned annual contribution and select account type', text: 'Enter how much you plan to contribute annually, up to the 2026 IRS limit. Select Traditional or Roth Gold IRA to see the tax advantage comparison. Adjust the expected return slider based on your gold return assumption.' },
    { '@type': 'HowToStep', name: 'Review your projected balance and contribution scenarios', text: 'See your projected retirement balance, IRS 2026 contribution limits, and a comparison table showing how your balance changes at half-max, full-max, and catch-up contribution levels. The Traditional vs Roth comparison shows estimated tax advantages based on your tax bracket.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function ContributionPage() {
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
              Gold IRA Contribution Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your maximum gold IRA contributions and projected retirement balance. Includes 2026 IRS limits, catch-up contributions for 50+, and Traditional vs Roth comparison.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1616161616" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <ContributionCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1717171717" />
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Gold IRA Contributions Work in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A Gold IRA follows the same IRS contribution rules as a standard Traditional or Roth IRA. For 2026, the annual contribution limit is $7,000 for individuals under age 50 and $8,000 for those age 50 and older — the extra $1,000 is the &quot;catch-up contribution&quot; designed to help near-retirees accelerate savings. These limits apply to all your IRA accounts combined: if you hold both a traditional IRA and a Gold IRA, your total contributions across both cannot exceed the annual limit.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The power of annual contributions to a self-directed Gold IRA compounds over time. Using the formula <strong className="text-gray-900 dark:text-white">Future Value = Current Balance × (1 + rate)^years + Annual Contribution × ((1 + rate)^years − 1) / rate</strong>, each year&apos;s contribution begins compounding immediately. A $7,000 contribution made at age 50 at 8% annual return grows to approximately $32,700 by age 70 — a 467% return on that single year&apos;s contribution due to 20 years of tax-deferred compounding in the Gold IRA.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For Traditional Gold IRA contributions, traditional IRA deductibility rules apply based on income and whether you or your spouse have a workplace retirement plan. Roth Gold IRA contributions phase out for single filers with MAGI above $150,000 and for married filers above $236,000 in 2026. The decision between Traditional and Roth depends primarily on current versus expected future tax rates — a consideration worth discussing with a financial advisor given the long timeframes involved.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Required minimum distributions (RMDs) begin at age 73 for Traditional Gold IRAs. At that point, the IRS requires annual withdrawals based on your account balance and life expectancy tables. For Roth Gold IRAs, there are no RMDs during your lifetime — your precious metals can continue growing tax-free and pass to heirs with significant estate planning advantages. This makes Roth Gold IRAs particularly valuable for investors who may not need to draw from their gold IRA in early retirement years.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Carol&apos;s Contribution Strategy</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Carol is 51 years old with a $40,000 balance in her self-directed Gold IRA holding American Gold Eagle coins and gold bars in a segregated storage depository. She plans to retire at 67, giving her 16 years. She is deciding how much to contribute each year and whether Traditional or Roth is better for her situation (she is in the 22% tax bracket).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Current balance:  $40,000</div>
                <div>Age: 51 → Catch-up eligible → Max: $8,000/yr</div>
                <div>Rate: 8% | Years: 16</div>
                <div className="pt-2">SCENARIO: $4,000/yr (half max):</div>
                <div>  FV = $40,000×(1.08)^16 + $4,000×((1.08)^16−1)/0.08</div>
                <div>  FV = $137,060 + $121,300 = $258,360</div>
                <div className="pt-1">SCENARIO: $7,000/yr (under-50 max):</div>
                <div>  FV = $137,060 + $212,275 = $349,335</div>
                <div className="pt-1">SCENARIO: $8,000/yr (catch-up):</div>
                <div>  FV = $137,060 + $242,600 = $379,660</div>
                <div className="font-bold pt-1">Catch-up vs half-max: $121,300 MORE at retirement</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By maximizing her $8,000 catch-up contribution annually, Carol projects $379,660 at retirement compared to $258,360 at half the contribution — a $121,300 difference entirely from contribution discipline. For her Traditional vs Roth decision at the 22% bracket: if Carol expects to be in the 12% bracket in retirement (a realistic outcome with taxable income below $48,475 in 2026 brackets), Traditional IRA contributions are better — she saves 22% now and pays 12% later. If she expects to remain in the 22% bracket in retirement, the Roth Gold IRA is the better choice for tax-free precious metals growth.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Maximizing Gold IRA Contributions</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Consistency matters more than amount</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Contributing the maximum amount every year is ideal, but contributing consistently — even at lower amounts — is far better than contributing sporadically. A 50-year-old who contributes $5,000/year for 17 years to a Gold IRA accumulates more than a 55-year-old who contributes $8,000/year for only 10 years, because the additional 5 years of compound growth in the precious metals account outweighs the higher annual amount. Start contributing as early as possible and increase toward the maximum as your income allows.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">The 401k rollover as a contribution accelerant</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Annual contributions to a Gold IRA are limited to $7,000–$8,000/year — not enough to rapidly build a significant precious metals position if starting with zero. A 401k to Gold IRA rollover has no contribution limit: you can roll over $100,000, $500,000, or more in a single transaction. Most serious Gold IRA investors combine both strategies — making annual contributions while also initiating a partial or full rollover of their employer 401k to jump-start their precious metals allocation.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">IRS-approved precious metals for contributions</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">All contributions to a Gold IRA must be in cash — you cannot contribute physical gold you already own. After depositing cash, your Gold IRA custodian purchases IRS-approved gold bullion on your behalf: American Gold Eagles (the only U.S. gold coin with a special IRS exemption to the .999 purity rule), American Gold Buffalos (.9999 fine), Canadian Maple Leafs (.9999), or Australian Kangaroos (.9999). Gold bars must be .9995 fine from an approved assayer. Your custodian arranges purchase and delivery to an IRS-approved depository on your behalf.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1818181818" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
