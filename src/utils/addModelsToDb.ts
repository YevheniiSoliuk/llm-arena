import { baseModels, modelsByTaskType } from "@/constants/models";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { db } from "@/utils/db";
import { getDocs } from "firebase/firestore";

export const addBaseModelsToDb = async () => {
  for (const baseModel of baseModels) {
    await db.create_base_model(baseModel);
  }
}

export const addModelsToDb = async () => {
  const baseModels = await getDocs(db.base_models);

  for (const taskType of Object.values(TaskTypeEnum)) {
    const models = modelsByTaskType[taskType];

    for (const model of models) {
      const baseModel = baseModels.docs.find((baseModel) => model.name?.includes(baseModel.data().name));
      const modelOptions = { ...model };

      if (baseModel && baseModel.id) {
        modelOptions.baseModel = baseModel.id;
      }

      await db.create_model(modelOptions);
    }
  }
}
