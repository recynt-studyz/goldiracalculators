'use client'

import dynamic from 'next/dynamic'

const RolloverCalculator = dynamic(() => import('./RolloverCalculator'), { ssr: false })

export default function RolloverCalculatorWrapper() {
  return <RolloverCalculator />
}
