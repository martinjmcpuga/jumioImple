import React, { Suspense } from 'react'
import JumioJsx from '../components/jumioselfie/Jumio'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <JumioJsx />
      </Suspense>
    </div>
  )
}

export default Page