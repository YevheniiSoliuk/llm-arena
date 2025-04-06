import { useState } from "react";
import { TaskTypeEnum } from "@/constants/taskTypes";
import TaskSelect from "@/components/TaskSelect";
import Chat from "@/components/Chat";
import RateButtons from "@/components/RateButtons";
import ActionButtons from "@/components/ActionButtons";
import { Decision, Model } from "@/types";
import SendMessageForm from "@/components/SendMessageForm";
import { useChatsStore } from "@/store/chat";
import useGetModels from "@/hooks/useGetModels";
import { TaskExamplesSelect } from "@/components/ExamplesSelect";
import Loading from "@/components/common/Loading";
import { FormType, formSchema } from "@/components/SendMessageForm/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "../../App.css";

const Compare = () => {
  const [selectedTask, setSelectedTask] = useState<TaskTypeEnum>(TaskTypeEnum.Sentiment_Analysis);
  const [selectedExampleId, setSelectedExampleId] = useState<string>();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isVoted, setIsVoted] = useState(false);

  const chat1Content = useChatsStore((state) => state.chat1Content);
  const chat2Content = useChatsStore((state) => state.chat2Content);

  const { data: models, isLoading } = useGetModels(selectedTask, true);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema(selectedTask)),
    defaultValues: {
      message: "",
    },
  });

  const handleTaskSelection = (selectedTask: TaskTypeEnum) => {
    setTimeout(() => {
      setSelectedTask(selectedTask);
      setSelectedExampleId("");
      form.reset();
    }, 0);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <Loading styles={{ height: "400px", minHeight: 'unset', width: "100%" }} />
      </div>
    );
  }

  if (!models) {
    return <p>No models</p>;
  }

  return (
    <div className='w-full px-4 py-2'>
      <div className='my-4 flex w-full items-center justify-center gap-4'>
        <TaskSelect defaultValue={selectedTask} selectTask={handleTaskSelection} />
        <TaskExamplesSelect selectedExample={selectedExampleId} selectExample={setSelectedExampleId} taskType={selectedTask} />
      </div>
      <div className='flex min-w-full items-center gap-4'>
        <Chat name={isVoted ? `Model A: ${models[0].name}` : "Model A"} chatContent={chat1Content} />
        <Chat name={isVoted ? `Model B: ${models[1].name}` : "Model B"} chatContent={chat2Content} />
      </div>
      <SendMessageForm
        form={form}
        models={models as Model[]}
        selectedTask={selectedTask}
        selectedExample={selectedExampleId}
        isVoted={isVoted}
      />
      {!isVoted ? (
        <RateButtons setDecision={setDecision} setIsVoted={setIsVoted} />
      ) : (
        <ActionButtons
          form={form}
          models={(models as Model[]).map((model, index) => ({
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
