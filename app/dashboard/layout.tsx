// app/dashboard/layout.tsx

import SidebarLayout from '@/components/SidebarLayout';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <SidebarLayout />

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout