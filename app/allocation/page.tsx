import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AllocationCalculatorWrapper from '@/components/AllocationCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gold IRA Allocation Calculator — How Much Gold Should You Own?',
  description:
    'Free gold IRA allocation calculator for 2026. Find your ideal precious metals allocation based on age, risk tolerance, and years to retirement.',
  alternates: { canonical: 'https://goldiracalculators.app/allocation' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What percentage of retirement savings should be in gold?',
    a: 'Most financial advisors and portfolio strategists recommend allocating 10–20% of a retirement portfolio to gold and precious metals. The specific percentage should increase as you age and approach retirement — younger investors (under 40) may hold only 5–10% in gold since they have time to recover from stock market volatility, while investors approaching retirement (55–65) often hold 15–20% to protect against sequence-of-returns risk. High-inflation environments or periods of geopolitical instability may warrant temporarily higher gold allocations as an inflation hedge.',
  },
  {
    q: 'Should I put all my IRA in gold?',
    a: 'No. Putting 100% of your retirement savings into any single asset class — including gold — is generally inadvisable. While gold is an effective inflation hedge and portfolio diversification tool, it does not pay dividends or interest and can be volatile over short periods. A 100% gold IRA would have no income generation and would be entirely dependent on gold spot price appreciation. Most financial experts recommend gold as a meaningful component of a diversified portfolio — typically alongside stocks, bonds, and other assets — rather than as a standalone retirement strategy.',
  },
  {
    q: 'What other precious metals can I hold in an IRA?',
    a: 'Beyond gold, a self-directed IRA can hold IRS-approved silver, platinum, and palladium. For silver, the purity requirement is .999 fine minimum — approved products include American Silver Eagles, Canadian Silver Maple Leafs, and Australian Silver Kookaburras. Platinum must be .9995 fine (American Platinum Eagles qualify). Palladium must be .9995 fine. Many Gold IRA companies like Augusta Precious Metals and Birch Gold Group offer all four precious metals. Silver is particularly popular for IRA diversification because its gold-to-silver ratio often indicates relative value between the two metals.',
  },
  {
    q: 'How does my age affect my gold allocation?',
    a: 'Age is the most important factor in determining how much gold to hold in your retirement portfolio. Younger investors (under 40) have decades to recover from stock market downturns, so a smaller 5–10% gold allocation provides inflation protection without sacrificing growth potential. Middle-aged investors (40–55) typically move to 10–15% gold as retirement approaches and preserving capital becomes more important. Pre-retirement investors (55–65) often hold 15–20% gold to hedge against a market crash occurring right before they start withdrawing. Retirees (65+) may hold 20–25% gold as capital preservation becomes the primary goal alongside income generation.',
  },
  {
    q: 'When should I rebalance my gold IRA allocation?',
    a: 'Most financial advisors recommend reviewing and rebalancing your precious metals allocation annually or when your target allocation drifts by more than 5 percentage points. For example, if gold rises 25% while stocks fall, your gold allocation might grow from 15% to 20% of your portfolio — at which point you would sell some gold and buy stocks to return to your target. Within a self-directed Gold IRA, you can direct your custodian to purchase or sell gold bullion to rebalance. Many investors also rebalance when they reach milestone ages (50, 55, 60, 65) to shift their allocation according to the age-based guidelines.',
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
  name: 'Gold IRA Allocation Calculator',
  url: 'https://goldiracalculators.app/allocation',
  description: 'Free gold IRA allocation calculator with age-based and risk-tolerance recommendations for precious metals portfolio diversification.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Ideal Gold IRA Allocation',
  step: [
    { '@type': 'HowToStep', name: 'Enter your age and total portfolio value', text: 'Enter your current age and total retirement portfolio value across all accounts (401k, IRA, brokerage, etc.). Your age is the primary driver of your recommended gold allocation — the calculator uses IRS-established age-based guidelines.' },
    { '@type': 'HowToStep', name: 'Select your risk tolerance', text: 'Choose Conservative, Moderate, or Aggressive. Conservative investors hold more gold (upper end of age range) for maximum downside protection. Aggressive investors hold less gold (lower end) to maximize growth potential. Most investors are best served by the Moderate setting.' },
    { '@type': 'HowToStep', name: 'See your recommended allocation and additional gold needed', text: 'The calculator shows your recommended gold percentage and dollar amount, your full portfolio allocation breakdown (stocks, bonds, gold), and how much additional gold you need to buy to reach your target. It also shows the inflation protection analysis for your portfolio.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function AllocationPage() {
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
              Gold IRA Allocation Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find out how much gold and precious metals you should own. Age-based and risk-adjusted recommendations for portfolio diversification and inflation protection.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1313131313" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AllocationCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1414141414" />
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How This Gold IRA Allocation Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This calculator uses age-based allocation guidelines combined with risk tolerance adjustments to determine the appropriate percentage of your retirement portfolio to hold in gold and precious metals. The age-based framework reflects the fundamental principle that as retirement approaches, capital preservation and inflation protection become increasingly important relative to aggressive growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The age ranges used are drawn from widely-cited investment guidelines: investors under 40 should hold 5–10% in precious metals; ages 40–55 should hold 10–15%; ages 55–65 should hold 15–20%; and those 65 and older should hold 20–25%. These ranges reflect gold&apos;s role as a portfolio diversification tool and inflation hedge in a complete retirement portfolio, not as a speculation or trading vehicle.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Risk tolerance adjusts where within each age range the recommended allocation falls. Conservative investors hold toward the upper end of the range (more gold = more downside protection), while aggressive investors hold toward the lower end (less gold = more growth exposure). Moderate investors hold at the midpoint. The remaining portfolio is split between stocks and bonds in ratios that also reflect risk tolerance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The inflation protection analysis calculates how much your portfolio would need to grow just to maintain purchasing power at 3.2% average annual inflation. Gold has historically been one of the most reliable long-term stores of purchasing power, making it a core component of any retirement savings strategy designed to survive multi-decade inflation.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Margaret&apos;s Allocation Review at Age 58</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Margaret is 58 years old with $650,000 in retirement savings: $480,000 in her 401k (stocks/bonds), $120,000 in a traditional IRA (mutual funds), and $50,000 in an existing self-directed Gold IRA. She is planning to retire at 65 — 7 years away — and has a moderate risk tolerance.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Age: 58 → Age range 55–65 → Gold target: 15–20%</div>
                <div>Risk: Moderate → Use midpoint: 17.5%</div>
                <div>Total portfolio: $650,000</div>
                <div>Gold target: $650,000 × 17.5% = $113,750</div>
                <div>Current gold IRA: $50,000</div>
                <div>Additional gold needed: $113,750 − $50,000 = $63,750</div>
                <div className="pt-2">Full portfolio breakdown (Moderate):</div>
                <div>  Stocks/ETFs (67.5% of non-gold): $358,125</div>
                <div>  Bonds (32.5% of non-gold): $178,125</div>
                <div>  Gold/Precious metals: $113,750</div>
                <div className="font-bold pt-1">Inflation protection: $650,000 → $814,000 needed in 7 years</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Margaret needs to add approximately $63,750 to her Gold IRA to reach her recommended precious metals allocation. She can do this through a partial 401k to Gold IRA rollover or direct contributions. At the 2026 IRS catch-up limit of $8,000/year (she qualifies at age 58), it would take about 8 years to reach this through contributions alone — suggesting a partial rollover is the more practical approach. Companies like Augusta Precious Metals handle the rollover paperwork from her existing 401k at no charge.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Your Gold Allocation Decision</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Sequence-of-returns risk near retirement</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Sequence-of-returns risk is the danger of experiencing a major stock market decline in the first few years of retirement, when you are drawing down your portfolio. A 30% stock market loss in year 1 of retirement can permanently reduce the amount available for future growth. Holding 15–20% in gold during this period provides a non-correlated asset you can draw from during stock market downturns, allowing your stocks time to recover. This is why gold allocation typically increases in the decade before retirement.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Inflation and purchasing power protection</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">At 3.2% average annual inflation, a 20-year retirement means prices will be roughly 87% higher at the end of retirement than at the start. Without inflation protection, a $2,000/month retirement budget in 2026 would need to be $3,740/month by 2046 to maintain the same purchasing power. Gold bullion in a self-directed IRA has historically tracked inflation over long periods and has significantly outpaced it during high-inflation decades, making it an essential inflation hedge for long retirement horizons.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Current portfolio composition and rebalancing</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you currently hold no gold or precious metals, increasing your allocation to the recommended level does not require selling your existing stocks and bonds — you can direct new contributions or rollover funds into a Gold IRA. If you already hold some gold, the &quot;additional gold needed&quot; field helps you see the gap. When rebalancing, consider tax implications: shifting funds within a tax-deferred IRA has no immediate tax consequences, while selling assets in a taxable brokerage account may trigger capital gains taxes.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1515151515" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
