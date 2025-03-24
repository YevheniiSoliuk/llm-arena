import { CONFIG } from "@/config";
// import { HUGGING_FASE_API } from "./api";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(CONFIG.HF_API_TOKEN);

type GenerationRequest = {
  inputs: string;
  parameters: {
    adapter_id: string;
    best_of: number;
    decoder_input_details: boolean;
    details: boolean;
    do_sample: boolean;
    frequency_penalty: number;
    grammar:
      | {
          type: "json";
          value: unknown;
        }
      | {
          type: "regex";
          value: string;
        };
    max_new_tokens: number;
    repetition_penalty: number;
    return_full_text: boolean;
    seed: number;
    stop: string[];
    temperature: number;
    top_k: number;
    top_n_tokens: number;
    top_p: number;
    truncate: number;
    typical_p: number;
    watermark: boolean;
  };
  stream: boolean;
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

// export const paraphrase = async (modelName: string, input: string) => {
//   const stream = inference.textGenerationStream({
//     model: modelName,
//     inputs: `paraphrase: ${input}`,
//     //max_new_tokens: 250,
//     temperature: 0.8,
//   });

//   return stream;
// };

export const generate = async (modelName: string, input: string) => {
  const stream = inference.textGeneration({
    model: modelName,
    inputs: input,
    //max_new_tokens: 250,
    temperature: 0.8,
  });

  return stream;
};

export const generateStream = async (modelName: string, input: string) => {
  const stream = inference.textGenerationStream({
    model: modelName,
    inputs: input,
    //max_new_tokens: 250,
    temperature: 0.8,
  });

  return stream;
};

// export const complete = async (modelName: string, input: string) => {
//   const stream = inference.chatCompletionStream({
//     model: modelName,
//     messages: [
//       {
//         role: "user",
//         content: input,
//       },
//     ],
//     //max_tokens: 250,
//     temperature: 0.8,
//   });

//   return stream;
// };

export async function summarize(modelName: string, input: string) {
  const stream = inference.summarization({
    model: modelName,
    inputs: input,
    parameters: {
      temperature: 0.5,
      max_length: 250,
    }
  });

  return stream;
  // const response = await inference.summarization({
  //   model: modelName,
  //   inputs: input,
  //   parameters: {
  //     max_length: 1000,
  //     min_length: 100,
  //     temperature: 0.3,
  //   },
  // });

  // console.log(response);
  // const words = response.summary_text.split(" ");
  // console.log(words);
  // for (let i = 0; i < words.length; i++) {
  //   console.log(words[i]);
  //   yield {
  //     ...response,
  //     index: i,
  //     summary_text: words.slice(0, i + 1).join(" "),
  //   };

  //   //await new Promise((resolve) => setTimeout(resolve, 100));
  // }
}

// ["deberta", "electra", "xlnet", "t5-base"]
// 503 ["bert"]
export async function textClassification(modelName: string, input: string) {
  const options = {
    model: modelName,
    inputs: input,
  };

  const response = await inference.textClassification(options);

  return response;
}

export async function tokenClassification(modelName: string, input: string) {
  const response = await inference.tokenClassification({
    model: modelName,
    inputs: input,
  });

  return response;
}

export async function zeroShotClassification(modelName: string, input: string) {
  const response = await inference.zeroShotClassification({
    model: modelName,
    inputs: input,
    parameters: {
      candidate_labels: ["positive", "negative"],
    },
  });

  return response;
}

export async function* questionAnsweringStream(modelName: string, input: string, context: string) {
  const response = await inference.questionAnswering({
    model: modelName,
    inputs: {
      context,
      question: input,
    },
  });

  const fullAnswer = response.answer;
  const words = fullAnswer.split(" ");

  for (let i = 0; i < words.length; i++) {
    yield {
      ...response,
      index: i,
      answer: words.slice(0, i + 1).join(" "),
    };

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export async function questionAnswering(modelName: string, input: string, context: string) {
  const response = await inference.questionAnswering({
    model: modelName,
    inputs: {
      context,
      question: input,
    },
  });

  return response;
}
