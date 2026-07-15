import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RolloverCalculatorWrapper from '@/components/RolloverCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '401k to Gold IRA Rollover Calculator 2026',
  description:
    'Calculate your 401k to gold IRA rollover tax implications. Free rollover calculator showing direct vs indirect rollover differences and projected growth after transfer.',
  alternates: { canonical: 'https://goldiracalculators.app/rollover' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Can I roll my 401k into a gold IRA without penalty?',
    a: 'Yes, you can roll over your 401k into a self-directed Gold IRA without taxes or penalties using a direct trustee-to-trustee transfer. In a direct rollover, your 401k plan administrator sends funds directly to your Gold IRA custodian — the money never passes through your hands. This avoids all withholding, taxes, and the 60-day rule entirely. It is the IRS-recommended method and the approach used by reputable Gold IRA companies like Augusta Precious Metals, Goldco, and Birch Gold Group.',
  },
  {
    q: 'How long does a 401k to gold IRA rollover take?',
    a: 'A direct 401k to gold IRA rollover typically takes 2–6 weeks from start to finish. The process involves opening a self-directed IRA with a gold IRA custodian (1–3 business days), completing transfer paperwork with your 401k administrator (5–10 business days), waiting for funds to transfer (3–7 business days), and then directing the custodian to purchase IRS-approved gold bullion from an authorized dealer (1–3 business days). Companies like Augusta Precious Metals and Goldco have dedicated specialists who manage the paperwork and can often accelerate the process.',
  },
  {
    q: 'What is the difference between a direct and indirect rollover?',
    a: 'In a direct rollover, your 401k custodian transfers funds directly to your Gold IRA custodian. No taxes are withheld, there is no deadline, and the transfer is completely tax-free. In an indirect rollover, your 401k plan sends you a check after withholding 20% for federal taxes. You then have 60 days to deposit the full original balance (including the 20% withheld) into your new Gold IRA. If you cannot cover the withheld amount out-of-pocket, that shortfall is treated as a taxable distribution and may be subject to a 10% early withdrawal penalty if you are under age 59½. Direct rollovers are almost always preferable.',
  },
  {
    q: 'Is there a limit on how much I can roll into a gold IRA?',
    a: 'No, there is no IRS limit on the amount you can roll over from a 401k, 403b, 457 plan, or existing IRA into a self-directed Gold IRA. Rollovers are not subject to the annual IRA contribution limit ($7,000 for 2026, or $8,000 for age 50+). However, the rollover must be completed as a direct trustee-to-trustee transfer to avoid taxes. You may roll over a portion of your balance (partial rollover) or the entire account balance. Many investors in their 50s and 60s roll over a portion of their 401k to diversify into precious metals for portfolio protection.',
  },
  {
    q: 'What happens if I miss the 60-day rollover deadline?',
    a: 'If you take an indirect rollover and fail to deposit the full amount into your Gold IRA within 60 calendar days, the IRS treats the entire amount as a taxable distribution. You will owe ordinary income tax at your marginal rate on the full rollover amount, plus a 10% early withdrawal penalty if you are under age 59½. For a $200,000 rollover at the 24% tax bracket, the cost of missing the deadline could exceed $68,000 in taxes and penalties. There is a once-per-year exception called an IRS waiver of the 60-day rule for specific hardship situations, but it is difficult to qualify for. This is why direct rollovers are strongly recommended.',
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
  name: '401k to Gold IRA Rollover Calculator 2026',
  url: 'https://goldiracalculators.app/rollover',
  description: 'Free 401k to gold IRA rollover calculator showing direct vs indirect rollover differences and tax implications.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Roll Over a 401k to a Gold IRA',
  step: [
    { '@type': 'HowToStep', name: 'Enter your 401k balance, age, and tax bracket', text: 'Enter your current 401k or IRA balance, your age, and your current marginal tax bracket. This information allows the calculator to show the tax implications of both direct and indirect rollover methods.' },
    { '@type': 'HowToStep', name: 'Choose direct or indirect rollover', text: 'Select Direct Rollover (trustee-to-trustee transfer) or Indirect Rollover (60-day rule). The calculator will show taxes owed, penalties, and the amount that reaches your Gold IRA under each scenario.' },
    { '@type': 'HowToStep', name: 'Review projected growth in your Gold IRA', text: 'See how much your rolled-over balance will grow by your retirement age at 8% annual gold return. This shows the long-term cost of taxes and penalties from an indirect rollover versus the full growth potential of a direct rollover.' },
  ],
}

