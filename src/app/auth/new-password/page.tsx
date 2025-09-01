'use client'
import { NewPasswordForm } from "@/components/auth/NewPasswordForm"
import { Suspense } from "react"

const Page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default Page
