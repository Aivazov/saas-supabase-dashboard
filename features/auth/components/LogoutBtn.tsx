// features/auth/components/LogoutBtn.tsx

import MyModal from '@/components/MyModal';
import { useLogout } from '../hooks/use-logout';

// interface LogoutProps {}

const LogoutBtn = () => {
  const {
    isOpen,
    setIsOpen,
    openModal,
    handleSignOut
  } = useLogout();

  return (
    <>
      <button
        onClick={openModal}
        type='button'
        // className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition flex items-center gap-2 cursor-pointer"
        className="w-full justify-start text-zinc-400 hover:text-red-400 cursor-pointer"
      >
        Logout
      </button>
    
      <MyModal
        title='Logout confirmation'
        description='Are you sure you want to logout?'
        handleAction={handleSignOut}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default LogoutBtn