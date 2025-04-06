import { TaskTypeEnum } from "@/constants/taskTypes";

export type BaseModel = {
  id: string;
  name: string;
  producent: string;
  totalScore: number;
}

export type ModelDto = {
  id: string;
  name: string;
  producent: string;
  taskType: TaskTypeEnum;
  score: number;
  baseModel: string;
}

export type Model = {
  id: string;
  name: string;
  producent: string;
  taskType: TaskTypeEnum;
  score: number;
  baseModel: BaseModel;
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

export type GenerationDefaultResponse = {
  details: {
    best_of_sequences: {
      finish_reason: "length" | "eos_token" | "stop_sequence";
      generated_text: string;
      generated_tokens: number;
      prefill: {
        id: number;
        logprob: number;
        text: string;
      }[];
      seed: number;
      tokens: {
        id: number;
        logprob: number;
        special: boolean;
        text: string;
      }[];
      top_tokens: {
        id: number;
        logprob: number;
        special: boolean;
        text: string;
      }[];
    };
    finish_reason: "length" | "eos_token" | "stop_sequence";
    generated_tokens: number;
    prefill: {
      id: number;
      logprob: number;
      text: string;
    }[];
    seed: number;
    tokens: {
      id: number;
      logprob: number;
      special: boolean;
      text: string;
    }[];
    top_tokens: {
      id: number;
      logprob: number;
      special: boolean;
      text: string;
    }[];
  };
  generated_text: string;
};

export type GenerationStreamResponse = {
  details: {
    finish_reason: "length" | "eos_token" | "stop_sequence";
    generated_tokens: number;
    input_length: number;
    seed: number;
  };
  generated_text: string;
  index: number;
  token: {
    id: number;
    logprob: number;
    special: boolean;
    text: string;
  };
  top_tokens: {
    id: number;
    logprob: number;
    special: boolean;
    text: string;
  };
};

export type Content = {
  context?: string;
  message: string;
}

export type TaskExample = {
  id: string;
  name: string;
  taskType: TaskTypeEnum;
  content: Content;
};