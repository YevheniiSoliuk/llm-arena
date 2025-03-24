import { Button } from "../ui/button";
import { Repeat2Icon, DicesIcon, Undo2Icon } from "lucide-react";
import useVote from "@/hooks/useVote";
import { Decision, ModelWithType } from "@/types";
import { TaskTypeEnum } from "@/constants/taskTypes";
import useTask from "@/hooks/useTask";
import { useChatsStore } from "@/store/chat";
import { useQueryClient } from "@tanstack/react-query";

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

  const { getModelAnswer } = useTask();
  const { vote } = useVote({
    models,
    selectedTask,
    decision: decision,
  });

  const buttons = [
    {
      name: "reset-vote",
      label: "Reset Vote",
      icon: <Undo2Icon className='mr-2 h-4 w-4' />,
      action: () => {
        setIsVoted(false);
      },
    },
    {
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
      name: "new-round",
      label: "New Round",
      icon: <DicesIcon className='mr-2 h-4 w-4' />,
      action: () => {
        vote();
        setIsVoted(false);

        clearChats();
        queryClient.invalidateQueries({
          queryKey: ["models"],
        });
      },
    },
  ];

  return (
    <div className='my-2 flex items-center justify-start gap-4'>
      {buttons.map((button) => (
        <Button key={button.name} className='w-full py-5' onClick={button.action}>
          {button.icon} {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
