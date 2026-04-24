// features/personal-dashboard/components/PersonalDashboardClient.tsx

'use client';
import dynamic from "next/dynamic";
import { usePersonalDashboard } from "../hooks/use-personal-dashboard";
import PersonalDashboardHeader from "./PersonalDashboardHeader";
import TaskList from "./TaskList";
const TaskInputForm = dynamic(
  () => import("./TaskInputForm"),
  { ssr: false }
);

interface PersonalDashboardClientProps {
  userEmail?: string | null;
}

const PersonalDashboardClient = ({userEmail}: PersonalDashboardClientProps) => {
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
        <PersonalDashboardHeader
          userEmail={userEmail}
          generateTasks={generateTasks}
          aiLoading={aiLoading}
        />

      {/* Input & Filter Bar */}
        <TaskInputForm
          form={form} 
          onSubmit={handleAddTask} 
          isLoading={isLoading} 
          filter={filter} 
          setFilter={setFilter}
        />

      {/* Tasks List */}
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