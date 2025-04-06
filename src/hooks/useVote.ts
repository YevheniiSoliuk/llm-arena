import { Decision, ModelWithType } from "@/types";
import useUpdateModelScore from "./useUpdateModelScore";
import { addModelPairForUser, checkIfUserRateSuchPairOfModels } from "@/api/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { showNotification } from "@/utils/showNotification";

type VoteParams = {
  models: ModelWithType[];
  decision: Decision | null;
  selectedTask: TaskTypeEnum;
};

const useVote = ({ models, decision, selectedTask }: VoteParams) => {
  const { mutate: updateModelScore } = useUpdateModelScore();
  const{ user } = useAuth0();

  const vote = async () => {
    if (!user || !user.sub) {
      return;
    }

    const isUserRateThisPairOfModels = await checkIfUserRateSuchPairOfModels(user.sub, models[0].model.id, models[1].model.id, selectedTask);

    if (isUserRateThisPairOfModels) {
      return;
    }

    await addModelPairForUser(user.sub, models[0].model.id, models[1].model.id, selectedTask);

    switch (decision) {
      case "model_a": {
        updateModelScore({
          modelId: models[0].model.id,
          score: 1,
        });
        break;
      }
      case "model_b": {
        updateModelScore({
          modelId: models[1].model.id,
          score: 1,
        });
        break;
      }
      case "tie": {
        updateModelScore({
          modelId: models[0].model.id,
          score: 1,
        });
        updateModelScore({
          modelId: models[1].model.id,
          score: 1,
        });
        break;
      }
      case "both_bad": {
        break;
      }
      default:
        showNotification("vote-error", "Wrong decision!", "error");
        break;
    }
  };

  return { vote };
};

export default useVote;
