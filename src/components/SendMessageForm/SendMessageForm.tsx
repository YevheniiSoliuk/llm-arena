import { useEffect, useRef, useState } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { useTour } from "@reactour/tour";

type SendMessageFormProps = {
  models: Model[];
  selectedTask: TaskTypeEnum;
  selectedExample?: string;
  isVoted: boolean;
};

type ChatType = 1 | 2;

const SendMessageForm = ({ models, selectedTask, selectedExample, isVoted }: SendMessageFormProps) => {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = useTour();
  const { getModelAnswer, isFetching } = useTask();
  const addMessage = useChatsStore((state) => state.addMessage);
  const example = useTaskExamplesStore((state) => state.getExampleById(selectedExample));
  const form = useFormContext<FormType>();

  useEffect(() => {
    form.setValue("message", form.getValues("message") || "");
    if (selectedTask === TaskTypeEnum.Question_Answering) {
      form.setValue("context", form.getValues("context") || "");
    }
  }, [form, selectedTask]);

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

  const handleSendButtonClick = () => {
    if (isOpen && sendButtonRef.current) {
      sendButtonRef.current.dataset.clickedInTour = "true";
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('compare-step-4', 'my-4')}>
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
                    value={field.value || ""}
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
                  <Input
                    className='border-border-input'
                    placeholder='Type your question here!'
                    {...field}
                    value={field.value || ""}
                  />
                  <Button
                    ref={sendButtonRef}
                    id="send-button"
                    className={"compare-step-5"}
                    type='submit'
                    disabled={isVoted || isFetching || isLoading}
                    onClick={handleSendButtonClick}
                  >
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
