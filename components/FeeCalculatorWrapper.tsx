'use client'

import dynamic from 'next/dynamic'

const FeeCalculator = dynamic(() => import('./FeeCalculator'), { ssr: false })

export default function FeeCalculatorWrapper() {
  return <FeeCalculator />
}
