import { Dispatch, SetStateAction, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Message from "./Message";
import { SendHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChatContent } from "./types";
import useTask from "@/hooks/useTask";
import { TaskTypeEnum } from "../TaskSelect/constants";
import { Model } from "@/types";

const formSchema = z.object({
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ChatProps = {
  name: string;
  selectedTask: TaskTypeEnum;
  model: Model;
  chatContent: ChatContent[];
  setChatContent: Dispatch<SetStateAction<ChatContent[]>>;
};

const Chat = ({ name, selectedTask, model, chatContent, setChatContent }: ChatProps) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { getModelAnswer } = useTask();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setChatContent((prevChatContent) => [
      ...prevChatContent,
      {
        sender: "user",
        message: values.message,
      },
    ]);

    form.reset();

    setTimeout(async () => {
      const result = await getModelAnswer(model, selectedTask, values.message);
      console.log("Result", result);
      setChatContent((prevChatContent) => [
        ...prevChatContent,
        {
          sender: "model",
          message: result,
        },
      ]);

      scrollAreaRef.current?.scrollTo({
        top: scrollAreaRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <div className='absolute left-0 top-0 z-10 rounded-ee-lg rounded-ss-lg border-[1px] border-primary bg-background px-4 py-3 text-primary'>
          {name}
        </div>
        <ScrollArea
          ref={scrollAreaRef}
          className='border-px-4 h-[500px] rounded-md border-[1px] border-primary bg-primary'
        >
          {chatContent.map((cc, index) => (
            <div key={index} className={`flex w-full flex-col ${cc.sender === "user" ? "items-end" : "items-start"}`}>
              <Message content={cc.message} />
            </div>
          ))}
        </ScrollArea>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='my-4'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex items-center gap-8'>
                    <Input className='border-border-input' placeholder='Type your question here!' {...field} />
                    <Button type='submit'>
                      <SendHorizontalIcon />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className='text-red-600' />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Chat;
