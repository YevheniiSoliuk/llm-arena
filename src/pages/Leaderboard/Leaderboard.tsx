import LeaderboardTable from "@/components/LeaderboardTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskTypeEnum } from "@/constants/taskTypes";
import { cn } from '@/lib/utils';
import { Guide } from '@/components/Guide';
import { useTour } from "@reactour/tour";
import { leaderboardSteps } from "@/constants/tourSteps";
import { useEffect } from "react";

export const Leaderboard = () => {
  const { setSteps, setCurrentStep } = useTour();

  const tabs = [
    {
      label: "General",
      value: "general",
      content: <LeaderboardTable />,
    },
    ...Object.values(TaskTypeEnum).map((value) => ({
      label: value.split("-").join(" ").replace(value[0], value[0].toUpperCase()),
      value,
      content: <LeaderboardTable taskType={value} />,
    })),
  ];

  useEffect(() => {
    const guideStepFromLs = localStorage.getItem("leaderboard-guide-step");
    const step = guideStepFromLs ? JSON.parse(guideStepFromLs) : 0;
    setSteps?.(leaderboardSteps);
    setCurrentStep(step);
  }, [])

  return (
    <div className='mt-5 w-full px-4'>
      <Guide />
      <Tabs defaultValue={tabs[0].value} className='flex w-full flex-col items-start'>
        <TabsList className={cn('leaderboard-first-step', 'h-full justify-start flex-wrap gap-2 overflow-y-auto max-w-full scrollbar-hide')}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className='w-full'>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
