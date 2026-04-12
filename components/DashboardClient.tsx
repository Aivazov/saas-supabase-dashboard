// components/DashboardClient.tsx
'use client';

// import { useEffect, useState } from "react";
// import { useTasks } from "@/store/useTasks"
// import StatusBadge from "@/components/StatusBadge";
// import TodoListbox from "@/components/TodoListbox";
// import { Status, Task } from "@/types/components";
// // import MyModal from "./MyModal";
// import DeleteTaskBtn from "./DeleteTaskBtn";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase-client";

interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {

  const [teams, setTeams] = useState<any[]>([]);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  const [teamName, setTeamName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  async function loadTeams() {
    const { data } = await supabase.from("teams").select("*");
    setTeams(data || []);

    if (data?.length && !currentTeamId) {
      setCurrentTeamId(data[0].id);
    }
  }

  async function loadTasks(teamId: string) {
    const { data } = await supabase
      .from("team_tasks")
      .select("*")
      .eq("team_id", teamId)
      .order("created_at", { ascending: false });

    setTasks(data || []);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (currentTeamId) {
      loadTasks(currentTeamId);
    }
  }, [currentTeamId]);

  async function createTeam() {
    if (!teamName) return;

    const { data } = await supabase
      .from("teams")
      .insert({ name: teamName })
      .select()
      .single();

    if (data) {
      setTeams((prev) => [...prev, data]);
      setCurrentTeamId(data.id);
      setTeamName("");
    }
  }

  async function createTask() {
    if (!taskTitle || !currentTeamId) return;

    const { data } = await supabase
      .from("team_tasks")
      .insert({
        title: taskTitle,
        team_id: currentTeamId,
      })
      .select()
      .single();

    if (data) {
      setTasks((prev) => [data, ...prev]);
      setTaskTitle("");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* TEAM SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Button onClick={createTeam}>Create</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {teams.map((team) => (
              <Button
                key={team.id}
                variant={team.id === currentTeamId ? "default" : "outline"}
                onClick={() => setCurrentTeamId(team.id)}
              >
                {team.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TASK SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Button onClick={createTask}>Add</Button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted transition"
              >
                <span>{task.title}</span>
                <span className="text-sm text-muted-foreground">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // const { tasks, fetchTasks, addTask, updateTaskStatus, deleteTask } = useTasks();

  // const [newTask, setNewTask] = useState('');
  // const [aiLoading, setAiLoading] = useState(false);

  // // ✅ просто грузим данные
  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);

  // const handleAdd = async () => {
  //   if (!newTask) return
  //   await addTask(newTask)
  //   setNewTask('')
  // }

  // const handleChangeStatus = (status: Status, task: Task) => {
  //   updateTaskStatus(task.id, status)
  // }

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

  // return (
  //   <div className="max-w-4xl mx-auto">

  //     {/* Header */}
  //     <div className="flex justify-between items-center mb-6">
  //       <h1 className="text-3xl font-bold">Dashboard</h1>

  //       <div className="text-sm text-gray-400">
  //         {userEmail}
  //       </div>

  //       <button
  //         onClick={handleGenerate}
  //         className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 cursor-pointer"
  //       >
  //         {aiLoading ? 'Generating...' : '✨ Generate'}
  //       </button>
  //     </div>

  //     {/* Add Task */}
  //     <div className="bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex gap-2">
  //       <input
  //         className="flex-1 border rounded-lg p-2"
  //         value={newTask}
  //         onChange={(e) => setNewTask(e.target.value)}
  //         placeholder="Add new task..."
  //       />
  //       <button
  //         onClick={handleAdd}
  //         className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg cursor-pointer"
  //       >
  //         Add
  //       </button>
  //     </div>

  //     {/* Tasks */}
  //     <div className="space-y-3">
  //       {tasks.map(task => (
  //         <div
  //           key={task.id}
  //           className="bg-gray-700 p-4 rounded-xl flex justify-between"
  //         >
  //           <div>
  //             <p>{task.title}</p>
  //             <StatusBadge status={task.status} />
  //           </div>

  //           {/* STATUS SELECTOR */}
  //           <div className="flex gap-2">
              
  //             <TodoListbox
  //               value={task.status}
  //               onChange={(e) => handleChangeStatus(e, task)}
  //             />

  //             <DeleteTaskBtn taskId={task.id} />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
}