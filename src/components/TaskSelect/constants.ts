import { TaskTypeEnum } from "@/constants/taskTypes";

export const tasks = Object.entries(TaskTypeEnum).map(([key, value]) => {
  const words = key.split("_");
  const formattedPhrase = words.join(" ");

  return {
    name: formattedPhrase,
    value,
  };
});
