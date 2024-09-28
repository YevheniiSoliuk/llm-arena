import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { tasks, TaskTypeEnum } from "./constants";

type TaskSelectProps = {
  defaultValue: TaskTypeEnum;
  selectTask: (task: TaskTypeEnum) => void;
};

const TaskSelect = ({ defaultValue, selectTask }: TaskSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={(value) => selectTask(value as TaskTypeEnum)}>
      <SelectTrigger className='h-auto w-[240px] border-border-input px-4 py-2'>
        <SelectValue placeholder='Select a task' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tasks</SelectLabel>
          {tasks.map((task) => (
            <SelectItem key={task.name} value={task.value}>
              {task.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TaskSelect;
