// components/RoomBoard.tsx

// import { useRoomTodos } from '../hooks/useRoomTodos';

// export default function RoomBoard({ roomId }: { roomId: string }) {
//   const todos = useRoomTodos(roomId);

//   const columns = {
//     todo: todos.filter(t => t.status === 'todo'),
//     in_progress: todos.filter(t => t.status === 'in_progress'),
//     done: todos.filter(t => t.status === 'done'),
//   };

//   return (
//     <div style={{ display: 'flex', gap: '1rem' }}>
//       {Object.entries(columns).map(([status, items]) => (
//         <div key={status} style={{ flex: 1 }}>
//           <h3>{status.toUpperCase()}</h3>
//           {items.map(item => (
//             <div key={item.id} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '8px' }}>
//               <strong>{item.title}</strong>
//               <p>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
