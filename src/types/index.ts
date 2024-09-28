export type Model = {
  id: string;
  name: string;
  producent: string;
  scoreByTask: ScoreByTask[];
  totalScore: number;
};

type ScoreByTask = {
  name: string;
  score: number;
};
