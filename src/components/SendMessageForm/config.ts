import { z } from "zod";
import { TaskTypeEnum } from "@/constants/taskTypes";

export const formSchema = (selectedTask: TaskTypeEnum) => z.object({
  context: z.string().min(10, {
    message: "Context must be at least 10 characters.",
  }).optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
}).refine((data) => {
  if (selectedTask === TaskTypeEnum.Question_Answering) {
    return data.context !== undefined && data.context.trim() !== "";
  }
  return true;
}, {
  message: "Context is required",
  path: ["context"],
})

export type FormType = z.infer<ReturnType<typeof formSchema>>;