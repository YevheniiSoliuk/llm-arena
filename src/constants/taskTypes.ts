export enum TaskTypeEnum {
  Sentiment_Analysis = "sentiment-analysis",
  Question_Answering = "question-answering",
  Named_Entity_Recognition = "named-entity-recognition",
  Summarization = "summarization",
  Generation = "generation",
}

export const inputByTaskType = {
  [TaskTypeEnum.Sentiment_Analysis]: "analyse sentiment",
  [TaskTypeEnum.Question_Answering]: "answer the question",
  [TaskTypeEnum.Named_Entity_Recognition]: "recognize named entity",
  [TaskTypeEnum.Summarization]: "summarize",
  [TaskTypeEnum.Generation]: "generate",
};
