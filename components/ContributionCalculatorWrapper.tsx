'use client'

import dynamic from 'next/dynamic'

const ContributionCalculator = dynamic(() => import('./ContributionCalculator'), { ssr: false })

export default function ContributionCalculatorWrapper() {
  return <ContributionCalculator />
}
