import { BaseModel, ModelDto } from "@/types";
import { TaskTypeEnum } from "./taskTypes";

export const baseModels = [
  {
    name: "bert",
    producent: "Google",
  },
  {
    name: "flan-t5",
    producent: "Google",
  },
  {
    name: "roberta",
    producent: "Meta",
  },
  {
    name: "deberta",
    producent: "Microsoft",
  },
  {
    name: "bart",
    producent: "Meta",
  },
  {
    name: "electra",
    producent: "Google",
  },
  {
    name: "xlnet",
    producent: "Xlnet",
  }
] as Partial<BaseModel>[];

export const saModels = [
  {
    name: "textattack/bert-base-uncased-MNLI",
    producent: "Google",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
  {
    name: "FacebookAI/roberta-large-mnli",
    producent: "Meta",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
  {
    name: "microsoft/deberta-large-mnli",
    producent: "Microsoft",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
  {
    name: "facebook/bart-large-mnli",
    producent: "Meta",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
  {
    name: "howey/electra-base-mnli",
    producent: "Google",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
  {
    name: "textattack/xlnet-base-cased-MNLI",
    producent: "Xlnet",
    taskType: TaskTypeEnum.Sentiment_Analysis,
  },
] as Partial<ModelDto>[];

export const qaModels = [
  {
    name: "google-bert/bert-large-uncased-whole-word-masking-finetuned-squad",
    producent: "Google",
    taskType: TaskTypeEnum.Question_Answering,
  },
  {
    name: "sjrhuschlee/flan-t5-base-squad2",
    producent: "Google",
    taskType: TaskTypeEnum.Question_Answering,
  },
  {
    name: "deepset/roberta-large-squad2",
    producent: "Microsoft",
    taskType: TaskTypeEnum.Question_Answering,
  },
  {
    name: "phiyodr/bart-large-finetuned-squad2",
    producent: "Facebook",
    taskType: TaskTypeEnum.Question_Answering,
  },
  {
    name: "ahotrod/electra_large_discriminator_squad2_512",
    producent: "Google",
    taskType: TaskTypeEnum.Question_Answering,
  },
  {
    name: "ggoggam/xlnet-base-squadv2",
    producent: "Xlnet",
    taskType: TaskTypeEnum.Question_Answering,
  },
] as Partial<ModelDto>[];

export const nerModels = [
  {
    name: "bert-base-NER",
    producent: "Google",
    taskType: TaskTypeEnum.Named_Entity_Recognition,
  },
  // {
  //   name: "flan-t5-base-conll03-ner",
  //   producent: "Google",
  // },
  // {
  //   name: "roberta-large-ner-english",
  //   producent: "Microsoft",
  // },
  {
    name: "deberta-v3-base-finetuned-ner",
    producent: "Microsoft",
    taskType: TaskTypeEnum.Named_Entity_Recognition,
  },
  {
    name: "electra-large-NER",
    producent: "Google",
    taskType: TaskTypeEnum.Named_Entity_Recognition,
  },
  {
    name: "xlnet-lg-cased-ms-ner-test",
    producent: "Xlnet",
    taskType: TaskTypeEnum.Named_Entity_Recognition,
  }
] as Partial<ModelDto>[];

export const summModels = [
  {
    name: "patrickvonplaten/bert2bert_cnn_daily_mail",
    producent: "Google",
    taskType: TaskTypeEnum.Summarization,
  },
  {
    name: "flax-community/t5-base-cnn-dm",
    producent: "Google",
    taskType: TaskTypeEnum.Summarization,
  },
  {
    name: "google/roberta2roberta_L-24_cnn_daily_mail",
    producent: "Google",
    taskType: TaskTypeEnum.Summarization,
  },
  {
    name: "facebook/bart-large-cnn",
    producent: "Meta",
    taskType: TaskTypeEnum.Summarization,
  }
] as Partial<ModelDto>[];

export const genModels = [
  {
    name: "google/flan-t5-base",
    producent: "Google",
    taskType: TaskTypeEnum.Generation,
  },
  {
    name: "GItaf/roberta-base-finetuned-mbti-0901",
    producent: "Microsoft",
    taskType: TaskTypeEnum.Generation,
  },
  // {
  //   name: "ltg/deberta-xxlarge-fixed",
  //   producent: "Microsoft",
  // },
  {
    name: "dtejasaipraveen/bart-large-finetuned",
    producent: "Google",
    taskType: TaskTypeEnum.Generation,
  },
  // {
  //   name: "smeoni/nbme-electra-large-generator",
  //   producent: "Google",
  // },
  // {
  //   name: "xlnet/xlnet-base-cased",
  //   producent: "Xlnet",
  // },
] as Partial<ModelDto>[];

export const modelsByTaskType = {
  [TaskTypeEnum.Generation]: genModels,
  [TaskTypeEnum.Named_Entity_Recognition]: nerModels,
  [TaskTypeEnum.Question_Answering]: qaModels,
  [TaskTypeEnum.Sentiment_Analysis]: saModels,
  [TaskTypeEnum.Summarization]: summModels,
};

export const sentimentAnalysisResponseLabels = {
  ["ENTAILMENT"]: "positive",
  ["NEUTRAL"]: "neutral",
  ["CONTRADICTION"]: "negative",
  ["LABEL_0"]: "negative",
  ["LABEL_1"]: "positive",
  ["LABEL_2"]: "neutral",
};
