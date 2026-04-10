// components/DashboardClient.tsx
'use client';

import { useEffect, useState } from "react";
import { useTasks } from "@/store/useTasks"
import StatusBadge from "@/components/StatusBadge";
import TodoListbox from "@/components/TodoListbox";
import { Status, Task } from "@/types/components";
// import MyModal from "./MyModal";
import DeleteTaskBtn from "./DeleteTaskBtn";

interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const { tasks, fetchTasks, addTask, updateTaskStatus, deleteTask } = useTasks();

  const [newTask, setNewTask] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

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

  const handleGenerate = async () => {
    const topic = window.prompt("Введите тему для генерации задач:") || '';
    if (!topic.trim()) return;

    setAiLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });

      const data = await res.json();
      
      if (data.tasks && Array.isArray(data.tasks)) {
        for (const t of data.tasks) {
          await addTask(t);
        }
      }
    } catch (error) {
      alert("Ошибка при генерации задач");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="text-sm text-gray-400">
          {userEmail}
        </div>

        <button
          onClick={handleGenerate}
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

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map(task => (
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