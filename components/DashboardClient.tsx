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
}