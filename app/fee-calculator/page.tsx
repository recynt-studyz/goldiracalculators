import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import FeeCalculatorWrapper from '@/components/FeeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gold IRA Fee Calculator — How Fees Affect Your Returns',
  description:
    'Calculate the true cost of gold IRA fees on your retirement savings. See how custodian fees, storage fees, and dealer markups compound over time.',
  alternates: { canonical: 'https://goldiracalculators.app/fee-calculator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What are typical gold IRA fees?',
    a: 'Gold IRA fees typically include a one-time setup or account opening fee ($50–$200), an annual custodian fee ($75–$300/year), and an annual storage fee at an IRS-approved depository ($100–$300/year for non-segregated storage, higher for segregated). Additionally, when you purchase gold bullion, dealers charge a markup above the gold spot price — typically 3–8% for government-issued gold coins like American Eagles or Canadian Maple Leafs. Premium gold coins may carry higher markups. Total annual fees (custodian + storage) typically range from $175/year at low-cost providers like Goldco to $600+/year at high-fee custodians. This difference compounds significantly over 20 years.',
  },
  {
    q: 'Are gold IRA fees tax deductible?',
    a: 'Whether gold IRA fees are tax deductible depends on how and where you pay them. If custodian and storage fees are paid from funds outside the IRA (personal funds), they may be deductible as investment expenses on Schedule A. However, the 2017 Tax Cuts and Jobs Act suspended this deduction for most taxpayers through 2025 (though it may be revisited under future legislation). Fees paid from inside the IRA directly reduce your account balance — no deduction, but the fees are not treated as a taxable distribution. Consult a licensed CPA for personalized tax advice on your specific situation.',
  },
  {
    q: 'What is segregated storage and why does it cost more?',
    a: 'Segregated storage means your physical gold bullion is stored separately and identified specifically as yours at the depository — your gold bars and coins are not commingled with other investors\' precious metals. This adds cost ($25–$150/year more) because the depository must maintain and track specific vault space and inventory for your account. Non-segregated (or commingled) storage means your gold is stored with other investors\' gold of the same type and purity — you own a claim to a specific quantity of gold but not specific bars. For large accounts or investors who want maximum clarity about their holdings, segregated storage at a reputable depository like Brinks or Delaware Depository is worth the premium.',
  },
  {
    q: 'How do I find a low-fee gold IRA custodian?',
    a: 'The most effective way to minimize gold IRA fees is to compare custodians before opening an account. Augusta Precious Metals offers a flat $200/year for custodian and storage combined for accounts under $100,000 — rising to 0.1% for larger accounts, which remains competitive. Goldco charges $175–$225/year. Birch Gold Group charges approximately $180/year. When comparing, look at the total annual cost (custodian fee + storage fee), not just the advertised number — some custodians charge separately for each. Also compare dealer markups on gold purchases, as a 3% vs 8% markup difference on $50,000 of purchases is a $2,500 difference that compounds over time.',
  },
  {
    q: 'What is a dealer markup and how does it affect my returns?',
    a: 'A dealer markup is the premium a gold dealer charges above the gold spot price when you purchase physical gold bullion for your IRA. If gold spot price is $3,300/oz and you pay $3,462/oz, the markup is 4.9%. For a $50,000 gold purchase, a 5% markup means you pay $52,500 but immediately own $50,000 in gold — a built-in loss of $2,500 before any market movement. Over time, higher markups reduce your effective return. At 5% markup with $7,000 in annual contributions, the effective amount of gold purchased each year is only $6,650. Over 20 years, a 5% vs 3% markup difference reduces your final balance by more than you might expect due to the compounding effect of buying less gold each year.',
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
  name: 'Gold IRA Fee Calculator',
  url: 'https://goldiracalculators.app/fee-calculator',
  description: 'Free gold IRA fee calculator showing the true long-term cost of custodian fees, storage fees, and dealer markups on your precious metals IRA.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Gold IRA Fee Impact',
  step: [
    { '@type': 'HowToStep', name: 'Enter your balance, contributions, and return', text: 'Enter your starting Gold IRA balance, annual contribution amount, years until retirement, and expected annual gold return. These establish the baseline for your fee impact calculation.' },
    { '@type': 'HowToStep', name: 'Enter your current or expected Gold IRA fees', text: 'Input your setup fee (one-time), annual custodian fee, annual storage fee, and dealer markup percentage. Use actual fees from your current custodian or typical fees from custodians you are considering.' },
    { '@type': 'HowToStep', name: 'See the total fee impact on your retirement balance', text: 'The calculator shows your projected balance both without fees and with your fees, along with the total fee impact including lost compounding growth. Compare this to low-fee custodians to quantify potential savings.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function FeeCalculatorPage() {
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
              Gold IRA Fee Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate the true long-term cost of gold IRA fees on your retirement savings. See how custodian fees, storage fees, and dealer markups compound over 20+ years.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1010101010" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <FeeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1111111112" />
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Gold IRA Fees Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Gold IRA fees have a compounding effect that dramatically increases their true cost over time. A $350/year fee sounds modest, but over 20 years it reduces not just by $7,000 in direct fees — it also eliminates years of compound growth on that money. At 8% annual return, $350 invested today grows to $1,630 in 20 years. Each year of $350 in fees represents not just $350 of lost savings but the entire future compound value of that amount.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This calculator accounts for three fee mechanisms. First, the <strong className="text-gray-900 dark:text-white">setup fee</strong> is a one-time charge that reduces your opening balance before any gold bullion is purchased. Second, <strong className="text-gray-900 dark:text-white">annual fees</strong> (custodian + storage) reduce your effective net return each year. The calculator models this by subtracting annual fees as a percentage of your starting balance from your gross return rate. Third, the <strong className="text-gray-900 dark:text-white">dealer markup</strong> reduces the effective amount of gold you receive for each contribution — a 5% markup on $7,000 means only $6,650 actually purchases precious metals.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The comparison to major Gold IRA custodians — Augusta Precious Metals, Goldco, and Birch Gold Group — uses their publicly available fee structures. Augusta Precious Metals is notable for offering a flat $200/year fee structure that does not scale with account size, making it particularly valuable for investors with larger balances. For a $300,000 account, Augusta&apos;s $200/year flat fee represents 0.067% of assets — significantly below industry average percentage-based fees.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: The Real Cost of High Gold IRA Fees</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                David has $100,000 in a self-directed Gold IRA and contributes $7,000 per year. He has 20 years to retirement and assumes 8% annual gold returns. He is comparing a low-fee custodian ($200/year total) versus an industry-average custodian ($525/year total), both with 5% dealer markup.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>WITHOUT FEES (gross): $483,550 at retirement</div>
                <div className="pt-1">LOW-FEE ($200/yr total):</div>
                <div>  Net return: 8% − ($200/$100,000) = 7.80%</div>
                <div>  Effective contribution: $7,000 × 95% = $6,650</div>
                <div>  Projected balance: $454,200</div>
                <div>  Total fee impact: $29,350</div>
                <div className="pt-1">HIGH-FEE ($525/yr total):</div>
                <div>  Net return: 8% − ($525/$100,000) = 7.475%</div>
                <div>  Effective contribution: $6,650 (same markup)</div>
                <div>  Projected balance: $432,900</div>
                <div>  Total fee impact: $50,650</div>
                <div className="font-bold pt-1">Difference of choosing low-fee: $21,300 more at retirement</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The $325/year difference between the low-fee and high-fee custodian costs David over $21,000 in lost retirement savings — money that should be in his precious metals account, not paying for unnecessary custodian overhead. Over 30 years, the difference between custodians can exceed $60,000. This is why thoroughly comparing gold IRA custodian fees before rolling over a 401k or opening a self-directed IRA is one of the most important decisions a precious metals investor can make.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Gold IRA Fee Impact</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Account size and percentage-based fees</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Some custodians charge percentage-based fees (e.g., 0.1–0.35% of account value per year) rather than flat fees. For small Gold IRA accounts under $50,000, percentage fees may be lower than flat fees. For larger accounts of $100,000 or more, flat-fee custodians like Augusta Precious Metals become significantly cheaper. Always calculate your actual annual dollar cost, not just the percentage.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Dealer markup above spot price</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The markup above the gold spot price varies by dealer and gold product type. American Gold Eagle coins typically carry higher premiums (4–8% above spot) than gold bars (2–5% above spot). Government-minted coins like the Canadian Gold Maple Leaf and Australian Gold Kangaroo are IRS-approved for precious metals IRAs and often carry competitive premiums. Some Gold IRA companies lock in purchase prices at the time of the phone consultation, protecting you from price increases during processing.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">The compounding cost of fees over time</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The longer your investment horizon, the larger the impact of annual fees. A $300/year fee difference has 20× more impact over a 20-year horizon than over a 1-year horizon, due to compound growth on the foregone fee amounts. Investors who are 40–50 years old opening a Gold IRA today will feel the full compounding impact of fees over 20–25 years. Choosing the lowest-cost reputable custodian at account opening has a multiplicative benefit that grows every year.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1212121212" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
