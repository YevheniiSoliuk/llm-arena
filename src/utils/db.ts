import { TaskTypeEnum } from "@/constants/taskTypes";
import { firestore } from "@/providers/firebase";
import { BaseModel, TaskExample, Model, ModelDto, UserModelSelection } from "@/types";
import { addDoc, collection, doc, limit, PartialWithFieldValue, query, QueryDocumentSnapshot, where } from "firebase/firestore";

const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data ?? {},
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) => collection(firestore, collectionPath).withConverter(converter<T>());

const db = {
  base_models: query(dataPoint<BaseModel>("base_models"), where("isEnabled", "==", true), limit(10)),
  models: (taskType: TaskTypeEnum) => {
    return query(
      dataPoint<ModelDto>("models"),
      where("is_enabled", "==", true),
      where("taskType", "==", taskType),
      limit(10)
    );
  },
  models_by_base_model: (baseModelId: string) => query(dataPoint<Model>("models"), where("baseModel", "==", baseModelId)),
  base_model: (id: string) => doc(dataPoint<BaseModel>("base_models"), id),
  model: (id: string) => doc(dataPoint<Model>("models"), id),
  user_model_selection: (userId: string, modelId: string, taskType: TaskTypeEnum) => {
    return query(
      dataPoint<ModelDto>("user_model_selection"),
      where("userId", "==", userId),
      where("taskType", "==", taskType),
      where("generatedModelsPair", "array-contains", modelId),
      limit(1),
    )
  },
  user_model_selection_collection: dataPoint<UserModelSelection>("user_model_selection"),
  create_base_model: (data: Partial<BaseModel>) => addDoc(dataPoint<BaseModel>("base_models"), data),
  create_model: (data: Partial<ModelDto>) => addDoc(dataPoint<ModelDto>("models"), data),
  create_task_example: (data: Partial<TaskExample>) => addDoc(dataPoint<TaskExample>("task_examples"), data),
  task_examples: (taskType: TaskTypeEnum) => {
    return query(
      dataPoint<TaskExample>("task_examples"),
      where("taskType", "==", taskType),
      limit(10)
    );
  },
};

export { db };
