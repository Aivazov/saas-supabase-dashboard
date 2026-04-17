// app/settings/layout.tsx

import SidebarLayout from '@/components/SidebarLayout';
import React from 'react'

type SettingsLayoutProps = {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  

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

export default SettingsLayout