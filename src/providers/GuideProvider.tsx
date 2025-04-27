import { PropsWithChildren, useMemo } from "react";
import { NextTourButton } from "@/components/NextTourButton/NextTourButton";
import { PrevTourButton } from "@/components/PrevTourButton";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { leaderboardSteps } from "@/constants/tourSteps";
import { StylesObj, TourProvider } from "@reactour/tour";
import { useChatsStore } from "@/store/chat";
import { useTaskExamplesStore } from "@/store/examples";
import { useTaskStore } from "@/store/tasks";
import { useFormContext } from "react-hook-form";
import { ClickProps } from "@/types";

type GuideProviderProps = PropsWithChildren;
const radius = 8

const styles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popover: (base: any) => ({
    ...base,
    '--reactour-accent': '#646cff',
    color: 'black',
    borderRadius: radius,
    textAlign: 'justify',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maskArea: (base: any) => ({ ...base, rx: radius }),
  badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
  controls: (base) => ({ ...base, marginTop: 24 }),
} as StylesObj;

export const GuideProvider = ({ children }: GuideProviderProps) => {
  const methods = useFormContext()
  const clearChats = useChatsStore((state) => state.clearChats);
  const setTask = useTaskStore((state) => state.setTask);
  const setExampleId = useTaskExamplesStore((state) => state.setExampleId);

  const getGuideStep = useMemo(() => {
    const guideStepFromLs = window.location.pathname.includes("compare")
      ? localStorage.getItem("compare-guide-step")
      : localStorage.getItem("leaderboard-guide-step");
    return guideStepFromLs ? JSON.parse(guideStepFromLs) : 0;
  }, []);

  const handleMaskClick = ({ setCurrentStep, currentStep, steps, setIsOpen }: ClickProps) => {
    if (steps) {
      if (currentStep === steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(0);
          clearChats();
          setTask(TaskTypeEnum.Sentiment_Analysis);
          setExampleId("");
          methods.reset();
          localStorage.setItem("compare-guide-step", JSON.stringify(0));
          localStorage.setItem("leaderboard-guide-step", JSON.stringify(0));
        }, 0);
      }
    }

    setIsOpen(false);
  }

  return (
    <TourProvider
      currentStep={getGuideStep}
      steps={leaderboardSteps}
      position={"right"}
      padding={{
        popover: [-10, 10]
      }}
      badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + "/" + totalSteps}
      showCloseButton={false}
      disableInteraction
      afterOpen={() => {
        document.body.style.overflowY = 'hidden';
      }}
      beforeClose={() => {
        document.body.style.overflowY = 'unset';
      }}
      onClickMask={handleMaskClick}
      styles={styles}
      prevButton={({ Button, currentStep, setCurrentStep, steps, stepsLength, setIsOpen }) => {
        return <PrevTourButton
          Button={Button}
          setCurrentStep={setCurrentStep}
          steps={steps}
          stepsLength={stepsLength}
          currentStep={currentStep}
          setIsOpen={setIsOpen}
        />;
      }}
      nextButton={({
        Button,
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        return <NextTourButton
          Button={Button}
          setCurrentStep={setCurrentStep}
          steps={steps}
          stepsLength={stepsLength}
          currentStep={currentStep}
          setIsOpen={setIsOpen}
        />
      }}
    >
      {children}
    </TourProvider>
  )
}