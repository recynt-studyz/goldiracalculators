'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'gic-growth'

function compound(pv: number, contrib: number, rate: number, years: number): number {
  if (years <= 0) return pv
  if (rate === 0) return pv + contrib * years
  const g = Math.pow(1 + rate, years)
  return pv * g + contrib * (g - 1) / rate
}

export default function GoldIRAGrowthCalculator() {
  const [accountType, setAccountType] = useState<'Traditional' | 'Roth'>('Traditional')
  const [currentAge, setCurrentAge] = useState('45')
  const [retirementAge, setRetirementAge] = useState('65')
  const [balance, setBalance] = useState('50000')
  const [contribution, setContribution] = useState('7000')
  const [goldAllocation, setGoldAllocation] = useState('15')
  const [expectedReturn, setExpectedReturn] = useState('8')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.accountType) setAccountType(p.accountType)
        if (p.currentAge) setCurrentAge(p.currentAge)
        if (p.retirementAge) setRetirementAge(p.retirementAge)
        if (p.balance) setBalance(p.balance)
        if (p.contribution) setContribution(p.contribution)
        if (p.goldAllocation) setGoldAllocation(p.goldAllocation)
        if (p.expectedReturn) setExpectedReturn(p.expectedReturn)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const age = parseInt(currentAge) || 45
  const retAge = parseInt(retirementAge) || 65
  const pv = parseFloat(balance) || 0
  const contrib = parseFloat(contribution) || 0
  const rate = (parseFloat(expectedReturn) || 8) / 100
  const years = Math.max(0, retAge - age)
  const inflationRate = 0.032

  const fv = compound(pv, contrib, rate, years)
  const inflAdj = years > 0 ? fv / Math.pow(1 + inflationRate, years) : fv
  const totalContributions = contrib * years
  const investmentGrowth = fv - pv - totalContributions

  // Stocks comparison at same inputs
  const stocksFv = compound(pv, contrib, 0.105, years)

  // Growth milestones every 5 years
  const milestones: { yr: number; val: number }[] = []
  const step = 5
  for (let yr = step; yr <= years; yr += step) {
    milestones.push({ yr, val: compound(pv, contrib, rate, yr) })
  }
  if (years > 0 && years % step !== 0) {
    milestones.push({ yr: years, val: fv })
  }
  const maxMilestone = milestones.reduce((m, x) => Math.max(m, x.val), 1)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          {/* Account type */}
          <div>
            <label className={labelCls}>Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Traditional', 'Roth'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setAccountType(t); save({ accountType: t }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    accountType === t
                      ? 'bg-[#d97706] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {t} IRA
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {accountType === 'Traditional'
                ? 'Tax-deferred growth — contributions may be tax-deductible, withdrawals taxed as income.'
                : 'Tax-free growth — after-tax contributions, qualified withdrawals are completely tax-free.'}
            </p>
          </div>

          {/* Age inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Current Age</label>
              <input type="number" value={currentAge}
                onChange={e => { setCurrentAge(e.target.value); save({ currentAge: e.target.value }) }}
                className={inputCls} min="18" max="90" placeholder="45" />
            </div>
            <div>
              <label className={labelCls}>Retirement Age</label>
              <input type="number" value={retirementAge}
                onChange={e => { setRetirementAge(e.target.value); save({ retirementAge: e.target.value }) }}
                className={inputCls} min="50" max="90" placeholder="65" />
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className={labelCls}>Current Gold IRA Balance ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance}
                onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="50000" />
            </div>
          </div>

          {/* Contribution */}
          <div>
            <label className={labelCls}>Annual Contribution ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={contribution}
                onChange={e => { setContribution(e.target.value); save({ contribution: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" max="8000" placeholder="7000" />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              2026 IRS limit: ${age >= 50 ? '8,000' : '7,000'}/year{age >= 50 ? ' (catch-up eligible)' : ''}.
              Max $8,000 if age 50+.
            </p>
          </div>

          {/* Gold Allocation */}
          <div>
            <label className={labelCls}>Gold Allocation % of Portfolio</label>
            <div className="relative">
              <input type="number" value={goldAllocation}
                onChange={e => { setGoldAllocation(e.target.value); save({ goldAllocation: e.target.value }) }}
                className={`${inputCls} pr-8`} min="1" max="100" placeholder="15" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Most advisors recommend 10–20% in precious metals for portfolio diversification and inflation hedging.
            </p>
          </div>

          {/* Return slider */}
          <div>
            <div className="flex justify-between mb-1">
              <label className={labelCls}>Expected Annual Return</label>
              <span className="text-sm font-bold text-[#d97706]">{expectedReturn}%</span>
            </div>
            <input type="range" min="4" max="15" step="0.5" value={expectedReturn}
              onChange={e => { setExpectedReturn(e.target.value); save({ expectedReturn: e.target.value }) }}
              className="w-full accent-[#d97706]" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>4% (conservative)</span>
              <span>Historical gold avg: 8.7% (20yr)</span>
              <span>15% (optimistic)</span>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl bg-[#d97706]/10 dark:bg-[#d97706]/20 border border-[#d97706]/30 p-5">
            <p className="text-sm text-[#d97706] dark:text-amber-300 font-medium mb-1">
              Projected Gold IRA Value
            </p>
            <p className="text-4xl font-bold text-[#d97706] dark:text-amber-200">{fmt(fv)}</p>
            <p className="text-sm text-[#d97706]/70 dark:text-amber-400 mt-1">
              At retirement (age {retAge}, {years} years away)
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Growth Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Starting Balance', val: fmt(pv) },
                { label: 'Total Contributions', val: fmt(totalContributions) },
                { label: 'Investment Growth', val: fmt(Math.max(0, investmentGrowth)), highlight: true },
                { label: 'Projected Total (nominal)', val: fmt(fv), bold: true },
                { label: 'Inflation-Adjusted Value', val: fmt(inflAdj) },
              ].map(({ label, val, bold, highlight }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={`font-${bold ? 'bold' : 'medium'} ${highlight ? 'text-[#d97706] dark:text-amber-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic">
              Inflation-adjusted value uses 3.2% average annual inflation. Tax-deferred compounding in a self-directed IRA means no annual tax drag on growth.
            </p>
          </div>

          {/* Growth milestones */}
          {milestones.length > 0 && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Gold IRA Growth Projection</p>
              <div className="space-y-2">
                {milestones.map(({ yr, val }) => (
                  <div key={yr}>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Year {yr}{yr === years ? ' (retirement)' : ''}</span>
                      <span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">{fmt(val)}</span>
                    </div>
                    <div className="h-2 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d97706] rounded-full transition-all"
                        style={{ width: `${(val / maxMilestone) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gold vs Stocks comparison */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Gold IRA vs. S&amp;P 500 Index Comparison
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-center">
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-1">Gold IRA ({expectedReturn}%)</p>
                <p className="text-xl font-bold text-[#d97706] dark:text-amber-300">{fmt(fv)}</p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-center">
                <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">S&amp;P 500 (10.5%)</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{fmt(stocksFv)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic leading-relaxed">
              Gold historically provides better downside protection during recessions. A blended portfolio with 15% precious metals reduces volatility while maintaining long-term growth. Past performance does not guarantee future results.
            </p>
          </div>

          <AffiliateCTA />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Gold IRA performance depends on gold prices, fees, and market conditions which vary. Past performance does not guarantee future results. Consult a licensed financial advisor before making any investment decisions.
      </p>
    </div>
  )
}
