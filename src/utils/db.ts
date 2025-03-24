import { TaskTypeEnum } from "@/constants/taskTypes";
import { firestore } from "@/providers/firebase";
import { Model, UserModelSelection } from "@/types";
import { addDoc, collection, doc, limit, PartialWithFieldValue, query, QueryDocumentSnapshot, where } from "firebase/firestore";

const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data ?? {},
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) => collection(firestore, collectionPath).withConverter(converter<T>());

const db = {
  models: query(dataPoint<Model>("models"), where("is_enabled", "==", true), limit(10)),
  model: (id: string) => doc(dataPoint<Model>("models"), id),
  user_model_selection: (userId: string, modelId: string, taskType: TaskTypeEnum) => {
    return query(
      dataPoint<Model>("user_model_selection"),
      where("userId", "==", userId),
      where("taskType", "==", taskType),
      where("generatedModelsPair", "array-contains", modelId),
      limit(1),
    )
  },
  user_model_selection_collection: dataPoint<UserModelSelection>("user_model_selection"),
  create_model: (data: PartialWithFieldValue<Model>) => addDoc(dataPoint<Model>("models"), data),
};

export { db };
