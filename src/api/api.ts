import { getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Model } from "@/types";
import { db } from "@/utils/db";

export const getModelsToComparison = async () => {
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

  return models.sort((a, b) => b.totalScore - a.totalScore);
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
