// hooks/useGenerateTasks.ts

import { useTasks } from "@/store/useTasks";
import { useState } from "react";

export function useGenerateTasks() {
  const { createTask } = useTasks();
  const [loading, setLoading] = useState(false);

  const generateTasks = async () => {
    const topic = window.prompt("Введите тему для генерации задач:") || '';
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });

      const data = await res.json();
      
      if (data.tasks && Array.isArray(data.tasks)) {
        // ⚠️ важно: не await в цикле (медленно)
        await Promise.all(data.tasks.map((t: string) => createTask(t)))
      }
      // if (data.tasks && Array.isArray(data.tasks)) {
      //   for (const t of data.tasks) {
      //     await createTask(t);
      //   }
      // }
    } catch (error) {
      alert("Ошибка при генерации задач");
    } finally {
      setLoading(false);
    }
  }

  return {
    generateTasks,
    loading,
  }
}