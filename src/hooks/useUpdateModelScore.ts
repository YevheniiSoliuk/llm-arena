import { updateModelScore } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateModelScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["model-score-update"],
    mutationFn: async ({ modelId, score, taskIndex }: { modelId: string; score: number; taskIndex: number }) => {
      await updateModelScore(modelId, score, taskIndex);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["models"],
      });
    },
  });
};

export default useUpdateModelScore;
