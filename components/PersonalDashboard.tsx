//components/PersonalDashboardClient.tsx

'use client';
import { useEffect, useMemo, useState } from "react";
import { useTasks } from "@/store/useTasks"
import { useGenerateTasks } from '@/hooks/useGenerateTasks'
import StatusBadge from "@/components/StatusBadge";
import TodoListbox from "@/components/TodoListbox";
import { Status, Task } from "@/types/components";
// import MyModal from "./MyModal";
import DeleteTaskBtn from "./DeleteTaskBtn";

interface PersonalDashboardClientProps {
  userEmail?: string | null;
}

const PersonalDashboardClient = ({userEmail}: PersonalDashboardClientProps) => {
  const { tasks, fetchTasks, addTask, updateTaskStatus } = useTasks();

  const [filter, setFilter] = useState<Status | 'all'>('all')

  const [newTask, setNewTask] = useState('');
  const { generateTasks, loading: aiLoading } = useGenerateTasks()

  // ✅ просто грузим данные
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = async () => {
    if (!newTask) return
    await addTask(newTask)
    setNewTask('')
  }

  const handleChangeStatus = (status: Status, task: Task) => {
    updateTaskStatus(task.id, status)
  }

  // const selectFilter = (e) => {
  //   console.log(e);
    
  //   switch (e) {
  //     case 'todo':
  //       return 'todo';
  //     case 'doing':
  //       return 'doing';
  //     case 'done':
  //       return 'done';
  //     default:
  //       break;
  //   }
  // }

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter(task => task.status === filter)
  }, [tasks, filter])
    
  const handleFilterChange = (value: Status) => {
    setFilter(value)
  }

  // const handleGenerate = async () => {
  //   const topic = window.prompt("Введите тему для генерации задач:") || '';
  //   if (!topic.trim()) return;

  //   setAiLoading(true);

  //   try {
  //     const res = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt: topic }),
  //     });

  //     const data = await res.json();
      
  //     if (data.tasks && Array.isArray(data.tasks)) {
  //       for (const t of data.tasks) {
  //         await addTask(t);
  //       }
  //     }
  //   } catch (error) {
  //     alert("Ошибка при генерации задач");
  //   } finally {
  //     setAiLoading(false);
  //   }
  // };

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
          <TodoListbox
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className="bg-gray-700 p-4 rounded-xl flex justify-between"
          >
            <div>
              <p>{task.title}</p>
              <StatusBadge status={task.status} />
            </div>

            {/* STATUS SELECTOR */}
            <div className="flex gap-2">
              
              <TodoListbox
                value={task.status}
                onChange={(e) => handleChangeStatus(e, task)}
              />

              <DeleteTaskBtn taskId={task.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalDashboardClient