import { TaskTypeEnum } from "@/constants/taskTypes";
import { Model } from "@/types";
import { useState } from "react";
import { useStreamTextGeneration } from "./useStreamTextGeneration";

const useTask = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { streamTextGeneration } = useStreamTextGeneration();

  const getModelAnswer = async (model: Model, task: TaskTypeEnum, question: string, chatType: 1 | 2, context?: string) => {
    setIsFetching(true);

    const result = await streamTextGeneration(task, question, model.name, chatType, context);

    setIsFetching(false);

    return result;
  };

  return {
    getModelAnswer,
    isFetching,
  };
};

export default useTask;
