'use client'

import dynamic from 'next/dynamic'

const AllocationCalculator = dynamic(() => import('./AllocationCalculator'), { ssr: false })

export default function AllocationCalculatorWrapper() {
  return <AllocationCalculator />
}
