import { getTaskExamples } from "@/api/firestore";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { useTaskExamplesStore } from "@/store/examples";
import { useQuery } from "@tanstack/react-query";

export const useGetTaskExamples = (taskType: TaskTypeEnum) => {
  const setExamples = useTaskExamplesStore((state) => state.setExamples);
  return useQuery({
    queryKey: ["task-examples", taskType],
    queryFn: async () => {
      const taskExamples = await getTaskExamples(taskType);
      const sortedTaskExamples = taskExamples.sort((a, b) => Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1]));
      setExamples(sortedTaskExamples);
      return sortedTaskExamples;
    },
  });
};
