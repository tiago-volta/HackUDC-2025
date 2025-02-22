export type ChatMessage = {
  question: string;
  answer: string;
  date: Date;
};

export type DisplayMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type Chat = {
  id: string;
  title?: string;
  msgs: ChatMessage[];
  userId?: string;
};

export type ChatPreview = {
  id: string;
  title: string;
  lastMessage: string;
};

export type GroupedChats = {
  [date: string]: ChatPreview[];
};

export type CalendarDay = {
  day: Date;
  note: string;
  chats: ChatPreview[];
  justificative: string;
  grade: number;
};
