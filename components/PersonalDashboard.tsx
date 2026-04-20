//components/PersonalDashboardClient.tsx

'use client';
import { useEffect, useMemo, useState } from "react";
import { useTasks } from "@/store/useTasks"
import { Status, FilterValue } from "@/constants/status"
import { Task } from "@/constants/task";
import { useGenerateTasks } from '@/hooks/useGenerateTasks'
import { StatusFilter } from "@/services/StatusFilter";
import TaskComponent from "./Task/TaskComponent";
import { Skeleton } from "./ui/skeleton";

interface PersonalDashboardClientProps {
  userEmail?: string | null;
}

const PersonalDashboardClient = ({userEmail}: PersonalDashboardClientProps) => {
  const {
    tasks,
    loadingTasks,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask
  } = useTasks();

  const [filter, setFilter] = useState<Status | 'all'>('all')

  const [newTask, setNewTask] = useState('');
  const { generateTasks, loading: aiLoading } = useGenerateTasks()

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = async () => {
    if (!newTask) return
    await createTask(newTask)
    setNewTask('')
  }

  const handleChangeStatus = (status: Status, task: Task) => {
    updateTaskStatus(task.id, status)
  }

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter(task => task.status === filter)
  }, [tasks, filter])
    
  const handleFilterChange = (value: Status | FilterValue) => {
    setFilter(value)
  }

  return (
    <div className="max-w-4xl mx-auto text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="text-sm text-gray-400">
          {userEmail}
        </div>

        <button
          onClick={generateTasks}
          // onClick={handleGenerate}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 cursor-pointer"
        >
          {aiLoading ? 'Generating...' : '✨ Generate'}
        </button>
      </div>

      {/* Add Task */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* Filtering */}
      <div className="flex items-center justify-start gap-3 mb-4">
        <h2>Filtering by status: </h2>
        <div>
          <StatusFilter 
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {loadingTasks ? (
          <>
            {[...Array(3)].map((_, i) => (
              <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
                <Skeleton className="h-18 w-full" />
                {/* <Skeleton className="h-4 w-32" /> */}
              </li>
            ))}
          </>
        ) : (
          filteredTasks.map(task => (

            <TaskComponent
              key={task.id}
              task={task}
              onChangeStatus={handleChangeStatus}
              onDelete={(task) => deleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PersonalDashboardClient