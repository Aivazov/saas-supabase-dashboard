// components/ProfilePageClient.tsx
'use client';

import { updateNickname } from '@/lib/profile';
import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BiUserCircle, BiEnvelope, BiSave, BiCheckCircle } from "react-icons/bi";
import { toast } from "sonner"; 

type ProfilePageClientProps = {
  userEmail?: string | null;
  nickname?: string | null;
}

const ProfilePageClient = ({ userEmail, nickname }: ProfilePageClientProps) => {
  const [value, setValue] = useState(nickname ?? '')
  const [loading, setLoading] = useState(false)
  // console.log('nickname ProfilePageClient', nickname);
  
  const handleUpdate = async () => {
    setLoading(true)
    const toastId = toast.loading("Trying...");
    try {
      await updateNickname(value)
      toast.success('Nickname updated', {
        id: toastId,
      })
    } catch (e) {
      console.error(e)
      toast.error("Rename error!", {
        id: toastId,
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-zinc-400 mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Card */}
          <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl">
            <CardHeader className="border-b border-zinc-800/50">
              <div className="flex items-center gap-2">
                <BiUserCircle className="w-5 h-5 text-cyan-500" />
                <CardTitle className="text-xl text-zinc-100">Public Profile</CardTitle>
              </div>
              <CardDescription className="text-zinc-500">
                This is how others will see you in the workspace.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-6">
              {/* Email (Read Only) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <BiEnvelope className="w-4 h-4" /> Email Address
                </label>
                <div className="bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl text-zinc-500 select-none cursor-not-allowed">
                  {userEmail}
                </div>
                <p className="text-[11px] text-zinc-600">Email cannot be changed at this time.</p>
              </div>

              {/* Nickname Input */}
              <div className="space-y-2 text-zinc-300">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Nickname</label>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your nickname"
                    className="bg-zinc-950/50 border-zinc-800 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl h-11"
                  />
                  <Button 
                    onClick={handleUpdate}
                    disabled={loading || value === nickname || !value}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl px-6 h-11 transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.2)] cursor-pointer"
                  >
                    {loading ? (
                      "Saving..."
                    ) : (
                      <>
                        <BiSave className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительная секция (для примера) */}
          <div className="p-4 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-between opacity-50">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 p-2 rounded-lg">
                <BiCheckCircle className="text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-xs text-zinc-500">Your account is in good standing.</p>
              </div>
            </div>
            <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 uppercase tracking-wider">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageClient