import { SendHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import useTask from "@/hooks/useTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Model } from "@/types";
import { TaskTypeEnum } from "../../constants/taskTypes";
import { useChatsStore } from "@/store/chat";
import { showNotification } from "@/utils/showNotification";
import { Textarea } from "../ui/textarea";

const formSchema = (selectedTask: TaskTypeEnum) => z.object({
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

type SendMessageFormProps = {
  models: Model[];
  selectedTask: TaskTypeEnum;
  isVoted: boolean;
};

type FormType = z.infer<ReturnType<typeof formSchema>>;

const SendMessageForm = ({ models, selectedTask, isVoted }: SendMessageFormProps) => {
  const { getModelAnswer, isFetching } = useTask();
  const addMessage = useChatsStore((state) => state.addMessage);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema(selectedTask)),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    console.log('Form values:', values);
    console.log('Selected models:', models);

    models.forEach((model, index) => {
      const chatType = (index + 1) as 1 | 2;
      addMessage(values.message, "user", chatType, true);
    });

    const modelPromises = models.map(async (model, index) => {
      const chatType = (index + 1) as 1 | 2;

      try {
        addMessage("", "user", chatType, true);
        await getModelAnswer(model, selectedTask, values.message, chatType, values.context);
      } catch (error) {
        showNotification("submission-error", "Failed to get response from model", "error");
      }
    });

    await Promise.allSettled(modelPromises);

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-4'>
        {selectedTask === TaskTypeEnum.Question_Answering && (
          <FormField
            control={form.control}
            name="context"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Place your question context here!"
                    className='border-border-input mb-4'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-left text-red-600' />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name='message'
          disabled={isVoted || isFetching}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <div className='flex items-center gap-8'>
                  <Input className='border-border-input' placeholder='Type your question here!' {...field} />
                  <Button type='submit' disabled={isVoted || isFetching}>
                    <SendHorizontalIcon />
                  </Button>
                </div>
              </FormControl>
              <FormMessage className='text-left text-red-600' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SendMessageForm;
