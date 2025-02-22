import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Good morning! How are you feeling?",
    sender: "bot",
    timestamp: new Date(),
  },
  {
    id: "2",
    text: "I felt a bit overwhelmed today, but I'm managing.",
    sender: "user",
    timestamp: new Date(),
  },
  {
    id: "3",
    text: "Remember to take breaks and breathe.",
    sender: "bot",
    timestamp: new Date(),
  },
];

export type DayJournalParams = {
  date: Date;
};

type Props = DrawerScreenProps<RootDrawerParamList, "DayJournal">;

export function DayJournalScreen({ navigation, route }: Props) {
  const { date } = route.params;

  const [note, setNote] = useState<string>("");
  const [chatHistory, setChatHistory] =
    useState<ChatMessage[]>(mockChatMessages);

  const handleClearNote = () => {
    setNote("");
  };

  const handleSaveNote = () => {
    console.log("Saving note for date:", date, note);
    // Replace with your saving logic
  };

  const renderChatItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.chatMessageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <View
          style={[
            styles.chatBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text
            style={[
              styles.chatMessageText,
              isUser ? styles.userMessageText : styles.botMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text style={styles.chatTimestamp}>
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Day header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={THEME.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
        {/* Editable note area */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Journal Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="How did this day go? Write your thoughts..."
            placeholderTextColor={THEME.colors.mutedForeground}
            multiline
            value={note}
            onChangeText={setNote}
          />
          <View style={styles.noteActions}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearNote}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color={THEME.colors.destructiveForeground}
              />
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveNote}
            >
              <Ionicons
                name="save-outline"
                size={20}
                color={THEME.colors.primaryForeground}
              />
              <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* History Chat Section */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Day History Chat</Text>
          <FlatList
            data={chatHistory}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
