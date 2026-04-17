// hooks/useRoomTodos.ts
// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase-client';

// export function useRoomTodos(roomId: string) {
//   const [todos, setTodos] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const { data, error } = await supabase
//         .from('room_todos')
//         .select('*')
//         .eq('room_id', roomId);
//       if (!error) setTodos(data || []);
//     };
//     fetchTodos();

//     // realtime subscription
//     const channel = supabase
//       .channel(`room_todos:${roomId}`)
//       .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'room_todos', filter: `room_id=eq.${roomId}` },
//         (payload) => {
//           fetchTodos();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [roomId]);

//   return todos;
// }
