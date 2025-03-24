import { Decision, ModelWithType } from "@/types";
import useUpdateModelScore from "./useUpdateModelScore";
import { addModelPairForUser, checkIfUserRateSuchPairOfModels } from "@/api/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import { TaskTypeEnum } from "@/constants/taskTypes";

type VoteParams = {
  models: ModelWithType[];
  decision: Decision | null;
  selectedTask: TaskTypeEnum;
};

const useVote = ({ models, decision, selectedTask }: VoteParams) => {
  const { mutate } = useUpdateModelScore();
  const{ user } = useAuth0();

  const vote = async () => {
    if (!user || !user.sub) {
      return;
    }

    const model1taskIndex = models[0].model.scoreByTask.findIndex((task) => task.name === selectedTask);
    const model1task = models[0].model.scoreByTask.find((task) => task.name === selectedTask);

    const model2taskIndex = models[1].model.scoreByTask.findIndex((task) => task.name === selectedTask);
    const model2task = models[1].model.scoreByTask.find((task) => task.name === selectedTask);

    console.log("user.sub, models[0].model.id, models[1].model.id, selectedTask", user.sub, models[0].model.id, models[1].model.id, selectedTask);
    const isUserRateThisPairOfModels = await checkIfUserRateSuchPairOfModels(user.sub, models[0].model.id, models[1].model.id, selectedTask);
    console.log("isUserRateThisPairOfModels: ", isUserRateThisPairOfModels);

    if (isUserRateThisPairOfModels) {
      return;
    }

    await addModelPairForUser(user.sub, models[0].model.id, models[1].model.id, selectedTask);

    switch (decision) {
      case "model_a": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score + 1 : 1,
          taskIndex: model1taskIndex,
        });
        break;
      }
      case "model_b": {
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score + 1 : 1,
          taskIndex: model2taskIndex,
        });
        break;
      }
      case "tie": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score + 1 : 1,
          taskIndex: model1taskIndex,
        });
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score + 1 : 1,
          taskIndex: model2taskIndex,
        });
        break;
      }
      case "both_bad": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score - 1 : 0,
          taskIndex: model1taskIndex,
        });
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score - 1 : 0,
          taskIndex: model2taskIndex,
        });
        break;
      }
      default:
        console.log("Wrong decision!");
        break;
    }
  };

  return { vote };
};

export default useVote;
