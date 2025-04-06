import { generate, questionAnswering, summarize, textClassification, tokenClassification, zeroShotClassification } from "@/api/hugging-face";
import { sentimentAnalysisResponseLabels } from "@/constants/models";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { useChatsStore } from "@/store/chat";
import { formatEntitiesInText } from "@/utils/formatEntities";
import { showNotification } from "@/utils/showNotification";

export const useStreamTextGeneration = () => {
  const addMessage = useChatsStore((state) => state.addMessage);

  async function streamTextGeneration(taskType: TaskTypeEnum, input: string, model: string, chatType: 1 | 2, context?: string) {
    try {
      switch (taskType) {
        case TaskTypeEnum.Generation: {
          const stream = await generate(model, input);

          if ("summary_text" in stream) {
            addMessage(stream.summary_text as string, "model", chatType);
          } else {
            addMessage(stream.generated_text, "model", chatType);
          }

          break;
        }
        case TaskTypeEnum.Sentiment_Analysis: {
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
        case TaskTypeEnum.Named_Entity_Recognition: {
          const result = await tokenClassification(model, input);
          const formattedMessage = formatEntitiesInText(input, result);

          addMessage(formattedMessage, "model", chatType);

          break;
        }
        case TaskTypeEnum.Summarization: {
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
          showNotification("bad-task-type", `Error: Not supported task type!`, "error");
          break;
      }
    } catch (error) {
      showNotification("model-response-error", `Error: ${error}`, "error");
    }
  }

  return {
    streamTextGeneration,
  };
};
