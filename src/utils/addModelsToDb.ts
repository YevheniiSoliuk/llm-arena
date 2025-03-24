import { Model, ScoreByTask } from "@/types";
import { db } from "@/utils/db";

const qaModels = [
  {
    name: "google-bert/bert-large-uncased-whole-word-masking-finetuned-squad",
    producent: "Google",
  },
  {
    name: "sjrhuschlee/flan-t5-base-squad2",
    producent: "Google",
  },
  {
    name: "deepset/roberta-large-squad2",
    producent: "Microsoft",
  },
  {
    name: "phiyodr/bart-large-finetuned-squad2",
    producent: "Facebook",
  },
  {
    name: "ahotrod/electra_large_discriminator_squad2_512",
    producent: "Google",
  },
  {
    name: "ggoggam/xlnet-base-squadv2",
    producent: "Xlnet",
  },
] as Partial<Model>[];

const taskScores = [
  {
    name: "completion",
    score: 0,
  },
  {
    name: "generation",
    score: 0,
  },
  {
    name: "translation",
    score: 0,
  },
  {
    name: "question-answering",
    score: 0,
  },
  {
    name: "paraphrasing",
    score: 0,
  },
] as ScoreByTask[];

export const addModelsToDb = async () => {
  for (const model of qaModels) {
    await db.create_model({
      ...model,
      scoreByTask: taskScores,
    });
  }
}
