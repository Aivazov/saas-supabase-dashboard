import { Task } from '@/constants/task';
import { StatusSelector } from '@/services/StatusSelector'
import StatusBadge from '../StatusBadge';
import DeleteTaskBtn from '../DeleteTaskBtn';
import { Status } from '@/constants/status';

type TaskComponentProps = {
  task: Task;
  onChangeStatus: (status: Status, task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskComponent = ({task, onChangeStatus, onDelete}: TaskComponentProps) => {
  return (
    <div
      key={task.id}
      className="bg-gray-700 p-4 rounded-xl flex justify-between w-full"
    >
      <div>
        <p>{task.title}</p>
        <StatusBadge status={task.status} />
      </div>

      {/* STATUS SELECTOR */}
      <div className="flex gap-2">
        
        <StatusSelector 
          value={task.status}
          onChange={(e) => onChangeStatus(e, task)}
        />

        {onDelete && (
          <DeleteTaskBtn onConfirm={() => onDelete(task)} />
        )}
      </div>
    </div>
  )
}

export default TaskComponent