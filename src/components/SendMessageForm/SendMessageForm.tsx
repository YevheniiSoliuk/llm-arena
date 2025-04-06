import { useEffect, useState } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import useTask from "@/hooks/useTask";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { useChatsStore } from "@/store/chat";
import { useTaskExamplesStore } from "@/store/examples";
import { Model } from "@/types";
import { TaskTypeEnum } from "../../constants/taskTypes";
import { showNotification } from "@/utils/showNotification";
import { FormType } from "./config";

type SendMessageFormProps = {
  form: UseFormReturn<{
    message: string;
    context?: string | undefined;
  }, unknown, undefined>;
  models: Model[];
  selectedTask: TaskTypeEnum;
  selectedExample?: string;
  isVoted: boolean;
};

type ChatType = 1 | 2;

const SendMessageForm = ({ form, models, selectedTask, selectedExample, isVoted }: SendMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getModelAnswer, isFetching } = useTask();
  const addMessage = useChatsStore((state) => state.addMessage);
  const example = useTaskExamplesStore((state) => state.getExampleById(selectedExample));

  useEffect(() => {
    if (!example) return;

    setTimeout(() => {
      if (example.content.context) {
        form.setValue("context", example.content.context);
      }

      form.setValue("message", example.content.message);
    }, 0)
  }, [example]);

  const onSubmit = async (values: FormType) => {
    models.forEach((_, index) => {
      const chatType = (index + 1) as ChatType;
      addMessage(values.message, "user", chatType, true);
    });

    try {
      setIsLoading(true);

      const modelPromises = models.map(async (model, index) => {
        const chatType = (index + 1) as ChatType;
        addMessage("loading", "model", chatType, true);
        await getModelAnswer(model, selectedTask, values.message, chatType, values.context);
      });

      await Promise.allSettled(modelPromises);
    } catch (error) {
      showNotification("submission-error", "Failed to get response from model", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-4'>
        {selectedTask === TaskTypeEnum.Question_Answering && (
          <FormField
            control={form.control}
            name="context"
            disabled={isVoted || isFetching || isLoading}
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
          disabled={isVoted || isFetching || isLoading}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <div className='flex items-center gap-8'>
                  <Input className='border-border-input' placeholder='Type your question here!' {...field} />
                  <Button type='submit' disabled={isVoted || isFetching || isLoading}>
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
