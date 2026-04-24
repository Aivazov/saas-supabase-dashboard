// features/auth/components/DashboardClient.tsx
'use client';

import dynamic from "next/dynamic";
import { useDashboard } from "../hooks/use-dashboard";
import DashboardContentSection from "./DashboardContentSection";
const DashboardRoomCreationForm = dynamic(
  () => import("./DashboardRoomCreationForm"),
  { ssr: false }
);
interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const {
    rooms,
    loadingWhenCreatingRoom,
    form,
    handleCreateRoom,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-zinc-400 mt-1">Manage your collaborative spaces and projects.</p>
          </div>
          
          {/* Input Form */}
          <DashboardRoomCreationForm
            loadingWhenCreatingRoom={loadingWhenCreatingRoom}
            form={form}
            handleCreateRoom={handleCreateRoom}
          />
        </div>

        {/* Content Section */}
        <DashboardContentSection rooms={rooms}  />
      </div>
    </div>
  );
}