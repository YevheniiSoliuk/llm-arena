type Sender = "user" | "model";

export type ChatContent = {
  sender: Sender;
  message: string;
};
