'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(0)}%`

const STORAGE_KEY = 'gic-allocation'

type RiskTolerance = 'Conservative' | 'Moderate' | 'Aggressive'

function getGoldRange(age: number): [number, number] {
  if (age < 40) return [5, 10]
  if (age < 55) return [10, 15]
  if (age < 65) return [15, 20]
  return [20, 25]
}

function getRecommendedPct(age: number, risk: RiskTolerance): number {
  const [low, high] = getGoldRange(age)
  const mid = (low + high) / 2
  if (risk === 'Conservative') return high    // More gold = more conservative
  if (risk === 'Aggressive') return low
  return mid
}

function getAllocation(risk: RiskTolerance, goldPct: number) {
  const remainder = 100 - goldPct
  if (risk === 'Conservative') {
    return { stocks: Math.round(remainder * 0.55), bonds: Math.round(remainder * 0.45), gold: goldPct }
  }
  if (risk === 'Aggressive') {
    return { stocks: Math.round(remainder * 0.85), bonds: Math.round(remainder * 0.15), gold: goldPct }
  }
  return { stocks: Math.round(remainder * 0.70), bonds: Math.round(remainder * 0.30), gold: goldPct }
}

export default function AllocationCalculator() {
  const [age, setAge] = useState('50')
  const [portfolio, setPortfolio] = useState('500000')
  const [risk, setRisk] = useState<RiskTolerance>('Moderate')
  const [yearsToRetirement, setYearsToRetirement] = useState('15')
  const [currentGold, setCurrentGold] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.age) setAge(p.age)
        if (p.portfolio) setPortfolio(p.portfolio)
        if (p.risk) setRisk(p.risk)
        if (p.yearsToRetirement) setYearsToRetirement(p.yearsToRetirement)
        if (p.currentGold) setCurrentGold(p.currentGold)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const currentAge = parseInt(age) || 50
  const totalPortfolio = parseFloat(portfolio) || 0
  const yrs = parseInt(yearsToRetirement) || 15
  const existingGold = parseFloat(currentGold) || 0

  const recommendedPct = getRecommendedPct(currentAge, risk)
  const alloc = getAllocation(risk, recommendedPct)
  const [ageRangeLow, ageRangeHigh] = getGoldRange(currentAge)

  const goldTarget = totalPortfolio * (alloc.gold / 100)
  const stocksTarget = totalPortfolio * (alloc.stocks / 100)
  const bondsTarget = totalPortfolio * (alloc.bonds / 100)
  const additionalGoldNeeded = Math.max(0, goldTarget - existingGold)

  // Inflation protection
  const inflationRate = 0.032
  const portfolioNeeded = totalPortfolio * Math.pow(1 + inflationRate, yrs)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const allocationBars = [
    { label: 'Stocks / ETFs', pct: alloc.stocks, value: stocksTarget, color: 'bg-blue-500', textColor: 'text-blue-700 dark:text-blue-300' },
    { label: 'Bonds / Fixed Income', pct: alloc.bonds, value: bondsTarget, color: 'bg-gray-400', textColor: 'text-gray-600 dark:text-gray-400' },
    { label: 'Gold / Precious Metals', pct: alloc.gold, value: goldTarget, color: 'bg-[#d97706]', textColor: 'text-[#d97706] dark:text-amber-300' },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Current Age</label>
            <input type="number" value={age}
              onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
              className={inputCls} min="18" max="90" placeholder="50" />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Age-based gold allocation range: {ageRangeLow}%–{ageRangeHigh}% recommended for age {currentAge}
            </p>
          </div>

          <div>
            <label className={labelCls}>Total Retirement Portfolio ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={portfolio}
                onChange={e => { setPortfolio(e.target.value); save({ portfolio: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="500000" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Risk Tolerance</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Conservative', 'Moderate', 'Aggressive'] as const).map(r => (
                <button key={r} onClick={() => { setRisk(r); save({ risk: r }) }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    risk === r ? 'bg-[#d97706] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Years to Retirement</label>
            <input type="number" value={yearsToRetirement}
              onChange={e => { setYearsToRetirement(e.target.value); save({ yearsToRetirement: e.target.value }) }}
              className={inputCls} min="0" max="50" placeholder="15" />
          </div>

          <div>
            <label className={labelCls}>Current Gold / Precious Metals Holdings ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={currentGold}
                onChange={e => { setCurrentGold(e.target.value); save({ currentGold: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="0" />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Main recommendation */}
          <div className="rounded-xl bg-[#d97706]/10 dark:bg-[#d97706]/20 border border-[#d97706]/30 p-5">
            <p className="text-sm text-[#d97706] dark:text-amber-300 font-medium mb-1">
              Recommended Gold Allocation
            </p>
            <p className="text-4xl font-bold text-[#d97706] dark:text-amber-200">{fmtPct(alloc.gold)}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-amber-700 dark:text-amber-400">Target Amount</span>
                <p className="font-bold text-[#d97706] dark:text-amber-300">{fmt(goldTarget)}</p>
              </div>
              <div>
                <span className="text-amber-700 dark:text-amber-400">Additional Needed</span>
                <p className="font-bold text-[#d97706] dark:text-amber-300">{fmt(additionalGoldNeeded)}</p>
              </div>
            </div>
          </div>

          {/* Allocation breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Portfolio Allocation Breakdown ({risk})
            </p>
            {/* Stacked bar */}
            <div className="flex h-6 rounded-full overflow-hidden mb-4">
              {allocationBars.map(b => (
                <div key={b.label} className={`${b.color} h-full`} style={{ width: `${b.pct}%` }}
                  title={`${b.label}: ${b.pct}%`} />
              ))}
            </div>
            <div className="space-y-2">
              {allocationBars.map(b => (
                <div key={b.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm inline-block shrink-0 ${b.color}`} />
                    <span className="text-gray-600 dark:text-gray-400">{b.label}</span>
                    <span className="text-xs text-gray-400">{fmtPct(b.pct)}</span>
                  </div>
                  <span className={`font-bold ${b.textColor}`}>{fmt(b.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why this allocation */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 p-4">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">Why This Allocation?</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              At age {currentAge} with {yrs} years to retirement, a {fmtPct(alloc.gold)} precious metals allocation provides inflation protection and downside hedging without sacrificing growth potential. Gold bullion in a self-directed IRA is an effective portfolio diversification tool that typically moves inversely to stocks during recessions. A {risk.toLowerCase()} approach means {risk === 'Conservative' ? 'prioritizing capital preservation and inflation protection with higher gold exposure' : risk === 'Aggressive' ? 'accepting more volatility for higher potential growth with less gold exposure' : 'balancing growth and protection with a moderate gold allocation'}.
            </p>
          </div>

          {/* Inflation protection */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Inflation Protection Analysis</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              At 3.2% annual inflation, your {fmt(totalPortfolio)} portfolio needs to grow to <span className="font-bold text-[#d97706] dark:text-amber-300">{fmt(portfolioNeeded)}</span> just to maintain purchasing power over {yrs} years. Gold has historically tracked inflation closely over long periods, making physical gold bullion in a depository a key component of any inflation-hedging strategy.
            </p>
          </div>

          <AffiliateCTA />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Asset allocation recommendations vary based on individual circumstances. Past performance does not guarantee future results. Consult a licensed financial advisor before making any investment decisions.
      </p>
    </div>
  )
}
