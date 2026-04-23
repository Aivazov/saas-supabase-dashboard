// widgets/SidebarClient.tsx

'use client';
import { usePathname } from 'next/navigation'
import LogoutBtn from '../features/auth/components/LogoutBtn'
import Link from 'next/link'
import { BiCategory, BiCog, BiCommand, BiUser } from 'react-icons/bi';

type SidebarClientProps = {}

const SidebarClient = (props: SidebarClientProps) => {
  const pathname = usePathname();

  const activeLink = (href: string) => {
    const isActive = pathname === href;
    return `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${isActive 
        ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.1)]' 
        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'}
    `;
  }
  // const activeLink = (href: string) => {
  //   return `text-left p-2 rounded cursor-pointer ${href === pathname ? 'bg-gray-500' : ' bg-transparent hover:bg-gray-700'}`;
  // }
  return (
    // <aside className="w-64 bg-gray-900 border-r p-4 text-white">
    //   <div className="flex flex-col justify-between items-center w-full mb-4 gap-2">
    //     <div className='flex items-center justify-between w-full'>
    //       <h2 className="text-xl font-bold">AI Tasks</h2>
    //       {/* <Link
    //         className="text-left px-5 py-2 text-sm rounded bg-blue-900 hover:bg-gray-700 cursor-pointer"
    //         href="/"
    //         rel="noopener noreferrer"
    //       >
    //         Home
    //       </Link> */}

    //       <LogoutBtn />
    //     </div>
    //   </div>
    //   <nav className="flex flex-col gap-2">
        
    //     <Link href='/dashboard' className={activeLink('/dashboard')}>
    //     {/* <Link href='/dashboard' className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer"> */}
    //       Dashboard
    //     </Link>

    //     <Link href='/personal-dashboard' className={activeLink('/personal-dashboard')}>
    //     {/* <Link href='/personal-dashboard' className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer"> */}
    //       Personal Tasks
    //     </Link>

    //     <Link href='/settings' className={activeLink('/settings')}>
    //     {/* <Link href='/personal-dashboard' className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer"> */}
    //       Settings
    //     </Link>
    //   </nav>
    // </aside>

    <aside className="w-64 bg-[#09090b] border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-cyan-600 p-2 rounded-lg">
            <BiCommand className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            AI Tasks
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-4 px-4">
          Main Menu
        </div>
        
        <Link href='/dashboard' className={activeLink('/dashboard')}>
          <BiCategory className={`w-5 h-5 ${pathname === '/dashboard' ? 'text-cyan-400' : 'group-hover:text-zinc-100'}`} />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link href='/personal-dashboard' className={activeLink('/personal-dashboard')}>
          <BiUser className={`w-5 h-5 ${pathname === '/personal-dashboard' ? 'text-cyan-400' : 'group-hover:text-zinc-100'}`} />
          <span className="font-medium">Personal Tasks</span>
        </Link>

        <Link href='/profile' className={activeLink('/profile')}>
          <BiCog className={`w-5 h-5 ${pathname === '/profile' ? 'text-cyan-400' : 'group-hover:text-zinc-100'}`} />
          <span className="font-medium">Profile settings</span>
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 mt-auto border-t border-zinc-800">
        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800">
            <LogoutBtn />
        </div>
      </div>
    </aside>
  )
}

export default SidebarClient