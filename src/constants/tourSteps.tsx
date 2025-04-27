import { outsideComponentSetTask } from "@/store/tasks";
import { StepType } from "@reactour/tour";
import { TaskTypeEnum } from "./taskTypes";
import { outsideComponentSetExampleId, useTaskExamplesStore } from "@/store/examples";
import { outsideComponentGuideStroeSet, useGuideStore } from "@/store/guide";

export const compareSteps = [
  {
    selector: '.compare-step-1',
    content: "Here is the list you can choose a task from.",
    position: "right",
    padding: [25, 0],
  },
  {
    selector: '.compare-step-2',
    content: "You can select an example to see how to form a message for a chosen task.",
    position: "left",
    padding: [-25, 0],
    action: () => {
      setTimeout(() => {
        outsideComponentSetTask(TaskTypeEnum.Named_Entity_Recognition);
      }, 300);
    }
  },
  {
    selector: '.compare-step-3',
    content: "Chats with 2 randomly selected models. Here you will see all the content.",
    action: () => {
      const secondExample = useTaskExamplesStore.getState().examples[0].id;
      outsideComponentSetExampleId(secondExample);
    }
  },
  {
    selector: '.compare-step-4',
    content: "Here is the input to provide your task example. The appearance of the input could change depending on the task.",
  },
  {
    selector: '.compare-step-5',
    content: "Click on the button to send your message to the models.",
    position: "top",
    padding: [-25, 10],
    stepInteraction: true,
  },
  {
    selector: '.compare-step-6',
    content: "On the right side of the chat, your message is located. The answer of the model on the left side.",
    action: () => {
      const sendButton = document.getElementById("send-button") as HTMLButtonElement;
      const hasBeenClicked = sendButton.dataset.clickedInTour;

      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(hasBeenClicked)) {
        sendButton.click();
        sendButton.dataset.clickedInTour = "true";
      }
    }
  },
  {
    selector: '.compare-step-7',
    content: "You can provide messages to the models unless you decide which is better.",
    actionAfter: () => {
      outsideComponentGuideStroeSet("setIsPrevClicked", false);
    }
  },
  {
    selector: '.compare-step-8',
    content: `When you decide which model is better, just click on one button below one.`,
    stepInteraction: true,
    actionAfter: () => {
      const clickedRateButtonId = useGuideStore.getState().clickedRateButtonId;
      const isPrevButtonClicked = useGuideStore.getState().isPrevClicked;

      if (!clickedRateButtonId && !isPrevButtonClicked) {
        const rateButton = document.getElementById("rate-button-1") as HTMLButtonElement;
        rateButton.click();
      }

      outsideComponentGuideStroeSet("setIsPrevClicked", false);
    }
  },
  {
    selector: '.compare-step-9',
    content: "If you change your opinion, you can cancel your vote.",
    actionAfter: () => {
      const isPrevButtonClicked = useGuideStore.getState().isPrevClicked;

      if (!isPrevButtonClicked) {
        return;
      }

      const resetVoteButton = document.getElementById("reset-vote") as HTMLButtonElement;
      resetVoteButton.click();
      outsideComponentGuideStroeSet("setClickedRateButtonId", "");
    },
  },
  {
    selector: '.compare-step-10',
    content: "Also, you can repeat the same question to see if there is any difference in the models' answers.",
  },
  {
    selector: '.compare-step-11',
    content: "If you are sure about your vote, click on this button to select randomly new random pair of models.",
    padding: [-25, 10],
    actionAfter: () => {
      outsideComponentGuideStroeSet("setIsPrevClicked", false);
    }
  },
  {
    selector: '.compare-step-12',
    content: "That's all. From now on, you can do everything on your own :)",
    position: 'center',
    actionAfter: () => {
      const isPrevButtonClicked = useGuideStore.getState().isPrevClicked;

      if (isPrevButtonClicked) {
        return;
      }

      const resetButton = document.getElementById("reset-vote") as HTMLButtonElement;
      resetButton.click();
    }
  },
] as StepType[];

export const leaderboardSteps = [
  {
    selector: '.leaderboard-first-step',
    content: `
      There are 5 tasks to test, so a new leaderboard has been formed for each task.
      The first one is a general leaderboard, which contains a summary of models' rates from other leaderboards.
    `,
  },
  {
    selector: '.leaderboard-second-step',
    content: (
      <div className="text-start">
        <p>Each table contains several columns.</p>
        <ul className="p-1 pl-4">
          <li><strong>#</strong> - position in leaderboard</li>
          <li><strong>Name</strong> - name of the model</li>
          <li><strong>Producer</strong> - name of the creator</li>
          <li><strong>Score</strong> - the number of points</li>
        </ul>
        <p>To test the models on your own, log in and go to the <i>"Compare"</i> page</p>
      </div>
    ),
  },
] as StepType[];