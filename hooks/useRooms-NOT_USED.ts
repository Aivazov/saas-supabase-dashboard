// hooks/useRoom.ts

// import { supabase } from '@/lib/supabase-client';

// export const useRooms = () => {
//   const renameRoom = async (roomId: string, newName: string) => {
//     const { error } = await supabase
//       .from('rooms')
//       .update({ name: newName })
//       .eq('id', roomId);
//     if (error) throw error;
//   };

//   const deleteRoom = async (roomId: string) => {
//     const { error } = await supabase
//       .from('rooms')
//       .delete()
//       .eq('id', roomId);
//     if (error) throw error;
//   };

//   return { renameRoom, deleteRoom };
// };
