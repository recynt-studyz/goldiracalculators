'use client'

import dynamic from 'next/dynamic'

const GoldIRAGrowthCalculator = dynamic(() => import('./GoldIRAGrowthCalculator'), { ssr: false })

export default function GoldIRAGrowthCalculatorWrapper() {
  return <GoldIRAGrowthCalculator />
}
