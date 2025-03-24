import { ArrowBigLeftIcon, ArrowBigRightIcon, CircleEqualIcon, ThumbsDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Decision } from "@/types";

type VoteButton = {
  text: string;
  value: Decision;
  icon: React.ReactNode;
};

type RateButtonsProps = {
  setDecision: React.Dispatch<React.SetStateAction<Decision | null>>;
  setIsVoted: React.Dispatch<React.SetStateAction<boolean>>;
};

const RateButtons = ({ setIsVoted, setDecision }: RateButtonsProps) => {
  const buttons = [
    {
      text: "Model A",
      value: "model_a",
      icon: <ArrowBigLeftIcon className='mr-2 h-4 w-4' />,
    },
    {
      text: "Model B",
      value: "model_b",
      icon: <ArrowBigRightIcon className='mr-2 h-4 w-4' />,
    },
    {
      text: "Tie",
      value: "tie",
      icon: <CircleEqualIcon className='mr-2 h-4 w-4' />,
    },
    {
      text: "Both bad",
      value: "both_bad",
      icon: <ThumbsDownIcon className='mr-2 h-4 w-4' />,
    },
  ] as VoteButton[];

  const onRateButtonClick = (decision: Decision) => {
    setDecision(decision);
    setIsVoted(true);
  };

  return (
    <div className='flex w-full items-center justify-between gap-4'>
      {buttons.map((button) => (
        <Button key={button.text} className='my-4 w-full py-5' onClick={() => onRateButtonClick(button.value)}>
          {button.icon} {button.text}
        </Button>
      ))}
    </div>
  );
};

export default RateButtons;
