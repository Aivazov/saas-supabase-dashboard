// features/personal-dashboard/hooks/use-personal-dashboard.ts

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "@/store/useTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormValues, taskSchema } from "@/features/tasks/schemas/task-schema";
import { Status } from "@/types/status";
import { Task } from "@/types/task";
import { useGenerateTasks } from "@/features/tasks/hooks/use-generate-tasks";


export const usePersonalDashboard = () => {
  const {
    tasks,
    loadingTasks,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask
  } = useTasks();

  const { generateTasks, loading: aiLoading } = useGenerateTasks()
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {title: ''},
  })

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (data: TaskFormValues) => {
    await createTask(data.title);
    form.reset();
  }
  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter(task => task.status === filter)
  }, [tasks, filter])

  return {
    tasks: filteredTasks,
    totalCount: filteredTasks.length,
    isLoading: loadingTasks,

    form,
    handleAddTask,
    deleteTask: (id: string) => deleteTask(id),
    updateStatus: (status: Status, task: Task) => updateTaskStatus(task.id, status),
    filter,
    setFilter,
    generateTasks,
    aiLoading,
  }
}