export enum TaskTypeEnum {
  Paraphrase = "paraphrasing",
  Generate = "generation",
  Complete = "completion",
  Translate = "translation",
  Question_Answering = "question-answering",
}

export const inputByTaskType = {
  [TaskTypeEnum.Complete]: "complete",
  [TaskTypeEnum.Generate]: "generate",
  [TaskTypeEnum.Paraphrase]: "paraphrase",
  [TaskTypeEnum.Question_Answering]: "answer the question",
  [TaskTypeEnum.Translate]: "translate",
};
