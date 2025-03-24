import { useState } from "react";
import { TaskTypeEnum } from "@/constants/taskTypes";
import TaskSelect from "@/components/TaskSelect";
import Chat from "@/components/Chat";
import RateButtons from "@/components/RateButtons";
import "../../App.css";
import ActionButtons from "@/components/ActionButtons";
import { Decision } from "@/types";
import SendMessageForm from "@/components/SendMessageForm";
import { useChatsStore } from "@/store/chat";
import useGetModels from "@/hooks/useGetModels";

const Compare = () => {
  const [selectedTask, setSelectedTask] = useState<TaskTypeEnum>(TaskTypeEnum.Paraphrase);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isVoted, setIsVoted] = useState(false);

  const chat1Content = useChatsStore((state) => state.chat1Content);
  const chat2Content = useChatsStore((state) => state.chat2Content);

  const { data: models } = useGetModels(selectedTask, true);
  if (!models) {
    return <p>No models</p>;
  }

  console.log(chat1Content);
  console.log(chat2Content);

  return (
    <div className='w-full px-4 py-2'>
      <div className='my-4 flex w-full items-center justify-center'>
        <TaskSelect defaultValue={selectedTask} selectTask={setSelectedTask} />
      </div>
      <div className='flex min-w-full items-center gap-4'>
        <Chat name={isVoted ? `Model A: ${models[0].name}` : "Model A"} chatContent={chat1Content} />
        <Chat name={isVoted ? `Model B: ${models[1].name}` : "Model B"} chatContent={chat2Content} />
      </div>
      <SendMessageForm models={models} selectedTask={selectedTask} isVoted={isVoted} />
      {!isVoted ? (
        <RateButtons setDecision={setDecision} setIsVoted={setIsVoted} />
      ) : (
        <ActionButtons
          models={models.map((model, index) => ({
            model,
            type: index === 0 ? "model_a" : "model_b",
          }))}
          selectedTask={selectedTask}
          decision={decision}
          setIsVoted={setIsVoted}
          lastMessageToChat1={chat1Content[chat1Content.length - 2]?.message}
          lastMessageToChat2={chat2Content[chat2Content.length - 2]?.message}
        />
      )}
    </div>
  );
};

export default Compare;
