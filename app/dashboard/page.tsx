// app/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/supabase-server'
import DashboardClient from '@/components/DashboardClient'

export default async function Dashboard() {
  const user = await getServerUser()
  
  // console.log("SERVER USER:", user)
  // 🔒 защита ДО рендера
  if (!user) {
    redirect('/auth')
  }

  return <DashboardClient userEmail={user.email} />
}

// 'use client'
// import { useEffect, useState } from "react";

// import { useTasks } from "@/store/useTasks"
// import StatusBadge from "@/components/StatusBadge";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import DashboardClient from "@/components/DashBoardClient";

// const Dashboard = () => {
// // const Dashboard = (props: Props) => {
//   const { tasks, fetchTasks, addTask, updateTaskStatus, deleteTask } = useTasks();

//   const [newTask, setNewTask] = useState('');
//   const [aiLoading, setAiLoading] = useState(false);
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   // Проверка авторизации + получение email пользователя
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { user }, error } = await supabase.auth.getUser();
      
//       if (error || !user) {
//         router.push('/auth');
//         return;
//       }

//       setUserEmail(user.email || null);
//       setLoading(false);
//     };

//     checkUser();
//   }, [router]);

//   // Загрузка задач после проверки пользователя
//   useEffect(() => {
//     if (!loading) {
//       fetchTasks();
//     }
//   }, [fetchTasks, loading]);

//   // useEffect(() => {
//   //   supabase.auth.getUser().then(({ data }) => {
//   //     if (!data.user) router.push('/auth');
//   //   });
//   // }, []);

//   // useEffect(() => {
//   //   fetchTasks()
//   // }, [])

//   // const fetchSupabase = async () => {
//   //   const { data, error } = await supabase
//   //   .from('tasks')
//   //   .select('*')
  
//   //   console.log(data, error);
//   // }

//   const handleAdd = async () => {
//     if (!newTask) return
//     await addTask(newTask)
//     setNewTask('')
//   }


//   const handleGenerate = async () => {
//     const topic = window.prompt("Введите тему для генерации задач:") || '';
//     if (!topic.trim()) return;

//     setAiLoading(true);

//     try {
//       const res = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: topic }),
//       });

//       const data = await res.json();
      
//       if (data.tasks && Array.isArray(data.tasks)) {
//         for (const t of data.tasks) {
//           if (t && typeof t === 'string') {
//             await addTask(t);
//           }
//         }
//       }
//     } catch (error) {
//       alert("Ошибка при генерации задач");
//       console.error(error);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-950">
//         <div className="text-white text-xl">Загрузка...</div>
//       </div>
//     );
//   }

  // const handleGenerate = async () => {
  //   const topic = window.prompt("Enter the topic for AI tasks:") || '';
  //   if (!topic) return;

  //   setAiLoading(true);

  //   const res = await fetch("/api/generate", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ prompt: topic }),
  //   });

  //   const data = await res.json();
  //   console.log("Generated tasks:", data.tasks);

  //   for (const t of data.tasks) {
  //     await addTask(t);
  //   }

  //   setAiLoading(false);
  // };
  
//   return <DashboardClient />
// }
    // <div className="p-6 flex flex-col gap-4">
    //   <div className="flex gap-4 items-center">
    //     <h1 className="text-2xl font-bold">Dashboard</h1>
        
    //   </div>

    //   <div>
    //     <button onClick={fetchTasks} className="bg-gray-500 cursor-pointer py-2 px-3 rounded-[20px] hover:bg-amber-950">Fetch</button>
    //   </div>     
      
    //   <div className="mb-4">
    //     <input
    //       className="border p-2 flex-1 rounded-l"
    //       value={newTask}
    //       onChange={(e) => setNewTask(e.target.value)}
    //       placeholder="New task..."
    //     />
    //     <button className="bg-blue-500 text-white p-2 rounded-r" onClick={handleAdd}>
    //       Add
    //     </button>
    //   </div>

    //   <div>
    //     <button
    //       className="bg-green-500 text-white p-2 rounded mt-2"
    //       onClick={handleGenerate}
    //       disabled={aiLoading}
    //     >
    //       {aiLoading ? 'Generating...' : 'Generate Tasks'}
    //     </button>
    //   </div>
      
    //   <ul>
    //     {tasks.map(task => (
    //       <li key={task.id} className="flex justify-between p-2 border mb-2 rounded">
    //         <span>{task.title}</span>
    //         <div className="flex gap-2">
    //           <select
    //             value={task.status}
    //             onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
    //           >
    //             <option value="todo" className={statusColor.todo}>Todo</option>
    //             {/* <option value="todo">Todo</option> */}
    //             <option value="doing">Doing</option>
    //             <option value="done">Done</option>
    //           </select>
    //           <button onClick={() => deleteTask(task.id)} className="text-red-500 cursor-pointer hover:bg-amber-900">X</button>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>