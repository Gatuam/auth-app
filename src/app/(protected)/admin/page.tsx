'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useCurrentRole } from '@/hooks/use-current-role'
import React from 'react'

const Page = () => {
  const data = useCurrentRole()
  return (
    <Card className=' w-[400px] '>
     <p>
      Admin
     </p>
     <CardContent>
      
     </CardContent>
    </Card>
  )
}

export default Page
