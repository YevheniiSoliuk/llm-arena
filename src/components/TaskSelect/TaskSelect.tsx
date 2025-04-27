import { TaskTypeEnum } from "@/constants/taskTypes";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { tasks } from "./constants";
import { useChatsStore } from "@/store/chat";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TaskSelectProps = {
  defaultValue: TaskTypeEnum;
  selectTask: (task: TaskTypeEnum) => void;
};

const TaskSelect = ({ defaultValue, selectTask }: TaskSelectProps) => {
  const [task, setTask] = useState<string>();
  const clearChats = useChatsStore((state) => state.clearChats);

  useEffect(() => {
    setTask(defaultValue);
  }, [defaultValue])

  const handleTaskSelect = (value: TaskTypeEnum) => {
    setTask(value);
    selectTask(value);
    clearChats();
  };

  return (
    <Select value={task} onValueChange={(value) => handleTaskSelect(value as TaskTypeEnum)}>
      <SelectTrigger id="task-select-trigger" className={cn('compare-step-1', 'h-auto w-full sm:w-[240px] border-border-input px-4 py-2')}>
        <SelectValue placeholder='Select a task' />
      </SelectTrigger>
      <SelectContent className={cn('task-popover-content', 'min-w-full w-full sm:w-[240px]')}>
        <SelectGroup className='task-popover-content'>
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
