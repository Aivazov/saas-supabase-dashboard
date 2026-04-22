// app/settings/layout.tsx

import SidebarClient from '@/components/SidebarClient';
import React from 'react'

type ProfileLayoutProps = {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  

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

export default ProfileLayout