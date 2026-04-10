// app/dashboard/layout.tsx

import LogoutBtn from '@/components/LogoutBtn';
import Link from 'next/link';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r p-4">
        <div className="flex flex-col justify-between items-center w-full mb-4 gap-2">
          <div className='flex items-center justify-between w-full'>
            <h2 className="text-xl font-bold">AI Tasks</h2>
            {/* <Link
              className="text-left px-5 py-2 text-sm rounded bg-blue-900 hover:bg-gray-700 cursor-pointer"
              href="/"
              rel="noopener noreferrer"
            >
              Home
            </Link> */}

            <LogoutBtn />
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          
          <button className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer">
            Dashboard
          </button>
          <button className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer">
            Tasks
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout