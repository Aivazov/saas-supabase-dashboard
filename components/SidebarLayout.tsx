//components/SidebarLayout.tsx

'use client';
import { usePathname } from 'next/navigation'
import LogoutBtn from './LogoutBtn'
import Link from 'next/link'

type Props = {}

const SidebarLayout = (props: Props) => {
  const pathname = usePathname();

  const activeLink = (href: string) => {
    return `text-left p-2 rounded cursor-pointer ${href === pathname ? 'bg-gray-500' : ' bg-transparent hover:bg-gray-700'}`;
  }
  return (
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
        
        <Link href='/dashboard' className={activeLink('/dashboard')}>
        {/* <Link href='/dashboard' className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer"> */}
          Dashboard
        </Link>
        <Link href='/personal-dashboard' className={activeLink('/personal-dashboard')}>
        {/* <Link href='/personal-dashboard' className="text-left p-2 rounded hover:bg-gray-700 cursor-pointer"> */}
          Personal Tasks
        </Link>
      </nav>
    </aside>
  )
}

export default SidebarLayout