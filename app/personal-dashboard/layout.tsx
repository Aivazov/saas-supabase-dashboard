// app/personal-dashboard/layout.tsx

import SidebarClient from '@/widgets/SidebarClient';
import React from 'react'

type PersonalDashboardLayoutProps = {
  children: React.ReactNode;
}

const PersonalDashboardLayout = ({ children }: PersonalDashboardLayoutProps) => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <SidebarClient />

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto bg-[#09090b]">
        {children}
      </main>
    </div>
  )
}

export default PersonalDashboardLayout