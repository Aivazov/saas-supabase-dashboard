// features/profile/hooks/use-profile.ts
import { useEffect, useState } from 'react';
import { updateNickname } from '@/lib/profile';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from '../schemas/profile-schema';
import { toast } from "sonner";

export const useProfile = (initialNickname: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      nickname: initialNickname ?? '',
    },
  });

  useEffect(() => {
    form.reset({ nickname: initialNickname });
  }, [initialNickname, form.reset]);

  const handleUpdate = async (data: ProfileFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      await updateNickname(data.nickname);
      // form.reset({ nickname: data.nickname });
      form.reset(data);
      toast.success('Nickname updated successfully', { id: toastId });
      
      // Обновляем defaultValues, чтобы кнопка Save снова стала disabled
    } catch (e) {
      console.error(e);
      toast.error("Failed to update nickname", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form, 
    isLoading,
    handleUpdate,
    canSave: form.formState.isDirty && form.formState.isValid && !isLoading,
  };
};