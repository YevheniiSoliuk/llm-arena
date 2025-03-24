import { addDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Model, UserModelSelection } from "@/types";
import { db } from "@/utils/db";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { getRandomItemsFromArray } from "@/utils/getRandomItemsFromArray";

export const getModelsToComparison = async (taskType: TaskTypeEnum | "general", random: boolean = false) => {
  const modelsSnapshot = await getDocs(db.models);
  const models = [] as Model[];

  for (const doc of modelsSnapshot.docs) {
    const data = doc.data();
    models.push({
      name: data.name,
      producent: data.producent,
      id: doc.id,
      scoreByTask: data.scoreByTask,
      totalScore: data.scoreByTask.reduce((acc, task) => {
        return (acc += task.score);
      }, 0),
    });
  }

  const sortedModels = models.sort((a, b) => {
    if (taskType === "general") {
      return b.totalScore - a.totalScore;
    }

    const scoreA = a.scoreByTask.find((task) => task.name === taskType)?.score ?? 0;
    const scoreB = b.scoreByTask.find((task) => task.name === taskType)?.score ?? 0;

    return scoreB - scoreA;
  });

  if (random) {
    const randomModels = getRandomItemsFromArray(sortedModels, 2);

    return randomModels;
  }

  return sortedModels;
};

export const updateModelScore = async (modelId: string, score: number, taskIndex: number) => {
  const model = await getDoc(db.model(modelId));
  const modelData = model.data();

  if (!modelData) {
    return;
  }
  console.log(modelData.scoreByTask[taskIndex].score);
  modelData.scoreByTask[taskIndex].score = score;
  console.log(score);
  await updateDoc(db.model(modelId), {
    scoreByTask: modelData.scoreByTask,
  });
};

export const checkIfUserRateSuchPairOfModels = async (userId: string, firstModelId: string, secondModelId: string, taskType: TaskTypeEnum) => {
  const isFirstModelExist = await getDocs(db.user_model_selection(userId, firstModelId, taskType));
  const isSecondModelExist = await getDocs(db.user_model_selection(userId, secondModelId, taskType));

  console.log("isFirstModelExist: ", isFirstModelExist);
  console.log("isSecondModelExist: ", isSecondModelExist);

  return isFirstModelExist.size === 1 && isSecondModelExist.size === 1;
}

export const addModelPairForUser = async (userId: string, firstModelId: string, secondModelId: string, taskType: TaskTypeEnum) => {
  const newUserModelSelection: UserModelSelection = {
    userId,
    taskType,
    generatedModelsPair: [firstModelId, secondModelId],
  };

  await addDoc(db.user_model_selection_collection, newUserModelSelection);
}