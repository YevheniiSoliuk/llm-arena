import { create } from "zustand";
import { TaskExample } from "@/types";

interface IExamplesStore {
  examples: TaskExample[];
  setExamples: (exmaples: TaskExample[]) => void;
  getExampleById: (id?: string) => TaskExample | undefined;
}

export const useTaskExamplesStore = create<IExamplesStore>((set, get) => ({
  examples: [],
  setExamples: (examples) => set(() => ({ examples })),
  getExampleById: (id) => {
    return get().examples.find(example => example.id === id)
  },
}));
