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
import { BiFilterAlt, BiPlus, BiUserCircle, BiTask, BiStar } from "react-icons/bi";
import { IoSparkles } from "react-icons/io5";
// import { Button } from "@headlessui/react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

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
  console.log('newTask PersonalDashboard: ', newTask);
  

  return (
    // <div className="max-w-4xl mx-auto text-white">

    //   {/* Header */}
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-3xl font-bold">Dashboard</h1>

    //     <div className="text-sm text-gray-400">
    //       {userEmail}
    //     </div>

    //     <button
    //       onClick={generateTasks}
    //       // onClick={handleGenerate}
    //       className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 cursor-pointer"
    //     >
    //       {aiLoading ? 'Generating...' : '✨ Generate'}
    //     </button>
    //   </div>

    //   {/* Add Task */}
    //   <div className="bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex gap-2">
    //     <input
    //       className="flex-1 border rounded-lg p-2"
    //       value={newTask}
    //       onChange={(e) => setNewTask(e.target.value)}
    //       placeholder="Add new task..."
    //     />
    //     <button
    //       onClick={handleAdd}
    //       className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg cursor-pointer"
    //     >
    //       Add
    //     </button>
    //   </div>

    //   {/* Filtering */}
    //   <div className="flex items-center justify-start gap-3 mb-4">
    //     <h2>Filtering by status: </h2>
    //     <div>
    //       <StatusFilter 
    //         value={filter}
    //         onChange={handleFilterChange}
    //       />
    //     </div>
    //   </div>

    //   {/* Tasks */}
    //   <div className="space-y-3">
    //     {loadingTasks ? (
    //       <>
    //         {[...Array(3)].map((_, i) => (
    //           <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
    //             <Skeleton className="h-18 w-full" />
    //             {/* <Skeleton className="h-4 w-32" /> */}
    //           </li>
    //         ))}
    //       </>
    //     ) : (
    //       filteredTasks.map(task => (

    //         <TaskComponent
    //           key={task.id}
    //           task={task}
    //           onChangeStatus={handleChangeStatus}
    //           onDelete={(task) => deleteTask(task.id)}
    //         />
    //       ))
    //     )}
    //   </div>
    // </div>

    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <div className="flex items-center gap-2 text-zinc-500 bg-zinc-900/50 w-fit px-3 py-1 rounded-full border border-zinc-800">
              <BiUserCircle className="text-cyan-500" />
              <span className="text-xs font-medium">{userEmail}</span>
            </div>
          </div>

          <Button
            onClick={generateTasks}
            disabled={aiLoading}
            className="relative overflow-hidden group bg-zinc-900 rounded-md border border-zinc-800 hover:border-cyan-500/50 transition-all px-6 py-2 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              {aiLoading ? (
                <div className="h-4 w-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              ) : (
                <IoSparkles className="text-cyan-400 group-hover:rotate-12 transition-transform" />
              )}
              {aiLoading ? 'Magic in progress...' : 'AI Generate'}
            </span>
            {/* Эффект свечения при ховере */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div>

        {/* Input & Filter Bar */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
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
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/50 relative z-50">
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <BiFilterAlt />
                  <span>Filter:</span>
                </div>
                <StatusFilter 
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              {filter === 'all' ? 'All Tasks' : `${filter} Tasks`}
            </h3>
            <Badge variant="outline" className="border-zinc-800 text-zinc-500">
              {filteredTasks.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {loadingTasks ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="p-1">
                  <Skeleton className="h-20 w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
                </div>
              ))
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="transition-all hover:translate-x-1">
                  <TaskComponent
                    task={task}
                    onChangeStatus={handleChangeStatus}
                    onDelete={(t) => deleteTask(t.id)}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-3xl">
                <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
                  <BiTask className="text-3xl text-zinc-600" />
                </div>
                <p className="text-zinc-500">No tasks found. Time to create something new!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDashboardClient