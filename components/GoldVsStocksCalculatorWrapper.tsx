'use client'

import dynamic from 'next/dynamic'

const GoldVsStocksCalculator = dynamic(() => import('./GoldVsStocksCalculator'), { ssr: false })

export default function GoldVsStocksCalculatorWrapper() {
  return <GoldVsStocksCalculator />
}
