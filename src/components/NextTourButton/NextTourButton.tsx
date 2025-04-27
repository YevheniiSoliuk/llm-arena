import { useGuideStore } from "@/store/guide";
import { BtnFnProps } from "@/types";

export const NextTourButton = ({
  Button,
  currentStep,
  stepsLength,
  setIsOpen,
  setCurrentStep,
  steps,
}: BtnFnProps) => {
  const isLastStep = currentStep === stepsLength - 1;
  const setIsNextClicked = useGuideStore((state) => state.setIsNextClicked);

  if (!steps) {
    return null;
  }

  return (
    <Button
      kind="next"
      onClick={() => {
        if (isLastStep) {
          setIsOpen(false);
        } else {
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
        const localStorageKey = window.location.pathname.includes("compare") ? "compare-guide-step" : "leaderboard-guide-step";
        localStorage.setItem(localStorageKey, JSON.stringify(currentStep + 1));
        setIsNextClicked(true);
      }}
    ></Button>
  )
}