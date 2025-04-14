import { useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Message from "./Message";
import { ChatContent } from "./types";

type ChatProps = {
  name: string;
  chatContent: ChatContent[];
};

const Chat = ({ name, chatContent }: ChatProps) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const namePart1 = name.split(": ")[0];
  const namePart2 = name.split(": ")[1];

  return (
    <div className='w-full sm:max-xl:h-full'>
      <div className='relative sm:max-xl:h-full'>
        <div className='absolute left-0 top-0 z-10 rounded-ee-lg rounded-ss-lg border-[1px] border-primary shadow-[2px_2px_15px_rgba(0,0,0,0.5)] bg-background px-4 py-3 text-xs text-primary'>
          <span>
            {namePart1}
            {namePart2 ? ": " : ""}
          </span>
          <span className='font-semibold'>{namePart2}</span>
        </div>
        <ScrollArea
          ref={scrollAreaRef}
          className='sm:max-xl:h-full h-[500px] border-px-4 rounded-md border-[1px] border-primary bg-primary'
          chatContent={chatContent}
        >
          {chatContent.map((cc, index) => (
            <div
              key={index}
              className={`flex w-full flex-col px-2 ${cc.sender === "user" ? "items-end" : "items-start"}`}
            >
              <Message content={cc.message} sender={cc.sender} />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Chat;
