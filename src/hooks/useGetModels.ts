import { getModelsToComparison } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const useGetModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const models = await getModelsToComparison();

      return models;
    },
  });
};

export default useGetModels;
