import { CONFIG } from "@/config";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(CONFIG.HF_API_TOKEN);

export const generate = async (modelName: string, input: string) => {
  const stream = inference.textGeneration({
    model: modelName,
    inputs: input,
    temperature: 0.8,
  }, {
    wait_for_model: true,
  });

  return stream;
};

export const generateStream = async (modelName: string, input: string) => {
  const stream = inference.textGenerationStream({
    model: modelName,
    inputs: input,
  }, {
    wait_for_model: true,
  });

  return stream;
};

export async function summarize(modelName: string, input: string) {
  const stream = inference.summarization({
    model: modelName,
    inputs: input,
    parameters: {
      temperature: 0.5,
    }
  }, {
    wait_for_model: true,
  });

  return stream;
}

export async function textClassification(modelName: string, input: string) {
  const options = {
    model: modelName,
    inputs: input,
  };

  const response = await inference.textClassification(options, {
    wait_for_model: true,
  });

  return response;
}

export async function tokenClassification(modelName: string, input: string) {
  const response = await inference.tokenClassification({
    model: modelName,
    inputs: input,
  }, {
    wait_for_model: true,
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
  }, {
    wait_for_model: true,
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
    }
  }, {
    wait_for_model: true,
  });

  return response;
}
