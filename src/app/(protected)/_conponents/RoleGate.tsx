'use client'
import { UserRole } from '@/generated/prisma'
import { useCurrentRole } from '@/hooks/use-current-role';
import React from 'react'

interface RoleGateProps {
    children : React.ReactNode;
    allowRole : UserRole
}
export const RoleGate = ({children, allowRole}: RoleGateProps) => {
    const user = useCurrentRole();
  return (
    <div>
      {user?.role}
    </div>
  )
}


