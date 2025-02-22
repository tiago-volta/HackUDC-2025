import {
  CalendarDay,
  Chat,
  ChatMessage,
  ChatPreview,
  GroupedChats,
} from "../../core/domain/chat";
import {
  CalendarDayDTO,
  ChatDTO,
  ChatMessageDTO,
  ChatPreviewDTO,
  GroupedChatsDTO,
} from "../http/dto/chat.dto";

export class ChatMapper {
  static toDomain(dto: ChatDTO): Chat {
    return {
      id: dto.id,
      title: dto.title,
      msgs: dto.msgs.map((msg) => this.messageToDomain(msg)),
      userId: dto.userId,
    };
  }

  static messageToDomain(dto: ChatMessageDTO): ChatMessage {
    return {
      question: dto.question,
      answer: dto.answer,
      date: new Date(dto.date),
    };
  }

  static previewToDomain(dto: ChatPreviewDTO): ChatPreview {
    return {
      id: dto.id,
      title: dto.title,
      lastMessage: dto.lastMessage,
    };
  }

  static groupedToDomain(dto: GroupedChatsDTO): GroupedChats {
    const result: GroupedChats = {};

    Object.entries(dto).forEach(([date, chats]) => {
      result[date] = chats.map((chat) => this.previewToDomain(chat));
    });

    return result;
  }

  static calendarDayToDomain(dto: CalendarDayDTO): CalendarDay {
    return {
      day: new Date(dto.day),
      note: dto.note,
      chats: [],
      justificative: dto.justificative,
      grade: dto.grade,
    };
  }
}
