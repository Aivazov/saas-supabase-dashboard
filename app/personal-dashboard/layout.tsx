// app/personal-dashboard/layout.tsx

import SidebarLayout from '@/components/SidebarLayout';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const PersonalDashboardLayout = ({ children }: Props) => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <SidebarLayout />

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default PersonalDashboardLayout