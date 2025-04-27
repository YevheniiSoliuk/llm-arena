import { TaskTypeEnum } from "@/constants/taskTypes";
import { useGetTaskExamples } from "@/hooks/useGetTaskExamples";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TaskExamplesSelectProps = {
  taskType: TaskTypeEnum;
  selectedExample?: string;
  selectExample: (example: string) => void;
}

export const TaskExamplesSelect = ({ taskType, selectedExample, selectExample }: TaskExamplesSelectProps) => {
  const [example, setExample] = useState<string>();
  const { data: taskExamples } = useGetTaskExamples(taskType);
  const exampleName = taskExamples?.find((taskExample) => taskExample.id === example);

  useEffect(() => {
    setExample(selectedExample);
  }, [selectedExample]);

  const handleExampleSelection = (example: string) => {
    setExample(example);
    selectExample(example);
  }

  return (
    <Select value={example} onValueChange={handleExampleSelection}>
      <SelectTrigger className={cn('compare-step-2', 'h-auto w-full sm:w-[240px] border-border-input px-4 py-2')}>
        <SelectValue children={!exampleName ? "Select an example" : exampleName.name} placeholder='Select an example'/>
      </SelectTrigger>
      <SelectContent className={cn('compare-step-2')}>
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