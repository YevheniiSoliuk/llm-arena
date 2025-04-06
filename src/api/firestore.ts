import { addDoc, getDoc, getDocs, increment, updateDoc } from "firebase/firestore";
import { BaseModel, Model, TaskExample, UserModelSelection } from "@/types";
import { db } from "@/utils/db";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { getRandomItemsFromArray } from "@/utils/getRandomItemsFromArray";

export const getModelsToComparison = async (taskType: TaskTypeEnum | "general", random: boolean = false) => {
  if (taskType === "general") {
    const baseModels = [] as BaseModel[];
    const baseModelsSnapshot = await getDocs(db.base_models);

    for (const doc of baseModelsSnapshot.docs) {
      const data = doc.data();
      const models = await getDocs(db.models_by_base_model(doc.id));
      const totalScore = models.docs.reduce((acc, doc) => {
        acc += doc.data().score ?? 0;
        return acc;
      }, 0);

      baseModels.push({
        id: doc.id,
        name: data.name,
        producent: data.producent,
        totalScore: totalScore,
      });
    }

    return baseModels.sort((a, b) => b.totalScore - a.totalScore);
  }

  const models = [] as Model[];
  const modelsSnapshot = await getDocs(db.models(taskType));
  for (const doc of modelsSnapshot.docs) {
    const data = doc.data();
    const baseModel = await getDoc(db.base_model(data.baseModel));
    models.push({
      id: doc.id,
      name: data.name,
      producent: data.producent,
      score: data.score,
      taskType: data.taskType,
      baseModel: baseModel.data() as unknown as BaseModel,
    });
  }

  if (random) {
    const randomModels = getRandomItemsFromArray<Model>(models, 2);
    return randomModels;
  } else {
    const sortedModels = models.sort((a, b) => b.score - a.score);
    return sortedModels;
  }
};

export const updateModelScore = async (modelId: string, score: number) => {
  await updateDoc(db.model(modelId), {
    score: increment(score),
  });
};

export const checkIfUserRateSuchPairOfModels = async (userId: string, firstModelId: string, secondModelId: string, taskType: TaskTypeEnum) => {
  const isFirstModelExist = await getDocs(db.user_model_selection(userId, firstModelId, taskType));
  const isSecondModelExist = await getDocs(db.user_model_selection(userId, secondModelId, taskType));

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

export const getTaskExamples = async (taskType: TaskTypeEnum) => {
  const taskExamples = [] as TaskExample[];
  const taskExamplesSnapshot = await getDocs(db.task_examples(taskType));

  for (const doc of taskExamplesSnapshot.docs) {
    const data = doc.data();
    taskExamples.push({
      id: doc.id,
      name: data.name,
      taskType: data.taskType,
      content: data.content,
    });
  }

  return taskExamples;
}