'use client'
import { UserRole } from '@/generated/prisma'
import React from 'react'

interface RoleGateProps {
    children : React.ReactNode;
    allowRole : UserRole
}
export const RoleGate = ({children, allowRole}: RoleGateProps) => {
    
  return (
    <div>
      
    </div>
  )
}


