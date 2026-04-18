import { Task } from '@/constants/task';
import { StatusSelector } from '@/services/StatusSelector'
import StatusBadge from '../StatusBadge';
import DeleteTaskBtn from '../DeleteTaskBtn';
import { Status } from '@/constants/status';

type Props = {
  task: Task;
  onChangeStatus: (status: Status, task: Task) => void 
}

const TaskComponent = ({task, onChangeStatus}: Props) => {
  return (
    <div
      key={task.id}
      className="bg-gray-700 p-4 rounded-xl flex justify-between"
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

        <DeleteTaskBtn taskId={task.id} />
      </div>
    </div>
  )
}

export default TaskComponent