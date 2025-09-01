'use client'
import { NewVerificationForm } from '@/components/auth/NewVerificationForm'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewVerificationForm />
      </Suspense>
    </div>
  )
}

export default Page
