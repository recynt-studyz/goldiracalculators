'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'gic-fees'

function compound(pv: number, contrib: number, rate: number, years: number): number {
  if (years <= 0) return pv
  if (rate === 0) return pv + contrib * years
  const g = Math.pow(1 + rate, years)
  return pv * g + contrib * (g - 1) / rate
}

const PROVIDER_FEES = [
  { name: 'Augusta Precious Metals', annual: 200 },
  { name: 'Goldco', annual: 200 },
  { name: 'Birch Gold Group', annual: 180 },
  { name: 'Industry Average', annual: 525 },
]

export default function FeeCalculator() {
  const [balance, setBalance] = useState('100000')
  const [contribution, setContribution] = useState('7000')
  const [years, setYears] = useState('20')
  const [grossReturn, setGrossReturn] = useState('8')
  const [setupFee, setSetupFee] = useState('100')
  const [custodianFee, setCustodianFee] = useState('150')
  const [storageFee, setStorageFee] = useState('200')
  const [dealerMarkup, setDealerMarkup] = useState('5')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.balance) setBalance(p.balance)
        if (p.contribution) setContribution(p.contribution)
        if (p.years) setYears(p.years)
        if (p.grossReturn) setGrossReturn(p.grossReturn)
        if (p.setupFee) setSetupFee(p.setupFee)
        if (p.custodianFee) setCustodianFee(p.custodianFee)
        if (p.storageFee) setStorageFee(p.storageFee)
        if (p.dealerMarkup) setDealerMarkup(p.dealerMarkup)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const pv = parseFloat(balance) || 0
  const contrib = parseFloat(contribution) || 0
  const yrs = parseInt(years) || 20
  const rate = (parseFloat(grossReturn) || 8) / 100
  const setup = parseFloat(setupFee) || 0
  const custodian = parseFloat(custodianFee) || 0
  const storage = parseFloat(storageFee) || 0
  const markup = (parseFloat(dealerMarkup) || 0) / 100

  // Without fees
  const fvNoFees = compound(pv, contrib, rate, yrs)

  // With fees
  const effectivePv = Math.max(0, pv - setup)
  const effectiveContrib = contrib * (1 - markup)
  const annualFees = custodian + storage
  // Reduce return rate by annual fees as a % of starting balance
  const feeRate = pv > 0 ? annualFees / pv : 0
  const netRate = Math.max(0, rate - feeRate)
  const fvWithFees = compound(effectivePv, effectiveContrib, netRate, yrs)

  const totalAnnualFees = annualFees * yrs
  const totalFeesPaid = setup + totalAnnualFees
  const lostGrowth = fvNoFees - fvWithFees - totalFeesPaid
  const totalFeeImpact = fvNoFees - fvWithFees

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const smallInputCls =
    'w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-1 focus:ring-[#d97706]'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Starting Balance ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance}
                onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="100000" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Annual Contribution ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={contribution}
                onChange={e => { setContribution(e.target.value); save({ contribution: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="7000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Years Until Retirement</label>
              <input type="number" value={years}
                onChange={e => { setYears(e.target.value); save({ years: e.target.value }) }}
                className={inputCls} min="1" max="50" placeholder="20" />
            </div>
            <div>
              <label className={labelCls}>Gross Annual Return (%)</label>
              <div className="relative">
                <input type="number" value={grossReturn}
                  onChange={e => { setGrossReturn(e.target.value); save({ grossReturn: e.target.value }) }}
                  className={`${inputCls} pr-7`} min="0" max="30" step="0.5" placeholder="8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>

          {/* Fee inputs */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Gold IRA Fees</p>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Setup / Account Opening Fee (one-time)
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input type="number" value={setupFee}
                  onChange={e => { setSetupFee(e.target.value); save({ setupFee: e.target.value }) }}
                  className={smallInputCls} min="0" placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Annual Custodian Fee
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={custodianFee}
                    onChange={e => { setCustodianFee(e.target.value); save({ custodianFee: e.target.value }) }}
                    className={smallInputCls} min="0" placeholder="150" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Annual Storage Fee
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={storageFee}
                    onChange={e => { setStorageFee(e.target.value); save({ storageFee: e.target.value }) }}
                    className={smallInputCls} min="0" placeholder="200" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Dealer Markup on Gold Purchases (%)
              </label>
              <div className="relative">
                <input type="number" value={dealerMarkup}
                  onChange={e => { setDealerMarkup(e.target.value); save({ dealerMarkup: e.target.value }) }}
                  className={`${smallInputCls} pl-2 pr-6`} min="0" max="20" step="0.5" placeholder="5" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
              </div>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Typical dealer markup above spot price: 3–8%. This reduces the effective amount of gold purchased.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* No fees */}
          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
            <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">WITHOUT FEES</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-400">Final Balance</span>
                <span className="font-bold text-green-800 dark:text-green-300 text-lg">{fmt(fvNoFees)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600 dark:text-green-500">Total Growth</span>
                <span className="font-medium text-green-700 dark:text-green-400">{fmt(fvNoFees - pv)}</span>
              </div>
            </div>
          </div>

          {/* With fees */}
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
            <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">WITH YOUR FEES</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-red-700 dark:text-red-400">Final Balance</span>
                <span className="font-bold text-red-800 dark:text-red-300 text-lg">{fmt(fvWithFees)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-600 dark:text-red-500">Total Growth</span>
                <span className="font-medium text-red-700 dark:text-red-400">{fmt(Math.max(0, fvWithFees - pv))}</span>
              </div>
            </div>
          </div>

          {/* Fee impact */}
          <div className="rounded-xl bg-[#d97706]/10 dark:bg-[#d97706]/20 border border-[#d97706]/30 p-4">
            <p className="text-xs font-bold text-[#d97706] dark:text-amber-300 mb-3">COST OF FEES</p>
            <div className="space-y-2">
              {[
                { label: 'Setup Fee (one-time)', val: fmt(setup) },
                { label: `Annual Fees × ${yrs} Years`, val: fmt(totalAnnualFees) },
                { label: 'Total Fees Paid', val: fmt(totalFeesPaid) },
                { label: 'Lost Compounding Growth', val: fmt(Math.max(0, lostGrowth)) },
                { label: 'TOTAL FEE IMPACT', val: fmt(totalFeeImpact), bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-[#d97706]/30 pt-2 mt-1' : ''}`}>
                  <span className={bold ? 'font-bold text-[#d97706] dark:text-amber-300' : 'text-amber-800 dark:text-amber-400'}>{label}</span>
                  <span className={`font-bold ${bold ? 'text-[#d97706] dark:text-amber-200 text-base' : 'text-amber-900 dark:text-amber-300'}`}>{val}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Your {fmt(annualFees)}/year in custodian and storage fees costs you {fmt(totalFeeImpact)} over {yrs} years due to lost compounding. This is why choosing a low-fee Gold IRA custodian matters enormously for your retirement savings.
            </p>
          </div>

          {/* Provider comparison */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Low-Fee Custodian Comparison</p>
            <div className="space-y-2">
              {PROVIDER_FEES.map(p => {
                const pFeeRate = pv > 0 ? p.annual / pv : 0
                const pNetRate = Math.max(0, rate - pFeeRate)
                const pFv = compound(effectivePv, effectiveContrib, pNetRate, yrs)
                return (
                  <div key={p.name} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{p.name}</span>
                      <span className="text-xs text-gray-400 ml-2">${p.annual}/yr</span>
                    </div>
                    <span className="font-bold text-[#d97706] dark:text-amber-300">{fmt(pFv)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <AffiliateCTA />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Actual fees and returns vary by custodian and market conditions. Past performance does not guarantee future results. Consult a licensed financial advisor before making any investment decisions.
      </p>
    </div>
  )
}
