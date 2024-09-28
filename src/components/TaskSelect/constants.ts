export enum TaskTypeEnum {
  Translate = "translation",
  Generate = "generation",
  Summarize = "summarization",
}

export const tasks = [
  {
    name: "Translate",
    value: TaskTypeEnum.Translate,
  },
  {
    name: "Summarize",
    value: TaskTypeEnum.Summarize,
  },
  {
    name: "Generate",
    value: TaskTypeEnum.Generate,
  },
];
