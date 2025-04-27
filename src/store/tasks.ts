import { create } from "zustand";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { unstable_batchedUpdates } from "react-dom";

interface ITaskStore {
  task: TaskTypeEnum;
  setTask: (task: TaskTypeEnum) => void;
}

export const useTaskStore = create<ITaskStore>((set) => ({
  task: TaskTypeEnum.Sentiment_Analysis,
  setTask: (task) => set(() => ({ task })),
}));

export const outsideComponentSetTask = (task: TaskTypeEnum) => {
  unstable_batchedUpdates(() => {
    useTaskStore.getState().setTask(task);
  })
};
