// features/personal-dashboard/hooks/use-personal-dashboard.ts

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "@/store/useTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormValues, taskSchema } from "@/features/tasks/schemas/task-schema";
import { FilterValue, Status } from "@/constants/status";
import { Task } from "@/constants/task";
import { useGenerateTasks } from "@/hooks/useGenerateTasks";


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

  // const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (data: TaskFormValues) => {
    // if (!newTask) return
    await createTask(data.title);
    // setNewTask('')
    form.reset();
  }

  // const handleChangeStatus = (status: Status, task: Task) => {
  //   updateTaskStatus(task.id, status)
  // }

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter(task => task.status === filter)
  }, [tasks, filter])
    
  // const handleFilterChange = (value: Status | FilterValue) => {
  //   setFilter(value)
  // }

  return {
    tasks: filteredTasks,
    totalCount: filteredTasks.length,
    isLoading: loadingTasks,

    form,
    handleAddTask,
    deleteTask: (id: string) => deleteTask(id),
    updateStatus: (status: Status, task: Task) => updateTaskStatus(task.id, status),
    // handleChangeStatus,
    filter,
    setFilter,
    // handleFilterChange,
    generateTasks,
    aiLoading,
  }
}