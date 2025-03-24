import { TaskTypeEnum } from "@/constants/taskTypes";

export type Model = {
  id: string;
  name: string;
  producent: string;
  scoreByTask: ScoreByTask[];
  totalScore: number;
};

export type ScoreByTask = {
  name: string;
  score: number;
};

export type UserModelSelection = {
  userId: string;
  taskType: TaskTypeEnum;
  generatedModelsPair: [string, string];
}

export type NestedKeys<T, Prefix extends string = ""> = {
  [K in Extract<keyof T, string>]: T[K] extends Array<infer U> // Check if the field is an array
    ? `${Prefix}${K}` | NestedKeys<U, `${Prefix}${K}.`> // Recurse on array's element type
    : T[K] extends object // Check if the field is an object
      ? `${Prefix}${K}` | NestedKeys<T[K], `${Prefix}${K}.`> // Recurse on the object type
      : `${Prefix}${K}`; // Add the field as a leaf
}[Extract<keyof T, string>];

export type Decision = "model_a" | "model_b" | "tie" | "both_bad";

export type ModelWithType = {
  model: Model;
  type: "model_a" | "model_b";
};
