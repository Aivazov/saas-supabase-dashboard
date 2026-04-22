// features/auth/hooks/use-auth-form.ts

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema, AuthFormData } from "../schemas/auth.schema"
import { useAuthStore } from "@/store/useAuth"
import { useRouter } from "next/navigation"

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const { login, register, loading, error, setError } = useAuthStore()

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "", nickname: "" },
  })

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError(null)
    form.reset() 
  }

  const onSubmit = async (data: AuthFormData) => {
    if (isLogin) {
      await login(data.email, data.password)
      router.replace("/dashboard")
      router.refresh()
    } else {
      await register(data.email, data.password, data.nickname || "")
      // setIsLogin(true)
      router.push('/dashboard')
    }
  }

  return { 
    form, 
    onSubmit: form.handleSubmit(onSubmit), 
    loading, 
    error, 
    isLogin, 
    toggleMode 
  }
}