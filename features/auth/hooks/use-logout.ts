// features/auth/hooks/use-logout.ts

import { useAuthStore } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogout = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)

  const { logout } = useAuthStore();
  
  const openModal = () => {
    setIsOpen(true);
  }
  
  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/auth');
    } catch (error) {
      console.error('Logout error: ', error);
    } 
  };

  return {
    isOpen,
    setIsOpen,
    openModal,
    handleSignOut
  }
}