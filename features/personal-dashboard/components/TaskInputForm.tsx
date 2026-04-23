// features/personal-dashboard/components/TaskInputForm.tsx

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Status } from '@/types/status'
import { StatusFilter } from '@/features/tasks/components/StatusFilter'
import { TaskFormValues } from '@/features/tasks/schemas/task-schema'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
// import React from 'react'
import { BiFilterAlt, BiPlus } from 'react-icons/bi'

type TaskInputFormProps = {
  form: UseFormReturn<TaskFormValues>;
  onSubmit: SubmitHandler<TaskFormValues>;
  isLoading: boolean;
  filter: Status | 'all';
  setFilter: (value: Status | 'all') => void;
}

const TaskInputForm = ({ 
  form,
  onSubmit,
  isLoading,
  filter,
  setFilter
 }: TaskInputFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
        <CardContent className="p-4">
          {/* <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Input
                className="bg-zinc-950/50 border-zinc-800 focus:ring-cyan-500/20 pl-4 h-12 text-zinc-200"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Capture a new thought or task..."
              />
            </div>
            <Button 
              onClick={handleAdd}
              disabled={loadingTasks || !newTask}
              className="w-full md:w-auto rounded-md bg-cyan-600 hover:bg-cyan-500 text-white h-12 px-8 flex items-center justify-center gap-1 cursor-pointer"
            >
              <BiPlus className="text-xl mr-1" /> <span>Add Task</span>
            </Button>
          </div> */}

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-center text-zinc-300">
            <div className="relative flex-1 w-full">
              <Input
                {...form.register("title")}
                className="bg-zinc-950/50 border-zinc-800 focus:ring-cyan-500/20 h-12"
                placeholder="Capture a new thought or task..."
              />
            </div>
            <Button 
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 h-12 px-8 cursor-pointer"
            >
              <BiPlus className="text-xl mr-1" /> Add Task
            </Button>
          </form>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/50 relative z-50">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <BiFilterAlt />
              <span>Filter:</span>
            </div>
            <StatusFilter 
              value={filter}
              onChange={setFilter}
              // onChange={handleFilterChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskInputForm