import { unstable_batchedUpdates } from "react-dom";
import { create } from "zustand";

interface IGuideStore {
  clickedRateButtonId: string;
  isNextClicked: boolean;
  isPrevClicked: boolean;
  setClickedRateButtonId: (clickedRateButtonId: string) => void;
  setIsNextClicked: (isNextClicked: boolean) => void;
  setIsPrevClicked: (isPrevClicked: boolean) => void;
}

export const useGuideStore = create<IGuideStore>((set) => ({
  clickedRateButtonId: "",
  isNextClicked: false,
  isPrevClicked: false,
  setClickedRateButtonId: (clickedRateButtonId) => set(() => ({ clickedRateButtonId })),
  setIsNextClicked: (isNextClicked) => set(() => ({ isNextClicked })),
  setIsPrevClicked: (isPrevClicked) => set(() => ({ isPrevClicked })),
}));

type SetterKeys = Extract<keyof IGuideStore, `set${string}`>;
type SetterFunction<K extends SetterKeys> = IGuideStore[K];
type SetterParam<K extends SetterKeys> =
  Parameters<SetterFunction<K>>[0];

export function outsideComponentGuideStroeSet<K extends SetterKeys>(
  funcName: K,
  value: SetterParam<K>
) {
  unstable_batchedUpdates(() => {
    useGuideStore.getState()[funcName](value as never);
  });
}