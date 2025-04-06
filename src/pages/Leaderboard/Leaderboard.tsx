import LeaderboardTable from "@/components/LeaderboardTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskTypeEnum } from "@/constants/taskTypes";

const Leaderboard = () => {
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

  return (
    <div className='mt-16 w-full px-4'>
      <Tabs defaultValue={tabs[0].value} className='flex w-full flex-col items-start'>
        <TabsList className='justify-start gap-2'>
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

export default Leaderboard;
