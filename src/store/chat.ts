import { Sender } from "@/components/Chat/types";
import { create } from "zustand";

type Message = {
  sender: Sender;
  message: string;
};

interface IChatStore {
  chat1Content: Message[];
  chat2Content: Message[];
  setChat1Content: (chatContent: Message[]) => void;
  setChat2Content: (chatContent: Message[]) => void;
  addMessage: (message: string, sender: Sender, chatType: 1 | 2, isFirstChunk?: boolean) => void;
  deleteLastMessageFromChats: () => void;
  clearChats: () => void;
}

export const useChatsStore = create<IChatStore>((set) => ({
  chat1Content: [],
  chat2Content: [],
  setChat1Content: (chat1Content) => set(() => ({ chat1Content })),
  setChat2Content: (chat2Content) => set(() => ({ chat2Content })),
  addMessage: (message, sender, chatType, isFirstChunk) =>
    set((state) => {
      switch (chatType) {
        case 1: {
          if (isFirstChunk) {
            return {
              ...state,
              chat1Content: [
                ...state.chat1Content,
                {
                  sender,
                  message,
                },
              ],
            };
          } else {
            const lastMessageIndex = state.chat1Content.length - 1;

            if (lastMessageIndex < 0) {
              return state;
            }

            const updatedChatContent = [...state.chat1Content];

            updatedChatContent[lastMessageIndex] = {
              ...updatedChatContent[lastMessageIndex],
              message: message,
            };

            return {
              ...state,
              chat1Content: updatedChatContent,
            };
          }
        }
        case 2: {
          if (isFirstChunk) {
            return {
              ...state,
              chat2Content: [
                ...state.chat2Content,
                {
                  sender,
                  message,
                },
              ],
            };
          } else {
            const lastMessageIndex = state.chat2Content.length - 1;

            if (lastMessageIndex < 0) {
              return state;
            }

            const updatedChatContent = [...state.chat2Content];

            updatedChatContent[lastMessageIndex] = {
              ...updatedChatContent[lastMessageIndex],
              message: message,
            };

            return {
              ...state,
              chat2Content: updatedChatContent,
            };
          }
        }
        default:
          console.error("Incorrect chat type. Supported chat types: 1 and 2");
          return state;
      }
    }),
  deleteLastMessageFromChats: () =>
    set((state) => ({
      chat1Content: state.chat1Content.filter((_, index) => index !== state.chat1Content.length - 1),
      chat2Content: state.chat2Content.filter((_, index) => index !== state.chat2Content.length - 1),
    })),
  clearChats: () =>
    set(() => ({
      chat1Content: [],
      chat2Content: [],
    })),
}));
