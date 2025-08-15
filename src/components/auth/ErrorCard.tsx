import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { Header } from './Header'
import { BackButton } from './BackButton'

const ErrorCard = () => {
  return (
   <Card className='w-[400px]'>
    <CardHeader className='text-red-500'>
        <Header header='Error While login' label='Opps! Something went wrong!' />
    </CardHeader>
    <CardFooter>
        <BackButton 
        herf='/auth/login'
        label='Back to loggin' />
    </CardFooter>
   </Card>
  )
}

export default ErrorCard
