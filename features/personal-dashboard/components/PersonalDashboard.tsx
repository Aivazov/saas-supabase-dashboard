// features/personal-dashboard/components/PersonalDashboardClient.tsx

'use client';
// import { useEffect, useMemo, useState } from "react";
// import { useTasks } from "@/store/useTasks"
// import { Status, FilterValue } from "@/constants/status"
// import { Task } from "@/constants/task";
// import { useGenerateTasks } from '@/hooks/useGenerateTasks'
// import { StatusFilter } from "@/features/tasks/components/StatusFilter";
// import TaskComponent from "../../tasks/components/TaskComponent";
// import { Skeleton } from "../../../components/ui/skeleton";
// import { BiFilterAlt, BiPlus, BiUserCircle, BiTask, BiStar } from "react-icons/bi";
// import { IoSparkles } from "react-icons/io5";
// import { Button } from "@headlessui/react";
// import { Card, CardContent } from "../../../components/ui/card";
// import { Input } from "../../../components/ui/input";
// import { Badge } from "../../../components/ui/badge";
// import { Button } from "../../../components/ui/button";
import { usePersonalDashboard } from "../hooks/use-personal-dashboard";
import PersonalDashboardHeader from "./PersonalDashboardHeader";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";

interface PersonalDashboardClientProps {
  userEmail?: string | null;
}

const PersonalDashboardClient = ({userEmail}: PersonalDashboardClientProps) => {
  // const {
  //   tasks,
  //   loadingTasks,
  //   fetchTasks,
  //   createTask,
  //   updateTaskStatus,
  //   deleteTask
  // } = useTasks();

  // const [filter, setFilter] = useState<Status | 'all'>('all')

  // const [newTask, setNewTask] = useState('');
  // const { generateTasks, loading: aiLoading } = useGenerateTasks()

  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);

  // const handleAdd = async () => {
  //   if (!newTask) return
  //   await createTask(newTask)
  //   setNewTask('')
  // }

  // const handleChangeStatus = (status: Status, task: Task) => {
  //   updateTaskStatus(task.id, status)
  // }

  // const filteredTasks = useMemo(() => {
  //   if (filter === 'all') return tasks
  //   return tasks.filter(task => task.status === filter)
  // }, [tasks, filter])
    
  // const handleFilterChange = (value: Status | FilterValue) => {
  //   setFilter(value)
  // }
  // console.log('newTask PersonalDashboard: ', newTask);
  
  const {
    tasks,
    totalCount,
    isLoading,
    form,
    handleAddTask,
    deleteTask,
    updateStatus,
    filter,
    setFilter,
    generateTasks,
    aiLoading
  } = usePersonalDashboard();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </div> */}

        <PersonalDashboardHeader
          userEmail={userEmail}
          generateTasks={generateTasks}
          aiLoading={aiLoading}
        />

        {/* Input & Filter Bar */}
        {/* <div className="grid grid-cols-1 gap-4">
          <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
            <CardContent className="p-4">

              <form onSubmit={form.handleSubmit(handleAddTask)} className="flex flex-col md:flex-row gap-4 items-center text-zinc-300">
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
                />
              </div>
            </CardContent>
          </Card>
        </div> */}
        <TaskInputForm
          form={form} 
          onSubmit={handleAddTask} 
          isLoading={isLoading} 
          filter={filter} 
          setFilter={setFilter}
        />

        {/* Tasks List */}
        {/* <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              {filter === 'all' ? 'All Tasks' : `${filter} Tasks`}
            </h3>
            <Badge variant="outline" className="border-zinc-800 text-zinc-500">
              {totalCount}
            </Badge>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="p-1">
                  <Skeleton className="h-20 w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
                </div>
              ))
            ) : tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} className="transition-all hover:translate-x-1">
                  <TaskComponent
                    task={task}
                    onChangeStatus={updateStatus}
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
        </div> */}

        <TaskList 
        tasks={tasks}
        totalCount={totalCount}
        isLoading={isLoading}
        filter={filter}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
        />
      </div>
    </div>
  )
}

export default PersonalDashboardClient