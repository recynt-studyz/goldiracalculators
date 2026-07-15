import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import GoldVsStocksCalculatorWrapper from '@/components/GoldVsStocksCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gold vs Stocks Calculator — Which Performs Better?',
  description:
    'Compare gold IRA returns vs stock market performance. Free calculator with historical data, inflation adjustment, and side-by-side retirement projections.',
  alternates: { canonical: 'https://goldiracalculators.app/gold-vs-stocks' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Does gold outperform stocks over the long term?',
    a: 'Over very long periods, stocks have generally outperformed gold. The S&P 500 has returned approximately 10.5% annually over the past 50 years, while gold has returned approximately 7.9% over the same period. However, gold significantly outperformed stocks during key crisis periods — including 2000–2011 (the "lost decade" for stocks where gold rose 500%), 2007–2009 (gold was up, stocks lost 38%), and 2018–2023. The key insight is that gold and stocks tend to perform inversely, making a blended portfolio of both more stable than either alone.',
  },
  {
    q: 'Why do financial advisors recommend gold in retirement?',
    a: 'Financial advisors recommend gold for several reasons specific to retirement portfolios. First, gold is an effective inflation hedge — it has maintained purchasing power over centuries and tends to rise when inflation spikes. Second, gold is a portfolio diversifier with low correlation to stocks and bonds, reducing overall portfolio volatility. Third, physical gold in a self-directed IRA held at an approved depository has no counterparty risk — unlike stocks, bonds, or bank deposits, gold cannot default or go bankrupt. Most advisors recommend 10–20% in precious metals for investors approaching retirement.',
  },
  {
    q: 'How did gold perform during the 2008 financial crisis?',
    a: 'During the 2008 financial crisis, gold was one of the best-performing assets available. While the S&P 500 fell 38.5% in 2008 and the average 401k lost approximately 27% of its value, gold rose approximately 5% for the year. The divergence was even more dramatic over the full crisis period: from October 2007 to March 2009, the S&P 500 fell 57% while gold fell only 20% before recovering quickly. Investors with 15% of their retirement savings in a Gold IRA saw significantly less damage to their total retirement portfolio than those fully invested in stocks.',
  },
  {
    q: 'What percentage of my portfolio should be in gold?',
    a: 'The appropriate gold allocation depends on your age, risk tolerance, and investment goals. For retirement investors, common guidelines suggest: age 40–55 should hold 10–15% in gold and precious metals; age 55–65 should hold 15–20%; age 65+ should hold 20–25% as capital preservation becomes more important than growth. Conservative investors may want to be at the higher end of these ranges, while aggressive investors may prefer the lower end. The key principle is that gold provides its greatest benefit as a portfolio diversification tool — it doesn&apos;t need to be your largest holding to meaningfully protect your retirement savings.',
  },
  {
    q: 'Is gold a good inflation hedge?',
    a: 'Gold has a strong long-term track record as an inflation hedge. Over periods of 10–20 years, gold has historically maintained and even increased its purchasing power relative to the U.S. dollar. During the high inflation periods of the 1970s, gold rose from $35/oz to $850/oz. During the post-2020 inflation surge, gold rose from $1,500/oz to over $2,500/oz before reaching approximately $3,300/oz in 2026. However, gold is not a perfect short-term inflation hedge — it can underperform inflation in specific years. Over a 20–30 year retirement planning horizon, gold&apos;s historical record as an inflation hedge is strong.',
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
  name: 'Gold vs Stocks Calculator',
  url: 'https://goldiracalculators.app/gold-vs-stocks',
  description: 'Free gold vs stocks calculator comparing precious metals IRA returns versus S&P 500 performance with historical data and inflation adjustment.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Gold IRA vs Stock Returns',
  step: [
    { '@type': 'HowToStep', name: 'Enter your investment amount and time horizon', text: 'Enter your initial investment amount, monthly contribution, and time horizon in years. Use the same inputs for both gold and stocks to get a fair apples-to-apples comparison of your retirement savings.' },
    { '@type': 'HowToStep', name: 'Adjust return assumptions', text: 'The gold return slider defaults to 8% (near the 20-year historical average). The stock return defaults to 10.5% (S&P 500 historical average). Adjust these to stress-test different scenarios, such as a recession period where gold outperforms or a bull market where stocks dominate.' },
    { '@type': 'HowToStep', name: 'Review the side-by-side comparison and inflation-adjusted values', text: 'The results show both nominal and inflation-adjusted projected values for gold and stocks at 10, 20, and 30 year marks. The 2008 crisis scenario illustrates how gold historically protects portfolios during stock market downturns.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function GoldVsStocksPage() {
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
              Gold vs. Stocks Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Compare gold IRA returns versus S&amp;P 500 performance side by side. Historical data, inflation adjustment, and crisis scenario analysis. See which performs better for your retirement.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="7777777777" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <GoldVsStocksCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="8888888888" />
          </div>

          {/* Key Insight Banner */}
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-2">
              The key insight: gold and stocks work together, not against each other
            </h2>
            <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
              Gold tends to outperform during recessions, geopolitical crises, and high-inflation environments. Stocks tend to outperform during economic expansions. Because gold and stocks have a low (and often negative) correlation, holding both in your retirement portfolio reduces overall volatility while maintaining long-term growth. Most financial advisors recommend 10–20% gold allocation for retirement investors — enough to provide meaningful protection without sacrificing growth potential.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How This Gold vs. Stocks Comparison Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This calculator applies the standard compound growth formula to both asset classes simultaneously: <strong className="text-gray-900 dark:text-white">Future Value = Initial Investment × (1 + rate)^years + Annual Contribution × ((1 + rate)^years − 1) / rate</strong>. Monthly contributions are converted to annual for the formula. Both gold and stocks are calculated with the same initial investment and contribution amount — the only variable is the assumed return rate, giving you a true apples-to-apples comparison.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The default gold return of 8% falls slightly above gold&apos;s 30-year annualized average (7.9%) and below its 20-year average (8.7%). The gold spot price has risen from approximately $255/oz in 2001 to approximately $3,300/oz in 2026 — a 25-year compound annual growth rate of about 11%. The default stock return of 10.5% reflects the S&P 500 index&apos;s long-run historical average, which includes both dividends and price appreciation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The inflation adjustment divides the nominal future value by (1 + inflation rate)^years to convert projected balances into today&apos;s purchasing power. At 3.2% inflation, $1 million in 20 years is worth only about $528,000 in today&apos;s dollars. Gold&apos;s value as an inflation hedge means its real (inflation-adjusted) return is often similar to its nominal return when inflation is high — unlike bonds, which lose real value in inflationary environments.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The 2008 crisis scenario is based on actual historical data: the S&P 500 fell 38.5% in 2008, while gold rose 5.5% for the year. This illustrates the portfolio protection value of precious metals in a self-directed IRA — not that gold always outperforms stocks, but that it tends to perform well precisely when stocks perform worst.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $150,000 Over 25 Years</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                James is 40 years old with $150,000 to invest for retirement. He is deciding how to allocate between a Gold IRA and an S&P 500 index fund. He plans to contribute $500/month ($6,000/year) for 25 years until age 65.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Initial investment:    $150,000</div>
                <div>Annual contribution:  $6,000</div>
                <div>Time horizon:         25 years</div>
                <div className="pt-2 font-bold">GOLD IRA (8% return):</div>
                <div>Growth factor (1.08)^25 =  6.848</div>
                <div>Balance growth: $150,000 × 6.848 = $1,027,200</div>
                <div>Contrib growth: $6,000 × (6.848−1)/0.08 = $438,600</div>
                <div className="font-bold">Gold IRA Total:   $1,465,800</div>
                <div className="pt-2 font-bold">S&P 500 (10.5% return):</div>
                <div>Growth factor (1.105)^25 = 11.974</div>
                <div>Balance growth: $150,000 × 11.974 = $1,796,100</div>
                <div>Contrib growth: $6,000 × (11.974−1)/0.105 = $626,800</div>
                <div className="font-bold">S&P 500 Total:    $2,422,900</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At default assumptions, the S&P 500 outperforms the Gold IRA by roughly $957,000 over 25 years — a significant difference. However, this comparison assumes continuous smooth returns. In practice, a portfolio that was 100% stocks in 2007 would have fallen to about $600,000 during the 2008 crash before recovering. A blended 80/20 portfolio (stocks/gold) would have maintained approximately $750,000 during the same crash, allowing James to avoid panic selling at the bottom. The real value of gold in a retirement portfolio is often measured not in average returns, but in the crashes it helped you survive.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Gold vs. Stocks Performance</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Economic cycle and inflation environment</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Gold tends to outperform when inflation is high, the dollar is weak, geopolitical risk is elevated, or recession fears dominate. Stocks tend to outperform when GDP is growing, corporate earnings are rising, and interest rates are moderate. A portfolio with 15% in a Gold IRA and 85% in equities naturally rebalances toward gold during downturns, providing a cushion without requiring active management.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Gold spot price and the current gold market</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">At approximately $3,300/oz in 2026, the gold spot price reflects significant demand from central banks (who have been net buyers of gold since 2010), institutional investors, and retail Gold IRA investors. The World Gold Council estimates central bank gold purchases have added structural support to the gold spot price. Investors purchasing gold bullion through a self-directed IRA at today&apos;s prices are buying into a market with strong underlying demand from both retail and institutional buyers.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Correlation and portfolio volatility</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Gold has a historically low to negative correlation with U.S. stocks — meaning when stocks fall sharply, gold often rises or falls much less. Adding a 15–20% gold allocation to an all-stock portfolio has historically reduced the portfolio&apos;s maximum drawdown (peak-to-trough loss) by 5–10 percentage points, with only a modest reduction in long-run average return. This risk-adjusted benefit is the core reason for including precious metals in a diversified retirement portfolio.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="9999999999" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
