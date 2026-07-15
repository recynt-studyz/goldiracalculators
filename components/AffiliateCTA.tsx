export default function AffiliateCTA() {
  return (
    <div className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 p-6 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="text-3xl">🥇</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-1">
            Get Your FREE 2026 Gold IRA Kit
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed mb-3">
            Augusta Precious Metals — America&apos;s most trusted Gold IRA company. Zero BBB complaints on record.
            Thousands of Americans are protecting their retirement savings with physical gold bullion.
            Free information kit mailed to your door. No obligation, no pressure.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Claim Your Free Kit &rarr;
          </a>
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-500">
            Affiliate link — we may earn a commission if you request a kit, at no cost to you.
          </p>
        </div>
      </div>
    </div>
  )
}
