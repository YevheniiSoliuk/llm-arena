import { generate, generateStream, questionAnswering, summarize, textClassification, tokenClassification, zeroShotClassification } from "@/api/hugging-face";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { useChatsStore } from "@/store/chat";
import { showNotification } from "@/utils/showNotification";

const sentimentAnalysisResponseLabels = {
  ["ENTAILMENT"]: "positive",
  ["NEUTRAL"]: "neutral",
  ["CONTRADICTION"]: "negative",
  ["LABEL_0"]: "negative",
  ["LABEL_1"]: "positive",
  ["LABEL_2"]: "neutral",
};

export const useStreamTextGeneration = () => {
  const addMessage = useChatsStore((state) => state.addMessage);

  async function streamTextGeneration(taskType: TaskTypeEnum, input: string, model: string, chatType: 1 | 2, context?: string) {
    console.log(taskType);
    try {
      switch (taskType) {
        case TaskTypeEnum.Generate: {
          const stream = await generateStream(model, input);

          for await (const r of stream) {
            addMessage(r.token.text, "model", chatType, r.index === 1);
          }
          break;
        }
        case TaskTypeEnum.Paraphrase: {
          if (model.includes("t5")) {
            const result = await generate(model, input);
            addMessage(result.generated_text, "model", chatType);
          } else if (model.includes("bart")) {
            const result = await zeroShotClassification(model, input);
            const selectedLabel = result[0].scores[0] > result[0].scores[1] ? result[0].labels[0] : result[0].labels[1];
            addMessage(selectedLabel, "model", chatType);
          } else {
            const result = await textClassification(model, input);
            const selectedAnswer = result.sort((a, b) => b.score - a.score)[0];
            const label = selectedAnswer.label;
            const formattedLabel = Object.keys(sentimentAnalysisResponseLabels).includes(label)
              ? sentimentAnalysisResponseLabels[selectedAnswer.label as keyof typeof sentimentAnalysisResponseLabels]
              : label;
            addMessage(formattedLabel, "model", chatType);
          }
          break;
        }
        case TaskTypeEnum.Complete: {
          const result = await tokenClassification(model, input);
          console.log(result);
          for (const r of result) {
            addMessage(r.entity_group, "model", chatType);
          }

          break;
        }
        case TaskTypeEnum.Translate: {
          const result = await summarize(model, input);

          addMessage(result.summary_text, "model", chatType);

          break;
        }
        case TaskTypeEnum.Question_Answering: {
          const response = await questionAnswering(model, input, context ?? "");

          addMessage(response.answer, "model", chatType);
          break;
        }
        default:
          console.error("Not supported task type!");
          break;
      }
    } catch (error) {
      showNotification("model-response-error", "Error: Failed to get proper response from model", "error");
    }
  }

  return {
    streamTextGeneration,
  };
};
