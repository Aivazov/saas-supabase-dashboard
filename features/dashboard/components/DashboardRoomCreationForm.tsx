// features/dashboard/components/DashboardRoomCreationForm.tsx

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BiPlusCircle } from 'react-icons/bi'
import { RoomFormValues } from '../schemas/room-schema'
import { UseFormReturn } from 'react-hook-form'

type DashboardRoomCreationFormProps = {
  loadingWhenCreatingRoom: boolean;
  form: UseFormReturn<{name: string;}, any, {name: string;}>;
  handleCreateRoom: (data: RoomFormValues) => Promise<void>;
}

const DashboardRoomCreationForm = ({
  loadingWhenCreatingRoom,
  form,
  handleCreateRoom
}: DashboardRoomCreationFormProps) => {
  return (
    <form 
      onSubmit={form.handleSubmit(handleCreateRoom)}
      className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 shadow-2xl"
    >
      <div className="relative">
        <Input
          {...form.register("name")}
          placeholder="New room name..."
          className="bg-transparent border-none focus-visible:ring-0 w-full md:w-64 text-sm"
        />
        {form.formState.errors.name && (
          <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        disabled={loadingWhenCreatingRoom || !form.formState.isValid}
        className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.3)] cursor-pointer"
      >
        <BiPlusCircle className="mr-2 h-4 w-4" />
        {loadingWhenCreatingRoom ? "Creating..." : "Create Room"}
      </Button>
    </form>
  )
}

export default DashboardRoomCreationForm