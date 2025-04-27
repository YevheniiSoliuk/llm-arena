import { Button } from "../ui/button";
import { Repeat2Icon, DicesIcon, Undo2Icon } from "lucide-react";
import useVote from "@/hooks/useVote";
import { Decision, ModelWithType } from "@/types";
import { TaskTypeEnum } from "@/constants/taskTypes";
import useTask from "@/hooks/useTask";
import { useChatsStore } from "@/store/chat";
import { useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type ActionButtonsProps = {
  models: ModelWithType[];
  selectedTask: TaskTypeEnum;
  decision: Decision | null;
  lastMessageToChat1: string;
  lastMessageToChat2: string;
  setIsVoted: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionButtons = ({
  models,
  selectedTask,
  decision,
  setIsVoted,
  lastMessageToChat1,
  lastMessageToChat2,
}: ActionButtonsProps) => {
  const queryClient = useQueryClient();
  const deleteLastMessageFromChats = useChatsStore((state) => state.deleteLastMessageFromChats);
  const clearChats = useChatsStore((state) => state.clearChats);
  const form = useFormContext();
  const { getModelAnswer } = useTask();
  const { vote } = useVote({
    models,
    selectedTask,
    decision: decision,
  });

  const buttons = [
    {
      id: "reset-vote",
      name: "reset-vote",
      label: "Reset Vote",
      icon: <Undo2Icon className='mr-2 h-4 w-4' />,
      action: () => {
        setIsVoted(false);
      },
    },
    {
      id: "regenerate",
      name: "regenerate",
      label: "Regenerate",
      icon: <Repeat2Icon className='mr-2 h-4 w-4' />,
      action: async () => {
        setIsVoted(false);

        deleteLastMessageFromChats();

        await getModelAnswer(models[0].model, selectedTask, lastMessageToChat1, 1);
        await getModelAnswer(models[1].model, selectedTask, lastMessageToChat2, 2);
      },
    },
    {
      id: "new-round",
      name: "new-round",
      label: "New Round",
      icon: <DicesIcon className='mr-2 h-4 w-4' />,
      action: () => {
        setTimeout(() => {
          vote();
          setIsVoted(false);
          form.reset();
          clearChats();
          queryClient.invalidateQueries({
            queryKey: ["models"],
          });
        }, 0);
      },
    },
  ];

  return (
    <div className={'my-2 flex flex-wrap sm:flex-nowrap items-center justify-start gap-4'}>
      {buttons.map((button, index) => (
        <Button id={button.id} key={button.name} className={cn(`compare-step-${9+index}`, 'w-[47%] sm:w-full py-5')} onClick={button.action}>
          {button.icon} {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
