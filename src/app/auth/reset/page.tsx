import { ResetForm } from '@/components/auth/ResetFrom'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <ResetForm />
      </Suspense>
      
    </div>
  )
}

export default Page
