import { EXAMPLES_BY_TASK_TYPE } from "@/components/ExamplesSelect/constants";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { db } from "./db";
import { TaskExample } from "@/types";

export const addTaskExamplesToDb = async () => {
  for (const taskType of Object.values(TaskTypeEnum)) {
    const examplesContent = EXAMPLES_BY_TASK_TYPE[taskType];
    const examples = examplesContent.map((example, index) => ({
      id: `${taskType}_${index}`,
      name: `Example ${index + 1}`,
      taskType,
      content: { ...example },
    }) as TaskExample);

    for (const example of examples) {
      await db.create_task_example(example);
    }
  }
}