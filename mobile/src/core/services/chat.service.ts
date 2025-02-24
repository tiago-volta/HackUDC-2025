import { chatApi } from "../../data/http/chat.api";
import { ChatMapper } from "../../data/mappers/chat.mapper";
import { CalendarDay, Chat, ChatPreview, GroupedChats } from "../domain/chat";

class ChatService {
  private currentChat: Chat | null = null;

  async getHistory(): Promise<Chat[]> {
    try {
      const response = await chatApi.getHistory();
      const parsedResponse: Chat[] = [];
      response.forEach((chat) => {
        parsedResponse.push(ChatMapper.toDomain(chat));
      });
      return parsedResponse;
    } catch (error) {
      console.error("[ChatService] Failed to get history:", error);
      return [];
    }
  }

  async getGroupedChats(): Promise<GroupedChats> {
    try {
      const response = await chatApi.getGroupedChats();
      Object.keys(response).forEach((key) => {
        response[key] = response[key].reverse();
      });
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

  async getCalendarDay(date: string): Promise<CalendarDay | null> {
    try {
      const response = await chatApi.getCalendarDay(date);
      const parsedResponse = ChatMapper.calendarDayToDomain(response);
      if (parsedResponse.justificative == "Error parsing evaluation") {
        return null;
      }
      const chats = await chatApi.getGroupedChats();
      if (!chats[date]) {
        chats[date] = [];
      }
      parsedResponse.chats = chats[date].map(ChatMapper.previewToDomain);
      return parsedResponse;
    } catch (error) {
      console.error("[ChatService] Failed to get calendar day:", error);
      return null;
    }
  }

  async saveCalendarDay(
    date: string,
    note: string
  ): Promise<CalendarDay | null> {
    try {
      console.log("date", date);
      console.log("note", note);
      const response = await chatApi.saveCalendarDay(date, note);
      const parsedResponse = ChatMapper.calendarDayToDomain(response);
      const chats = await chatApi.getGroupedChats();
      if (!chats[date]) {
        chats[date] = [];
      }
      parsedResponse.chats = chats[date].map(ChatMapper.previewToDomain);
      return parsedResponse;
    } catch (error) {
      console.error("[ChatService] Failed to save calendar day:", error);
      return null;
    }
  }

  async getCalendarEntries(): Promise<Date[]> {
    try {
      const response = await chatApi.getCalendarEntries();
      const uniqueDates = new Set(response);
      const parsedDates = Array.from(uniqueDates).map((date) => new Date(date));
      return parsedDates;
    } catch (error) {
      console.error("[ChatService] Failed to get calendar entries:", error);
      return [];
    }
  }

  async getEntriesFromTodayWeek(): Promise<Date[]> {
    try {
      const allEntries = await this.getCalendarEntries();
      const today = new Date();
      const todayWeek = today.getDay();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(todayYear, todayMonth, todayDate + i - todayWeek);
        weekDates.push(date);
      }
      return weekDates.filter((date) => allEntries.includes(date));
    } catch (error) {
      console.error(
        "[ChatService] Failed to get entries from today week:",
        error
      );
      return [];
    }
  }
}

export const chatService = new ChatService();
