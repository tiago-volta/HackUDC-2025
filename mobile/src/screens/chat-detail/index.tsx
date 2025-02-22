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
import { styles } from "./styles";

// Mock therapeutic responses
const MOCK_RESPONSES = [
  "I understand how you're feeling. Could you tell me more about that?",
  "That sounds challenging. How does that make you feel?",
  "I hear you. What thoughts come up when you experience this?",
  "You're showing great awareness by sharing this. How can we work through this together?",
  "It's perfectly normal to feel this way. What would help you feel more supported right now?",
  "Let's explore that further. What do you think triggered these feelings?",
  "You're taking important steps by talking about this. How can we help you move forward?",
  "I appreciate you sharing that. Would you like to discuss some coping strategies?",
];

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type ChatDetailParams = {
  chatId: string;
  title?: string;
};

type Props = DrawerScreenProps<RootDrawerParamList, "ChatDetail">;

export function ChatDetailScreen({ navigation, route }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title || "Therapeutic Chat",
    });
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
    return MOCK_RESPONSES[randomIndex];
  };

  const simulateBotResponse = () => {
    setIsTyping(true);
    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: getRandomResponse(),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500); // 1.5 seconds delay
  };

  const handleSend = () => {
    if (inputMessage.trim().length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    simulateBotResponse();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = ({ item }: { item: Message }) => (
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
