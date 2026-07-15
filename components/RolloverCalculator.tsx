'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'gic-rollover'

const TAX_BRACKETS = [
  { label: '10%', rate: 0.10 },
  { label: '12%', rate: 0.12 },
  { label: '22%', rate: 0.22 },
  { label: '24%', rate: 0.24 },
  { label: '32%', rate: 0.32 },
  { label: '35%', rate: 0.35 },
  { label: '37%', rate: 0.37 },
]

function compound(pv: number, rate: number, years: number): number {
  if (years <= 0) return pv
  return pv * Math.pow(1 + rate, years)
}

export default function RolloverCalculator() {
  const [balance, setBalance] = useState('250000')
  const [age, setAge] = useState('52')
  const [filingStatus, setFilingStatus] = useState<'Single' | 'Married'>('Single')
  const [taxBracket, setTaxBracket] = useState('0.22')
  const [rolloverType, setRolloverType] = useState<'Direct' | 'Indirect'>('Direct')
  const [rolloverAmount, setRolloverAmount] = useState('250000')
  const [retirementAge, setRetirementAge] = useState('65')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.balance) setBalance(p.balance)
        if (p.age) setAge(p.age)
        if (p.filingStatus) setFilingStatus(p.filingStatus)
        if (p.taxBracket) setTaxBracket(p.taxBracket)
        if (p.rolloverType) setRolloverType(p.rolloverType)
        if (p.rolloverAmount) setRolloverAmount(p.rolloverAmount)
        if (p.retirementAge) setRetirementAge(p.retirementAge)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const totalBalance = parseFloat(balance) || 0
  const currentAge = parseInt(age) || 52
  const rate = parseFloat(taxBracket) || 0.22
  const amount = Math.min(parseFloat(rolloverAmount) || totalBalance, totalBalance)
  const retAge = parseInt(retirementAge) || 65
  const years = Math.max(0, retAge - currentAge)
  const isUnder59Half = currentAge < 59.5

  // Indirect rollover calculations
  // Employer withholds 20% for taxes
  const withheld = amount * 0.20
  const received = amount - withheld
  // If they can only deposit the received amount (can't cover withheld):
  const shortfall = withheld
  const taxOnShortfall = shortfall * rate
  const penaltyOnShortfall = isUnder59Half ? shortfall * 0.10 : 0
  const totalCostIndirect = taxOnShortfall + penaltyOnShortfall

  // Projected growth
  const projectedGrowth = compound(amount, 0.08, years)

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Current 401k / IRA Balance ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={balance}
                onChange={e => {
                  setBalance(e.target.value)
                  setRolloverAmount(e.target.value)
                  save({ balance: e.target.value, rolloverAmount: e.target.value })
                }}
                className={`${inputCls} pl-7`} min="0" placeholder="250000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Your Age</label>
              <input type="number" value={age}
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={inputCls} min="18" max="90" placeholder="52" />
            </div>
            <div>
              <label className={labelCls}>Retirement Age</label>
              <input type="number" value={retirementAge}
                onChange={e => { setRetirementAge(e.target.value); save({ retirementAge: e.target.value }) }}
                className={inputCls} min="50" max="90" placeholder="65" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Single', 'Married'] as const).map(s => (
                <button key={s} onClick={() => { setFilingStatus(s); save({ filingStatus: s }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filingStatus === s ? 'bg-[#d97706] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Current Marginal Tax Bracket</label>
            <select value={taxBracket}
              onChange={e => { setTaxBracket(e.target.value); save({ taxBracket: e.target.value }) }}
              className={inputCls}>
              {TAX_BRACKETS.map(b => (
                <option key={b.rate} value={b.rate}>{b.label} bracket</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Rollover Type</label>
            <div className="grid grid-cols-1 gap-2">
              {(['Direct', 'Indirect'] as const).map(t => (
                <button key={t} onClick={() => { setRolloverType(t); save({ rolloverType: t }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                    rolloverType === t ? 'bg-[#d97706] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {t === 'Direct' ? 'Direct Rollover — Trustee-to-Trustee (Recommended)' : 'Indirect Rollover — 60-Day Rule'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Rollover Amount ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={rolloverAmount}
                onChange={e => { setRolloverAmount(e.target.value); save({ rolloverAmount: e.target.value }) }}
                className={`${inputCls} pl-7`} min="0" placeholder="250000" />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              There is no IRS limit on how much you can roll over from a 401k to a Gold IRA.
            </p>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {rolloverType === 'Direct' ? (
            <>
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">✓</span>
                  <p className="text-sm font-bold text-green-800 dark:text-green-300">Direct Rollover — Tax-Free Transfer</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Amount Rolled Over', val: fmt(amount) },
                    { label: 'Federal Taxes Owed', val: '$0' },
                    { label: 'Early Withdrawal Penalty', val: '$0' },
                    { label: 'Full Amount Goes to Gold IRA', val: fmt(amount), bold: true },
                  ].map(({ label, val, bold }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-green-200 dark:border-green-700 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-bold text-green-900 dark:text-green-200' : 'text-green-700 dark:text-green-400'}>{label}</span>
                      <span className={`font-bold text-green-${bold ? '900' : '700'} dark:text-green-${bold ? '200' : '400'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">How a Direct Rollover Works</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  In a direct trustee-to-trustee rollover, your 401k custodian sends funds directly to your Gold IRA custodian. You never touch the money, so the IRS does not treat it as a taxable distribution. Your entire {fmt(amount)} goes to work in your self-directed Gold IRA immediately, protecting your precious metals investment from unnecessary taxation.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">⚠️</span>
                  <p className="text-sm font-bold text-red-800 dark:text-red-300">Indirect Rollover — 60-Day Rule Risk</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Employer Withholds 20% for Taxes', val: fmt(withheld), warn: true },
                    { label: 'Amount You Receive', val: fmt(received) },
                    { label: 'Must Deposit to Gold IRA within 60 Days', val: fmt(amount) },
                    { label: 'Shortfall You Must Cover Out-of-Pocket', val: fmt(shortfall), warn: true },
                  ].map(({ label, val, warn }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className={warn ? 'text-red-700 dark:text-red-400 font-medium' : 'text-red-600 dark:text-red-400'}>{label}</span>
                      <span className={`font-bold ${warn ? 'text-red-700 dark:text-red-300' : 'text-red-600 dark:text-red-400'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-xs font-bold text-red-800 dark:text-red-300 mb-2">
                  If You Cannot Cover the {fmt(shortfall)} Withheld:
                </p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Taxable amount (shortfall)', val: fmt(shortfall) },
                    { label: `Tax owed (${(rate * 100).toFixed(0)}% bracket)`, val: fmt(taxOnShortfall) },
                    ...(isUnder59Half ? [{ label: 'Early withdrawal penalty (10%)', val: fmt(penaltyOnShortfall) }] : []),
                    { label: 'Total cost of not covering shortfall', val: fmt(totalCostIndirect), bold: true },
                  ].map(({ label, val, bold }) => (
                    <div key={label} className={`flex justify-between text-xs ${bold ? 'border-t border-red-200 dark:border-red-700 pt-1 mt-1' : ''}`}>
                      <span className={bold ? 'font-bold text-red-900 dark:text-red-200' : 'text-red-700 dark:text-red-400'}>{label}</span>
                      <span className={`font-bold ${bold ? 'text-red-900 dark:text-red-200' : 'text-red-700 dark:text-red-300'}`}>{val}</span>
                    </div>
                  ))}
                </div>
                {isUnder59Half && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400 italic">
                    Early withdrawal penalty applies because you are under age 59½.
                  </p>
                )}
              </div>
            </>
          )}

          {/* Recommendation */}
          <div className="rounded-xl bg-[#d97706]/10 dark:bg-[#d97706]/20 border border-[#d97706]/30 p-4">
            <p className="text-xs font-bold text-[#d97706] dark:text-amber-300 mb-1">Strong Recommendation</p>
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              Always choose a direct trustee-to-trustee rollover when moving funds into a Gold IRA or self-directed IRA. It is simpler, completely tax-free, has no 60-day deadline, and no withholding. Companies like Augusta Precious Metals and Goldco handle the paperwork for you at no charge.
            </p>
          </div>

          {/* Projected growth */}
          {years > 0 && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Projected Gold IRA Value at Retirement
              </p>
              <p className="text-3xl font-bold text-[#d97706] dark:text-amber-300">{fmt(projectedGrowth)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {fmt(amount)} rolled over, growing at 8% for {years} years until age {retAge}.
              </p>
            </div>
          )}

          <AffiliateCTA />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Rollover rules are complex and individual situations vary. Consult a licensed financial advisor and tax professional before initiating any 401k to Gold IRA rollover. Past performance does not guarantee future results.
      </p>
    </div>
  )
}
