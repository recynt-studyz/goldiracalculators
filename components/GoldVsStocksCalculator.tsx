'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(1)}%`

const STORAGE_KEY = 'gic-comparison'

function compound(pv: number, annualContrib: number, rate: number, years: number): number {
  if (years <= 0) return pv
  if (rate === 0) return pv + annualContrib * years
  const g = Math.pow(1 + rate, years)
  return pv * g + annualContrib * (g - 1) / rate
}

const GOLD_HISTORICAL = [
  { label: '4% (conservative)', rate: 4 },
  { label: '7.9% (30-yr historical avg)', rate: 7.9 },
  { label: '8% (default)', rate: 8 },
  { label: '8.7% (20-yr historical avg)', rate: 8.7 },
  { label: '9.1% (10-yr historical avg)', rate: 9.1 },
  { label: '12.4% (5-yr historical avg)', rate: 12.4 },
]

export default function GoldVsStocksCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('100000')
  const [monthlyContrib, setMonthlyContrib] = useState('500')
  const [timeHorizon, setTimeHorizon] = useState('20')
  const [goldReturn, setGoldReturn] = useState('8')
  const [stockReturn, setStockReturn] = useState('10.5')
  const [inflationRate, setInflationRate] = useState('3.2')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.initialInvestment) setInitialInvestment(p.initialInvestment)
        if (p.monthlyContrib) setMonthlyContrib(p.monthlyContrib)
        if (p.timeHorizon) setTimeHorizon(p.timeHorizon)
        if (p.goldReturn) setGoldReturn(p.goldReturn)
        if (p.stockReturn) setStockReturn(p.stockReturn)
        if (p.inflationRate) setInflationRate(p.inflationRate)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const pv = parseFloat(initialInvestment) || 0
  const annualContrib = (parseFloat(monthlyContrib) || 0) * 12
  const years = parseInt(timeHorizon) || 20
  const gr = (parseFloat(goldReturn) || 8) / 100
  const sr = (parseFloat(stockReturn) || 10.5) / 100
  const ir = (parseFloat(inflationRate) || 3.2) / 100

  const goldFv = compound(pv, annualContrib, gr, years)
  const stocksFv = compound(pv, annualContrib, sr, years)
  const goldInflAdj = goldFv / Math.pow(1 + ir, years)
  const stocksInflAdj = stocksFv / Math.pow(1 + ir, years)

  // Milestones at 10, 20, 30 or time horizon
  const checkpoints = [10, 20, 30].filter(y => y <= years)
  if (years > 0 && !checkpoints.includes(years)) checkpoints.push(years)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const goldWins = goldFv >= stocksFv

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Initial Investment ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={initialInvestment}
                onChange={e => { setInitialInvestment(e.target.value); save({ initialInvestment: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="100000" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Monthly Contribution ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyContrib}
                onChange={e => { setMonthlyContrib(e.target.value); save({ monthlyContrib: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="500" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Time Horizon (years)</label>
            <input type="number" value={timeHorizon}
              onChange={e => { setTimeHorizon(e.target.value); save({ timeHorizon: e.target.value }) }}
              className={inputCls} min="1" max="50" placeholder="20" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className={labelCls}>Gold Return Assumption</label>
              <span className="text-sm font-bold text-[#d97706]">{goldReturn}%</span>
            </div>
            <input type="range" min="2" max="20" step="0.1" value={goldReturn}
              onChange={e => { setGoldReturn(e.target.value); save({ goldReturn: e.target.value }) }}
              className="w-full accent-[#d97706] mb-2" />
            <select value={goldReturn}
              onChange={e => { setGoldReturn(e.target.value); save({ goldReturn: e.target.value }) }}
              className={inputCls}>
              {GOLD_HISTORICAL.map(o => (
                <option key={o.rate} value={o.rate}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className={labelCls}>Stock (S&amp;P 500) Return</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{stockReturn}%</span>
            </div>
            <input type="range" min="2" max="20" step="0.1" value={stockReturn}
              onChange={e => { setStockReturn(e.target.value); save({ stockReturn: e.target.value }) }}
              className="w-full accent-blue-500" />
            <p className="mt-1 text-xs text-gray-400">S&amp;P 500 historical average: 10.5%/year</p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className={labelCls}>Inflation Rate</label>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{inflationRate}%</span>
            </div>
            <input type="range" min="1" max="8" step="0.1" value={inflationRate}
              onChange={e => { setInflationRate(e.target.value); save({ inflationRate: e.target.value }) }}
              className="w-full accent-gray-500" />
            <p className="mt-1 text-xs text-gray-400">Historical average: 3.2%/year</p>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Side-by-side results */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl border p-4 text-center ${goldWins ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">Gold IRA</p>
              <p className="text-xs text-amber-600 dark:text-amber-500 mb-1">{goldReturn}% annual return</p>
              <p className="text-2xl font-bold text-[#d97706] dark:text-amber-300">{fmt(goldFv)}</p>
              {goldWins && <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Winner ↑</span>}
            </div>
            <div className={`rounded-xl border p-4 text-center ${!goldWins ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
              <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">S&amp;P 500 Index</p>
              <p className="text-xs text-blue-600 dark:text-blue-500 mb-1">{stockReturn}% annual return</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{fmt(stocksFv)}</p>
              {!goldWins && <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Winner ↑</span>}
            </div>
          </div>

          {/* Milestone comparison */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Growth Comparison by Year</p>
            <div className="space-y-3">
              {checkpoints.map(yr => {
                const gv = compound(pv, annualContrib, gr, yr)
                const sv = compound(pv, annualContrib, sr, yr)
                const maxVal = Math.max(gv, sv)
                return (
                  <div key={yr}>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Year {yr}</p>
                    <div className="space-y-1">
                      <div>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-amber-600 dark:text-amber-400">Gold IRA</span>
                          <span className="font-medium text-[#d97706] dark:text-amber-300">{fmt(gv)}</span>
                        </div>
                        <div className="h-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                          <div className="h-full bg-[#d97706] rounded-full" style={{ width: `${(gv / maxVal) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-blue-600 dark:text-blue-400">S&amp;P 500</span>
                          <span className="font-medium text-blue-700 dark:text-blue-300">{fmt(sv)}</span>
                        </div>
                        <div className="h-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(sv / maxVal) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Inflation-adjusted */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Real Purchasing Power (inflation-adjusted at {fmtPct(parseFloat(inflationRate))})
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Gold IRA</p>
                <p className="text-lg font-bold text-[#d97706] dark:text-amber-300">{fmt(goldInflAdj)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">S&amp;P 500</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{fmt(stocksInflAdj)}</p>
              </div>
            </div>
          </div>

          {/* 2008 crisis scenario */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Historical: 2008 Financial Crisis</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              If you had $100,000 in 2007: stocks lost 38% in 2008 &rarr; <span className="font-bold text-red-600 dark:text-red-400">$62,000</span>. Gold gained 5% in 2008 &rarr; <span className="font-bold text-[#d97706] dark:text-amber-300">$105,000</span>. This is why gold bullion in a self-directed IRA is considered an inflation hedge and portfolio diversification tool for retirement savings.
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
