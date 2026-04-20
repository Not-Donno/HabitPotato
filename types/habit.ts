export type Habit = {
  id: string;
  name: string;
  completedToday: boolean;
  streak: number;
  lastCompletedDate: string | null;
};
