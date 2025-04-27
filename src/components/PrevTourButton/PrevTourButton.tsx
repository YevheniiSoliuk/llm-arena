import { useGuideStore } from "@/store/guide";
import { BtnFnProps } from "@/types";

export const PrevTourButton = ({ Button, currentStep, setCurrentStep, steps }: BtnFnProps) => {
  const isFirstStep = currentStep === 0;
  const setIsPrevClicked = useGuideStore((state) => state.setIsPrevClicked);

  if (!steps) {
    return null;
  }

  return (
    <Button
      kind="prev"
      onClick={() => {
        if (isFirstStep) {
          setCurrentStep(() => steps.length - 1);
        } else {
          setCurrentStep((s) => s - 1);
        }

        const localStorageKey = window.location.pathname.includes("compare") ? "compare-guide-step" : "leaderboard-guide-step";
        localStorage.setItem(localStorageKey, JSON.stringify(currentStep - 1));
        setIsPrevClicked(true);
      }}
    />
  );
}