const trustSignals = ['🥇 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function RolloverPage() {
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
              401k to Gold IRA Rollover Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your rollover tax implications. Compare direct vs indirect rollover, see taxes owed, and project your precious metals IRA growth after transfer.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="4444444444" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RolloverCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="5555555555" />
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How a 401k to Gold IRA Rollover Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A 401k to Gold IRA rollover is the process of moving retirement funds from an employer-sponsored 401k, 403b, or 457 plan into a self-directed IRA that holds physical gold bullion and other IRS-approved precious metals. The rollover itself is governed by IRS rules under IRC Section 408, and when done correctly it is entirely tax-free and penalty-free. There are two methods: the direct rollover and the indirect rollover.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In a <strong className="text-gray-900 dark:text-white">direct rollover</strong> (the recommended method), your 401k custodian transfers funds directly to your new Gold IRA custodian via check made payable to the new custodian — not to you. This trustee-to-trustee transfer means you never touch the money, so the IRS does not treat it as a distribution. No taxes are withheld, no 60-day deadline applies, and 100% of your rollover amount is immediately available to purchase gold bullion, American Gold Eagles, Canadian Maple Leafs, or other IRS-approved precious metals at your depository.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In an <strong className="text-gray-900 dark:text-white">indirect rollover</strong>, your 401k plan sends you a check — but first withholds 20% for federal income taxes. You receive 80% of your balance. You then have exactly 60 calendar days to deposit the full original balance (including the 20% withheld) into your new self-directed Gold IRA. If you can cover the 20% shortfall from personal savings and complete the rollover within 60 days, you recover the withheld taxes when you file your return. But if you cannot cover the shortfall, that amount is treated as a taxable distribution — subject to ordinary income tax plus a 10% early withdrawal penalty if you are under age 59½.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The IRS allows one indirect rollover per 12-month period per IRA. There is no limit on direct rollovers. Gold IRA custodians like Augusta Precious Metals, Goldco, and Birch Gold Group all specialize in 401k to Gold IRA rollovers and typically provide free rollover assistance, handling all the paperwork with your plan administrator on your behalf.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Robert&apos;s 401k to Gold IRA Rollover</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Robert is 54 years old with $280,000 in his former employer&apos;s 401k plan. He wants to roll $200,000 into a self-directed Gold IRA to hedge against inflation and diversify his retirement portfolio into precious metals. He is in the 22% federal tax bracket.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div className="font-bold">DIRECT ROLLOVER (recommended):</div>
                <div>Amount rolled over:        $200,000</div>
                <div>Taxes withheld:            $0</div>
                <div>Penalties:                 $0</div>
                <div>Available for gold IRA:    $200,000</div>
                <div className="pt-2 font-bold">INDIRECT ROLLOVER (if chosen):</div>
                <div>Employer withholds 20%:    −$40,000</div>
                <div>Check Robert receives:     $160,000</div>
                <div>Must deposit within 60 days: $200,000</div>
                <div>Robert must add from savings: $40,000</div>
                <div>If he can only deposit $160,000:</div>
                <div>  Taxable distribution:    $40,000</div>
                <div>  Tax at 22%:              $8,800</div>
                <div>  No penalty (over 59½ threshold at 54 but not under 59½...)</div>
                <div>  Wait — Robert is 54, under 59½:</div>
                <div>  Early withdrawal penalty: $4,000</div>
                <div className="font-bold pt-1">Total cost of indirect: $12,800 in unnecessary taxes + penalties</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Robert chooses a direct rollover. His entire $200,000 moves to his Gold IRA custodian, where it immediately purchases physical gold bullion at the current spot price. At 8% annual return, $200,000 grows to approximately $466,000 by age 65. If he had chosen the indirect rollover and only deposited $160,000 due to being unable to cover the $40,000 withheld, his projected balance at 65 would be only $373,000 — a $93,000 difference from the same 401k rollover decision.
              </p>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in a Gold IRA Rollover</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Choosing a qualified Gold IRA custodian</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">A self-directed Gold IRA must be held by an IRS-approved custodian — a bank, credit union, or trust company. The custodian handles account administration, IRS reporting, and ensures your gold bullion is stored in an IRS-approved depository. Augusta Precious Metals, Goldco, and Birch Gold Group are among the most established and highly rated Gold IRA custodians in 2026, with dedicated rollover specialists who manage the entire transfer process.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">IRS-approved gold and precious metals</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Not all gold qualifies for an IRA. The IRS requires gold to be at least .995 fine (99.5% pure). Approved coins include American Gold Eagles, American Gold Buffalos, Canadian Gold Maple Leafs, and Australian Gold Kangaroos. Gold bars must meet the .9999 fineness standard from an approved refiner. Collectible or numismatic coins are not IRS-approved for IRAs regardless of their gold content.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Your age and the early withdrawal penalty</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you are under age 59½ and an indirect rollover distribution is not redeposited within 60 days, the IRS imposes a 10% early withdrawal penalty on top of ordinary income tax. For a $100,000 partial distribution at the 22% bracket, that is $32,000 in taxes and penalties. Direct rollovers eliminate this risk entirely regardless of age.</p>
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="6666666666" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
