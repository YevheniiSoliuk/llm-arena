import { useEffect, useState } from "react";
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
import { Guide } from "@/components/Guide";
import { cn } from "@/lib/utils";
import { useTour } from "@reactour/tour";
import { compareSteps } from "@/constants/tourSteps";
import { useTaskStore } from "@/store/tasks";
import "../../App.css";
import { useTaskExamplesStore } from "@/store/examples";
import { useFormContext } from "react-hook-form";

const Compare = () => {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isVoted, setIsVoted] = useState(false);

  const task = useTaskStore((state) => state.task);
  const setTask = useTaskStore((state) => state.setTask);
  const exampleId = useTaskExamplesStore((state) => state.exampleId);
  const setExampleId = useTaskExamplesStore((state) => state.setExampleId);
  const chat1Content = useChatsStore((state) => state.chat1Content);
  const chat2Content = useChatsStore((state) => state.chat2Content);

  const { setSteps, setCurrentStep } = useTour();
  const { data: models, isLoading } = useGetModels(task, true);

  const form = useFormContext();

  useEffect(() => {
    const guideStepFromLs = localStorage.getItem("compare-guide-step");
    const step = guideStepFromLs ? JSON.parse(guideStepFromLs) : 0;
    setSteps?.(compareSteps);
    setCurrentStep(step);
  }, [])

  const handleTaskSelection = (selectedTask: TaskTypeEnum) => {
    setTimeout(() => {
      setTask(selectedTask);
      setExampleId(undefined);
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
    <div className='w-full px-4 py-2 mt-3'>
      <Guide />
      <div className='w-full my-4 flex flex-wrap items-center justify-center gap-4'>
        <TaskSelect defaultValue={task} selectTask={handleTaskSelection} />
        <TaskExamplesSelect selectedExample={exampleId} selectExample={setExampleId} taskType={task} />
      </div>
      <div className={cn('compare-step-3', 'compare-step-6', 'compare-step-7', 'flex flex-wrap sm:flex-nowrap min-w-full h-full sm:max-xl:h-[57dvh] items-center gap-4')}>
        <Chat name={isVoted ? `Model A: ${models[0].name}` : "Model A"} chatContent={chat1Content} />
        <Chat name={isVoted ? `Model B: ${models[1].name}` : "Model B"} chatContent={chat2Content} />
      </div>
      <SendMessageForm
        models={models as Model[]}
        selectedTask={task}
        selectedExample={exampleId}
        isVoted={isVoted}
      />
      {!isVoted ? (
        <RateButtons setDecision={setDecision} setIsVoted={setIsVoted} />
      ) : (
        <ActionButtons
          models={(models as Model[]).map((model, index) => ({
            model,
            type: index === 0 ? "model_a" : "model_b",
          }))}
          selectedTask={task}
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
