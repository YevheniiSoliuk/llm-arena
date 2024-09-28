import { HfInference, SummarizationArgs, TranslationArgs } from "@huggingface/inference";
import { TaskTypeEnum } from "@/components/TaskSelect/constants";
import { Model } from "@/types";

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);

const useTask = () => {
  const translateText = (model: string, question: string) => {
    return (async () => {
      // model: "facebook/mbart-large-50-many-to-many-mmt",
      const textTranslationResponse = await hf.translation({
        model: model,
        inputs: question,
        parameters: {
          src_lang: "pl_PL",
          tgt_lang: "en_XX",
        },
      } as TranslationArgs);

      return textTranslationResponse.translation_text;
    })();
  };

  const generateText = (model: string, question: string) => {
    return (async () => {
      const textGenerateResponse = await hf.textGeneration({
        // model: "HuggingFaceH4/zephyr-7b-beta",
        model: model,
        inputs: question,
        parameters: {
          max_new_tokens: 200,
          num_return_sequences: 2,
        },
      } as TranslationArgs);

      return textGenerateResponse.generated_text;
    })();
  };

  const summarizeText = (model: string, question: string) => {
    return (async () => {
      const textSummarizeResponse = await hf.summarization({
        // model: "facebook/bart-large-cnn",
        model: model,
        inputs: question,
        parameters: {
          max_new_tokens: 200,
          num_return_sequences: 2,
        },
      } as SummarizationArgs);

      return textSummarizeResponse.summary_text;
    })();
  };

  const getModelAnswer = async (model: Model, task: TaskTypeEnum, question: string) => {
    console.log(question);
    switch (task) {
      case TaskTypeEnum.Generate:
        return await generateText(model.name, question);
      case TaskTypeEnum.Translate:
        console.log(question);
        return await translateText(model.name, question);
      case TaskTypeEnum.Summarize:
        return await summarizeText(model.name, question);
      default:
        return await Promise.resolve("Unsupported task");
    }
  };

  return {
    getModelAnswer,
  };
};

export default useTask;
