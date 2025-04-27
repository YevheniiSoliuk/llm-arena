import { ArrowBigLeftIcon, ArrowBigRightIcon, CircleEqualIcon, ThumbsDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Decision } from "@/types";
import { cn } from "@/lib/utils";
import { useGuideStore } from "@/store/guide";

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
  const setClickedRateButtonId = useGuideStore((state) => state.setClickedRateButtonId);

  const onRateButtonClick = (decision: Decision, buttonId: string) => {
    setDecision(decision);
    setIsVoted(true);
    setClickedRateButtonId(buttonId);
  };

  return (
    <div className={cn('compare-step-8', 'flex flex-wrap sm:flex-nowrap w-full items-center justify-between gap-4')}>
      {buttons.map((button, index) => (
        <Button
          id={`rate-button-${index+1}`}
          key={button.text}
          className='my-1 sm:my-4 w-[47%] sm:w-full py-5'
          onClick={() => onRateButtonClick(button.value, `rate-button-${index+1}`)}
        >
          {button.icon} {button.text}
        </Button>
      ))}
    </div>
  );
};

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

export default RateButtons;
