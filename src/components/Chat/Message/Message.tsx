import { convertMarkdownEntitiesToHTML } from "@/utils/convertMarkdownEntitiesToHTML";
import { Sender } from "../types";
import { useEffect, useRef } from "react";

type MessageProps = {
  sender: Sender;
  content: string;
};

const Message = ({ content, sender }: MessageProps) => {
  const msgRef = useRef<HTMLParagraphElement | null>(null);
  const isNerTaskContent = content.includes("NER:");
  const isLoadingContent = content.includes("loading");

  useEffect(() => {
    if (!msgRef.current) return;

    if (sender === "user") {
      msgRef.current.innerHTML = content;
      return;
    }

    if (isLoadingContent) {
      return;
    }

    if (isNerTaskContent) {
      const formattedParagraph = convertMarkdownEntitiesToHTML(content.split("NER:")[1]);

      msgRef.current.innerHTML = formattedParagraph;
      return;
    }

    msgRef.current.innerHTML = content;
  }, [sender, content, isNerTaskContent, isLoadingContent]);

  return (
    <div
      className={`my-2 max-w-[70%] rounded-xl ${sender === "user" ? "rounded-ee-none" : "rounded-es-none"} bg-background px-3 py-2 text-primary`}
    >
      <p ref={msgRef} className={`text-start text-base/7`}>
        {isLoadingContent && (
          <span className='inline-block text-justify'>
            <span className='inline-block h-4 w-2 animate-fadeInOut bg-foreground'></span>
          </span>
        )}
      </p>
    </div>
  );
};

export default Message;
