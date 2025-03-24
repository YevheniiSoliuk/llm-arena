import { getModelsToComparison } from "@/api/firestore";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { useQuery } from "@tanstack/react-query";

const useGetModels = (taskType: TaskTypeEnum | "general", random: boolean = false) => {
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const models = await getModelsToComparison(taskType, random);

      return models;
    },
  });
};

export default useGetModels;
