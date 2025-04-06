import { TaskTypeEnum } from "@/constants/taskTypes";
import { useGetTaskExamples } from "@/hooks/useGetTaskExamples";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

type TaskExamplesSelectProps = {
  taskType: TaskTypeEnum;
  selectedExample?: string;
  selectExample: (example: string) => void;
}

export const TaskExamplesSelect = ({ taskType, selectedExample, selectExample }: TaskExamplesSelectProps) => {
  const [example, setExample] = useState<string | undefined>(selectedExample);
  const { data: taskExamples } = useGetTaskExamples(taskType);

  const handleExampleSelection = (example: string) => {
    setExample(example);
    selectExample(example);
  }

  return (
    <Select value={example} onValueChange={handleExampleSelection}>
      <SelectTrigger className='h-auto w-[240px] border-border-input px-4 py-2'>
        <SelectValue placeholder='Select an example'/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Examples</SelectLabel>
          {taskExamples?.map((taskExample) => (
            <SelectItem key={taskExample.id} value={taskExample.id}>
              {taskExample.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};