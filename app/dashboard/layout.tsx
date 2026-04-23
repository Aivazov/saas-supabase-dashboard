// app/dashboard/layout.tsx

import SidebarClient from '@/widgets/SidebarClient';
import React from 'react'

type DashboardLayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <SidebarClient />

      <main className="flex-1 p-6 overflow-y-auto bg-[#09090b]">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout