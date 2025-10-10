
// This is a mock of your Firebase service.
// Replace this with your actual Firebase fetching logic.

export type TimerButton = {
  id: string;
  title: string;
  path: string;
  icon: string;
};

// Initial mock data
const MOCK_DATA: TimerButton[] = [
  { id: "1", icon: "stopwatch-20", title: "HIIT Timer", path: "/hiit/list" },
  { id: "2", icon: "hourglass", title: "Countdown Timer", path: "/countdown/list" },
];

// Simulate a fetch delay
const fetchDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getTimerButtons = async (): Promise<TimerButton[]> => {
  console.log("Fetching timer buttons from Firebase...");
  await fetchDelay(1000); // Simulate network latency
  return MOCK_DATA;
};

export const updateTimerButtonTitle = async ({ id, newTitle }: { id: string, newTitle: string }): Promise<TimerButton> => {
  console.log(`Updating title for button ${id} to "${newTitle}" in Firebase...`);
  await fetchDelay(500);
  const buttonIndex = MOCK_DATA.findIndex(b => b.id === id);
  if (buttonIndex > -1) {
    MOCK_DATA[buttonIndex].title = newTitle;
    return MOCK_DATA[buttonIndex];
  }
  throw new Error("Button not found!");
};
