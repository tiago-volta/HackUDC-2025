import { api } from "./axios.client";
import { CalendarDayDTO, ChatDTO, GroupedChatsDTO } from "./dto/chat.dto";

class ChatApi {
  getHistory = async (): Promise<ChatDTO[]> => {
    const response = await api.get<ChatDTO[]>("chat/history");
    return response.data;
  };

  getChatById = async (chatId: string): Promise<ChatDTO> => {
    const response = await api.get<ChatDTO>(`chat/${chatId}`);
    return response.data;
  };

  getGroupedChats = async (): Promise<GroupedChatsDTO> => {
    const response = await api.get<GroupedChatsDTO>("chat/group");
    return response.data;
  };

  sendMessage = async (chatId: string, message: string): Promise<string> => {
    const response = await api.post<string>(`chat/${chatId}`, { msg: message });
    return response.data;
  };

  createNewChat = async (): Promise<{ id: string }> => {
    const response = await api.post<{ id: string }>("chat/new");
    return response.data;
  };

  deleteChat = async (chatId: string): Promise<void> => {
    await api.delete(`chat/${chatId}`);
  };

  getCalendarDay = async (date: string): Promise<CalendarDayDTO> => {
    const response = await api.get<CalendarDayDTO>(`calendar/${date}`);
    return response.data;
  };

  saveCalendarDay = async (
    date: string,
    note: string
  ): Promise<CalendarDayDTO> => {
    const response = await api.put<CalendarDayDTO>(`calendar/${date}`, {
      note,
    });
    return response.data;
  };
}

export const chatApi = new ChatApi();
