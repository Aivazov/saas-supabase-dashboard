// store/useRoomDetails.ts

import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';
import { RoomMember } from '@/types/room-member';
import { Room } from '@/types/room';
import { toast } from 'sonner';

type RoomDetailsState = {
  room: Room | null; // .select("*")
  // members: any[];
  members: RoomMember[];

  loadingRoom: boolean;
  loadingMembers: boolean;
  error: string | null;

  fetchRoom: (roomId: string) => Promise<void>;
  fetchMembers: (roomId: string) => Promise<void>;
  inviteMember: (roomId: string, email: string) => Promise<void>;
  deleteMember: (memberId: string, roomId: string) => Promise<void>;
};

export const useRoomDetailsStore = create<RoomDetailsState>((set, get) => ({
  room: null,
  members: [],
  loadingRoom: false,
  loadingMembers: true,
  error: null,

  fetchRoom: async (roomId) => {
    set({ loadingRoom: true, error: null });
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .maybeSingle();

    if (error) return set({ error: error.message, loadingRoom: false });

    set({ room: data, loadingRoom: false });
  },

  fetchMembers: async (roomId) => {
    set({ loadingMembers: true, error: null });
    const { data, error } = await supabase
      .from('room_members')
      .select('id, role, profiles(email, nickname)')
      .eq('room_id', roomId);

    if (error) return set({ error: error.message, loadingMembers: false });

    set({ members: data || [], loadingMembers: false });
  },

  inviteMember: async (roomId, email) => {
    const trimmedEmail = email.trim();

    const { data: user } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email.trim())
      .maybeSingle();

    // const isMatch = user?.email === email.trim();
    // console.log('user?.email:', user?.email);
    // console.log('isMatch inviteMember hook:', isMatch);
    if (!user) {
      toast.error('User not found');
      return;
    }

    // check if the user is already invited
    const { data: existingMember } = await supabase
      .from('room_members')
      .select('id')
      .eq('room_id', roomId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingMember) {
      toast.error('User already has been invited');
      return;
    }

    const { error } = await supabase.from('room_members').insert({
      room_id: roomId,
      user_id: user.id,
      role: 'member',
    });

    // if (error) return set({ error: error.message });

    if (error) {
      if (error.code === '23505') {
        toast.error('User already in the room');
      } else {
        console.error(error.message);
      }
      return;
    }

    await get().fetchMembers(roomId);
  },

  deleteMember: async (memberId, roomId) => {
    const prevMembers = get().members;

    // оптимистично убираем
    set({
      members: prevMembers.filter((m) => m.id !== memberId),
    });

    const { error } = await supabase
      .from('room_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      // откат если ошибка
      toast.error('Error with deleting');
      set({ members: prevMembers, error: error.message });
      return;
    }
  },
  // deleteMember: async (memberId, roomId) => {
  //   const { error } = await supabase
  //     .from("room_members")
  //     .delete()
  //     .eq("id", memberId);

  //   if (error) return set({ error: error.message })

  //   await get().fetchMembers(roomId)
  // }
}));
