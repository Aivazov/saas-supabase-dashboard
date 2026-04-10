// components/LogoutBtn.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import MyModal from './MyModal';

// interface LogoutProps {}

const LogoutBtn = () => {
// const LogoutBtn = (props: Props) => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true);
  }
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Logout error: ', error);
    }
  };
  return (
    <>
      <button
        onClick={openModal}
        type='button'
        className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition flex items-center gap-2 cursor-pointer"
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