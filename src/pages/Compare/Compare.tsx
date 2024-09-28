import { useState } from "react";
import useGetModels from "@/hooks/useGetModels";
import { TaskTypeEnum } from "@/components/TaskSelect/constants";
import TaskSelect from "@/components/TaskSelect";
import Chat from "@/components/Chat";
import RateButtons from "@/components/RateButtons";
import { ChatContent } from "@/components/Chat/types";
import "../../App.css";

const Compare = () => {
  const [selectedTask, setSelectedTask] = useState<TaskTypeEnum>(TaskTypeEnum.Translate);
  const [chat1Content, setChat1Content] = useState<ChatContent[]>([]);
  const [chat2Content, setChat2Content] = useState<ChatContent[]>([]);

  const { data: models, isFetching, error } = useGetModels();

  if (isFetching) {
    return <p>Fetching models ....</p>;
  }

  if (!models) {
    return <p>No models</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className='w-full px-4'>
        <div className='my-4 flex w-full items-center justify-center'>
          <TaskSelect defaultValue={selectedTask} selectTask={setSelectedTask} />
        </div>
        <div className='flex min-w-full items-center gap-4'>
          <Chat
            name='Model A'
            selectedTask={selectedTask}
            model={models[0]}
            chatContent={chat1Content}
            setChatContent={setChat1Content}
          />
          <Chat
            name='Model B'
            selectedTask={selectedTask}
            model={models[1]}
            chatContent={chat2Content}
            setChatContent={setChat2Content}
          />
        </div>
        <RateButtons
          models={models.map((model, index) => ({
            model,
            type: index === 0 ? "model_a" : "model_b",
          }))}
          selectedTask={selectedTask}
        />
      </div>
    </>
  );
};

export default Compare;
