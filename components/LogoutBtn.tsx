// components/LogoutBtn.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyModal from './MyModal';
import { useAuthStore } from '@/store/useAuth';

// interface LogoutProps {}

const LogoutBtn = () => {
// const LogoutBtn = (props: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { logout } = useAuthStore();
  
  const openModal = () => {
    setIsOpen(true);
  }
  
  const handleSignOut = async () => {
    try {
      setLoading(true)
      await logout();
      router.push('/auth');
    } catch (error) {
      console.error('Logout error: ', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        type='button'
        className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition flex items-center gap-2 cursor-pointer"
        disabled={loading}
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