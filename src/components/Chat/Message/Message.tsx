// import { useTypingSimulating } from "@/hooks/useTypingSimulating";
import { Sender } from "../types";
import { useMemo } from "react";

type MessageProps = {
  sender: Sender;
  content: string;
};

const Message = ({ content, sender }: MessageProps) => {
  //const displayedText = useTypingSimulating(content);

  const message = useMemo(() => {
    if (sender === "user") {
      return <p className={"text-start"}>{content}</p>;
    }

    // if (content.length !== content?.length - 1) {
    //   return (
    //     <>
    //       <span className={"inline-block text-justify"}>
    //         {content}
    //         <span className={"inline-block h-4 w-2 animate-fadeInOut bg-foreground"}></span>
    //       </span>
    //     </>
    //   );
    // }

    return <p className={"text-start"}>{content}</p>;
  }, [sender, content]);

  return (
    <div
      className={`my-2 max-w-[70%] rounded-xl ${sender === "user" ? "rounded-ee-none" : "rounded-es-none"} bg-background px-3 py-2 text-primary`}
    >
      {message}
    </div>
  );
};

export default Message;
