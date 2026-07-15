'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'gic-contribution'

function compound(pv: number, contrib: number, rate: number, years: number): number {
  if (years <= 0) return pv
  if (rate === 0) return pv + contrib * years
  const g = Math.pow(1 + rate, years)
  return pv * g + contrib * (g - 1) / rate
}

const TAX_BRACKETS = [
  { label: '10%', rate: 0.10 },
  { label: '12%', rate: 0.12 },
  { label: '22%', rate: 0.22 },
  { label: '24%', rate: 0.24 },
  { label: '32%', rate: 0.32 },
  { label: '35%', rate: 0.35 },
  { label: '37%', rate: 0.37 },
]

export default function ContributionCalculator() {
  const [age, setAge] = useState('48')
  const [retirementAge, setRetirementAge] = useState('67')
  const [balance, setBalance] = useState('25000')
  const [contribution, setContribution] = useState('7000')
  const [accountType, setAccountType] = useState<'Traditional' | 'Roth'>('Traditional')
  const [expectedReturn, setExpectedReturn] = useState('8')
  const [taxBracket, setTaxBracket] = useState('0.22')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.age) setAge(p.age)
        if (p.retirementAge) setRetirementAge(p.retirementAge)
        if (p.balance) setBalance(p.balance)
        if (p.contribution) setContribution(p.contribution)
        if (p.accountType) setAccountType(p.accountType)
        if (p.expectedReturn) setExpectedReturn(p.expectedReturn)
        if (p.taxBracket) setTaxBracket(p.taxBracket)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const currentAge = parseInt(age) || 48
  const retAge = parseInt(retirementAge) || 67
  const pv = parseFloat(balance) || 0
  const contrib = parseFloat(contribution) || 0
  const rate = (parseFloat(expectedReturn) || 8) / 100
  const taxRate = parseFloat(taxBracket) || 0.22
  const years = Math.max(0, retAge - currentAge)

  const isCatchupEligible = currentAge >= 50
  const maxContrib = isCatchupEligible ? 8000 : 7000
  const halfMax = Math.floor(maxContrib / 2)

  // Main projection
  const projectedFv = compound(pv, contrib, rate, years)

  // Scenarios
  const scenarios = [
    { label: `$${(halfMax).toLocaleString()} (half max)`, contrib: halfMax, fv: compound(pv, halfMax, rate, years) },
    { label: '$7,000 (full max under 50)', contrib: 7000, fv: compound(pv, 7000, rate, years) },
    { label: '$8,000 (50+ catch-up)', contrib: 8000, fv: compound(pv, 8000, rate, years) },
  ]

  const maxScenarioFv = scenarios[isCatchupEligible ? 2 : 1].fv
  const halfMaxFv = scenarios[0].fv
  const extraAtMaxVsHalf = maxScenarioFv - halfMaxFv

  // Tax comparison (simple illustrative)
  // Traditional: taxable withdrawals in retirement
  // Roth: tax-free withdrawals
  // Illustrative tax saved with Roth = tax on total distributions (simplified)
  const estimatedTaxSaved = projectedFv * taxRate * 0.04 * years * 0.5 // rough estimate

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Traditional', 'Roth'] as const).map(t => (
                <button key={t} onClick={() => { setAccountType(t); save({ accountType: t }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    accountType === t ? 'bg-[#d97706] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {t} Gold IRA
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Current Age</label>
              <input type="number" value={age}
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={inputCls} min="18" max="90" placeholder="48" />
            </div>
            <div>
              <label className={labelCls}>Retirement Age</label>
              <input type="number" value={retirementAge}
                onChange={e => { setRetirementAge(e.target.value); save({ retirementAge: e.target.value }) }}
                className={inputCls} min="50" max="90" placeholder="67" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Current Gold IRA Balance ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance}
                onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="25000" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Annual Contribution ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={contribution}
                onChange={e => { setContribution(e.target.value); save({ contribution: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" max="8000" placeholder="7000" />
            </div>
            {isCatchupEligible && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#d97706] dark:text-amber-400 font-medium">
                <span>✓</span>
                <span>You qualify for the $8,000 catch-up contribution limit (age 50+)</span>
              </div>
            )}
            {!isCatchupEligible && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                2026 IRS limit: $7,000/yr. At age 50 you can contribute $8,000/yr including the $1,000 catch-up.
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className={labelCls}>Expected Annual Return</label>
              <span className="text-sm font-bold text-[#d97706]">{expectedReturn}%</span>
            </div>
            <input type="range" min="4" max="15" step="0.5" value={expectedReturn}
              onChange={e => { setExpectedReturn(e.target.value); save({ expectedReturn: e.target.value }) }}
              className="w-full accent-[#d97706]" />
          </div>

          <div>
            <label className={labelCls}>Your Tax Bracket (for Traditional vs Roth comparison)</label>
            <select value={taxBracket}
              onChange={e => { setTaxBracket(e.target.value); save({ taxBracket: e.target.value }) }}
              className={inputCls}>
              {TAX_BRACKETS.map(b => (
                <option key={b.rate} value={b.rate}>{b.label} bracket</option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl bg-[#d97706]/10 dark:bg-[#d97706]/20 border border-[#d97706]/30 p-5">
            <p className="text-sm text-[#d97706] dark:text-amber-300 font-medium mb-1">
              Projected Retirement Balance
            </p>
            <p className="text-4xl font-bold text-[#d97706] dark:text-amber-200">{fmt(projectedFv)}</p>
            <p className="text-sm text-[#d97706]/70 dark:text-amber-400 mt-1">
              At age {retAge} ({years} years), contributing {fmt(contrib)}/year at {expectedReturn}%
            </p>
          </div>

          {/* IRS limits box */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">2026 IRS Gold IRA Contribution Limits</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-amber-700 dark:text-amber-400">Under age 50</span>
                <span className="font-bold text-amber-900 dark:text-amber-200">$7,000 / year</span>
              </div>
              <div className={`flex justify-between text-sm ${isCatchupEligible ? 'bg-[#d97706]/10 dark:bg-[#d97706]/20 rounded-lg px-2 py-1' : ''}`}>
                <span className="text-amber-700 dark:text-amber-400">Age 50+ (with catch-up)</span>
                <span className="font-bold text-amber-900 dark:text-amber-200">$8,000 / year</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-700 dark:text-amber-400">Catch-up extra amount</span>
                <span className="font-bold text-amber-900 dark:text-amber-200">$1,000</span>
              </div>
            </div>
          </div>

          {/* Contribution scenarios */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Contribution Scenarios at {years} Years</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left pb-2 font-medium">Annual Contribution</th>
                    <th className="text-right pb-2 font-medium">Balance at {retAge}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {scenarios.map(s => (
                    <tr key={s.label}>
                      <td className="py-2 text-gray-700 dark:text-gray-300">{s.label}</td>
                      <td className="py-2 text-right font-bold text-[#d97706] dark:text-amber-300">{fmt(s.fv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Maximizing contributions could mean {fmt(extraAtMaxVsHalf)} more at retirement compared to contributing half the annual limit. Consistent annual contributions to your self-directed Gold IRA, combined with tax-deferred compounding, are the most powerful tools for building precious metals retirement wealth.
            </p>
          </div>

          {/* Traditional vs Roth comparison */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Traditional vs Roth Gold IRA</p>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Traditional Gold IRA</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Contributions may be tax-deductible. Growth is tax-deferred. Withdrawals taxed as ordinary income. Required minimum distributions start at age 73.</p>
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3">
                <p className="text-xs font-bold text-[#d97706] dark:text-amber-300 mb-1">Roth Gold IRA</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">After-tax contributions. Growth is completely tax-free. Qualified withdrawals are tax-free. No required minimum distributions during your lifetime.</p>
                <p className="text-xs font-medium text-[#d97706] dark:text-amber-300 mt-1">
                  Estimated tax-free benefit at {(taxRate * 100).toFixed(0)}% bracket: {fmt(Math.abs(estimatedTaxSaved))} in taxes avoided over {years} years of withdrawals.*
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">*Illustrative estimate only. Actual tax savings depend on future tax rates and withdrawal amounts.</p>
          </div>

          <AffiliateCTA />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Gold IRA performance and tax implications vary by individual situation. Past performance does not guarantee future results. Consult a licensed financial advisor before making any investment decisions.
      </p>
    </div>
  )
}
