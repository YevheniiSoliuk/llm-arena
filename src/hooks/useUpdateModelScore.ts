import { updateModelScore } from "@/api/firestore";
import { useMutation } from "@tanstack/react-query";

const useUpdateModelScore = () => {
  return useMutation({
    mutationKey: ["model-score-update"],
    mutationFn: async ({ modelId, score, taskIndex }: { modelId: string; score: number; taskIndex: number }) => {
      await updateModelScore(modelId, score, taskIndex);
    },
  });
};

export default useUpdateModelScore;
