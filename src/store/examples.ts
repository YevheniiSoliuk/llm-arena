import { create } from "zustand";
import { TaskExample } from "@/types";
import { unstable_batchedUpdates } from "react-dom";

interface IExamplesStore {
  examples: TaskExample[];
  exampleId?: string;
  setExampleId: (exampleId?: string) => void;
  setExamples: (exmaples: TaskExample[]) => void;
  getExampleById: (id?: string) => TaskExample | undefined;
}

export const useTaskExamplesStore = create<IExamplesStore>((set, get) => ({
  examples: [],
  exampleId: undefined,
  setExampleId: (exampleId) => set(() => ({ exampleId })),
  setExamples: (examples) => set(() => ({ examples })),
  getExampleById: (id) => {
    return get().examples.find(example => example.id === id)
  },
}));

export const outsideComponentSetExampleId = (exampleId: string) => {
  unstable_batchedUpdates(() => {
    useTaskExamplesStore.getState().setExampleId(exampleId);
  })
};
