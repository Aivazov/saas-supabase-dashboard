// features/auth/hooks/use-auth-form.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { authSchema, AuthFormData } from '../schemas/auth.schema';

// type Props = {}

export const useAuthForm = (isLogin: boolean) => {
  const router = useRouter();
  const { login, register, loading, error, setError } = useAuthStore();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "", nickname: "" },
  })

  const onSubmit = async (data: AuthFormData) => {
    setError(null);

    if (isLogin) {
      await login(data.email, data.password)
      router.replace("/dashboard")
      router.refresh()
    } else {
      await register(data.email, data.password, data.nickname || '');
    };
  }
  
  return { form, onSubmit, loading, error };
}
