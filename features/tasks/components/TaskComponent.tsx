// features/tasks/components/TaskComponent.tsx

import { Task } from '@/types/task';
import { StatusSelector } from '@/features/tasks/components/StatusSelector'
import StatusBadge from './StatusBadge';
import DeleteTaskBtn from './DeleteTaskBtn';
import { Status } from '@/types/status';

type TaskComponentProps = {
  task: Task;
  onChangeStatus: (status: Status, task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskComponent = ({task, onChangeStatus, onDelete}: TaskComponentProps) => {
  return (
    <div
      key={task.id}
      className="group bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl flex items-center justify-between w-full transition-all duration-200"
    >
      <div className="space-y-1.5">
        <p className="text-zinc-100 font-medium tracking-tight group-hover:text-cyan-400 transition-colors">
          {task.title}
        </p>
        <StatusBadge status={task.status} />
      </div>

      <div className="flex items-center gap-3">
        <StatusSelector 
          value={task.status}
          onChange={(val) => onChangeStatus(val, task)}
        />
        {onDelete && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DeleteTaskBtn onConfirm={() => onDelete(task)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskComponent