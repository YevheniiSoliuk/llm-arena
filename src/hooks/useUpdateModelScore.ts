import { updateModelScore } from "@/api/firestore";
import { useMutation } from "@tanstack/react-query";

const useUpdateModelScore = () => {
  return useMutation({
    mutationKey: ["model-score-update"],
    mutationFn: async ({ modelId, score }: { modelId: string; score: number; }) => {
      await updateModelScore(modelId, score);
    },
  });
};

export default useUpdateModelScore;
