import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { THEME } from "../../constants/theme";
import { RootDrawerParamList } from "../../navigation";
import { chatService } from "../../core/services/chat.service";
import { DisplayMessage } from "../../core/domain/chat";
import { styles } from "./styles";

export type ChatDetailParams = {
  chatId: string;
  title?: string;
};

type Props = DrawerScreenProps<RootDrawerParamList, "ChatDetail">;

export function ChatDetailScreen({ navigation, route }: Props) {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { chatId, title } = route.params;

  useEffect(() => {
    loadChat();
  }, [chatId]);

  const loadChat = async () => {
    const chat = await chatService.getChatById(chatId);
    if (chat) {
      navigation.setOptions({
        title: chat.title || title || "Therapeutic Chat",
      });

      const displayMessages = chat.msgs
        .map((msg): [DisplayMessage, DisplayMessage] => {
          const userMsg: DisplayMessage = {
            id: msg.date.getTime().toString(),
            text: msg.question,
            sender: "user",
            timestamp: msg.date,
          };

          const botMsg: DisplayMessage = {
            id: msg.date.getTime().toString() + "_response",
            text:
              typeof msg.answer === "string"
                ? msg.answer
                : JSON.stringify(msg.answer, null, 2),
            sender: "bot",
            timestamp: msg.date,
          };

          return [userMsg, botMsg];
        })
        .flat();

      setMessages(displayMessages);
    }
  };

  const handleSend = async () => {
    if (inputMessage.trim().length === 0 || isTyping) return;

    const userMessage: DisplayMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(
        chatId,
        inputMessage.trim()
      );
      const botMessage: DisplayMessage = {
        id: Date.now().toString() + "_response",
        text:
          typeof response === "string"
            ? response
            : JSON.stringify(response, null, 2),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = ({ item }: { item: DisplayMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "user"
            ? styles.userMessageBubble
            : styles.botMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "user"
              ? styles.userMessageText
              : styles.botMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.sender === "user"
              ? styles.userMessageTime
              : styles.botMessageTime,
          ]}
        >
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />

        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>AI is typing</Text>
            <ActivityIndicator
              size="small"
              color={THEME.colors.primary}
              style={styles.typingDots}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type your message..."
            placeholderTextColor={THEME.colors.mutedForeground}
            multiline
            maxLength={500}
            editable={!isTyping}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputMessage.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputMessage.trim() || isTyping}
          >
            <Ionicons
              name="send"
              size={24}
              color={
                !inputMessage.trim() || isTyping
                  ? THEME.colors.mutedForeground
                  : THEME.colors.primaryForeground
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
