import { chatApi } from "../../data/http/chat.api";
import { ChatMapper } from "../../data/mappers/chat.mapper";
import { Chat, ChatPreview, GroupedChats } from "../domain/chat";

class ChatService {
  private currentChat: Chat | null = null;

  async getHistory(): Promise<Chat[]> {
    try {
      const response = await chatApi.getHistory();
      return response.map(ChatMapper.toDomain);
    } catch (error) {
      console.error("[ChatService] Failed to get history:", error);
      return [];
    }
  }

  async getGroupedChats(): Promise<GroupedChats> {
    try {
      const response = await chatApi.getGroupedChats();
      return ChatMapper.groupedToDomain(response);
    } catch (error) {
      console.error("[ChatService] Failed to get grouped chats:", error);
      return {};
    }
  }

  async sendMessage(chatId: string, message: string): Promise<string> {
    try {
      return await chatApi.sendMessage(chatId, message);
    } catch (error) {
      console.error("[ChatService] Failed to send message:", error);
      throw error;
    }
  }

  async createNewChat(): Promise<string> {
    try {
      const response = await chatApi.createNewChat();
      return response.id;
    } catch (error) {
      console.error("[ChatService] Failed to create new chat:", error);
      throw error;
    }
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    try {
      const response = await chatApi.getChatById(chatId);
      const chat = ChatMapper.toDomain(response);
      this.setCurrentChat(chat);
      return chat;
    } catch (error) {
      console.error("[ChatService] Failed to get chat by id:", error);
      return null;
    }
  }

  async deleteChat(chatId: string): Promise<boolean> {
    try {
      await chatApi.deleteChat(chatId);
      return true;
    } catch (error) {
      console.error("[ChatService] Failed to delete chat:", error);
      return false;
    }
  }

  setCurrentChat(chat: Chat) {
    this.currentChat = chat;
  }

  getCurrentChat(): Chat | null {
    return this.currentChat;
  }
}

export const chatService = new ChatService();
