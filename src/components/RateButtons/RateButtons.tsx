import { ArrowBigLeftIcon, ArrowBigRightIcon, CircleEqualIcon, ThumbsDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Model } from "@/types";
import useUpdateModelScore from "@/hooks/useUpdateModelScore";

type Decision = "model_a" | "model_b" | "tie" | "both_bad";

type DecisionButton = {
  text: string;
  value: Decision;
  icon: React.ReactNode;
};

type RateButtonsProps = {
  models: {
    model: Model;
    type: "model_a" | "model_b";
  }[];
  selectedTask: string;
};

const RateButtons = ({ models, selectedTask }: RateButtonsProps) => {
  const { mutate } = useUpdateModelScore();

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
  ] as DecisionButton[];

  const onRateButtonClick = (type: Decision) => {
    const model1taskIndex = models[0].model.scoreByTask.findIndex((task) => task.name === selectedTask);
    const model1task = models[0].model.scoreByTask.find((task) => task.name === selectedTask);

    const model2taskIndex = models[1].model.scoreByTask.findIndex((task) => task.name === selectedTask);
    const model2task = models[1].model.scoreByTask.find((task) => task.name === selectedTask);

    switch (type) {
      case "model_a": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score + 1 : 1,
          taskIndex: model1taskIndex,
        });
        break;
      }
      case "model_b": {
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score + 1 : 1,
          taskIndex: model2taskIndex,
        });
        break;
      }
      case "tie": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score + 1 : 1,
          taskIndex: model1taskIndex,
        });
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score + 1 : 1,
          taskIndex: model2taskIndex,
        });
        break;
      }
      case "both_bad": {
        mutate({
          modelId: models[0].model.id,
          score: model1task ? model1task.score - 1 : 0,
          taskIndex: model1taskIndex,
        });
        mutate({
          modelId: models[1].model.id,
          score: model2task ? model2task.score - 1 : 0,
          taskIndex: model2taskIndex,
        });
        break;
      }
      default:
        console.log("Wrong decision!");
        break;
    }
  };

  return (
    <div className='flex w-full items-center justify-between gap-4'>
      <div className='flex w-full items-center gap-4'>
        {[buttons[0], buttons[1]].map((button) => (
          <Button key={button.text} className='my-4 w-full py-5' onClick={() => onRateButtonClick(button.value)}>
            {button.icon} {button.text}
          </Button>
        ))}
      </div>
      <div className='flex w-full items-center gap-4'>
        {[buttons[2], buttons[3]].map((button) => (
          <Button key={button.text} className='my-4 w-full py-5' onClick={() => onRateButtonClick(button.value)}>
            {button.icon} {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RateButtons;
