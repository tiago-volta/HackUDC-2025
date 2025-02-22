import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SectionList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";
import { CalendarDay, ChatPreview } from "../../core/domain/chat";
import { chatService } from "../../core/services/chat.service";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { LoadingSpinner } from "../../components/loading-spinner";

export type DayJournalParams = {
  date: Date;
};

type Props = DrawerScreenProps<RootDrawerParamList, "DayJournal">;

export function DayJournalScreen({ navigation, route }: Props) {
  const { date } = route.params;

  const [note, setNote] = useState<string>("");
  const [data, setData] = useState<CalendarDay | null>(null);

  const handleClearNote = () => {
    setNote("");
  };

  const handleSaveNote = () => {
    console.log("Saving note for date:", date, note);
    // Replace with your saving logic
  };

  const fetchCalendarData = async (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const data = await chatService.getCalendarDay(dateString);
    console.log("Fetched data for date:", date, data);
    setData(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, [date])
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchCalendarData(date);
    setRefreshing(false);
  }, [date]);

  const onChatPress = (chatId: string, title: string) => {
    navigation.navigate("ChatDetail", { chatId, title });
  };

  const getMoodColor = (grade: number): string => {
    if (grade >= 80) return "#22c55e"; // Green - Very Happy
    if (grade >= 60) return "#84cc16"; // Light Green - Happy
    if (grade >= 40) return "#eab308"; // Yellow - Neutral
    if (grade >= 20) return "#f97316"; // Orange - Sad
    return "#ef4444"; // Red - Very Sad
  };

  const getMoodLabel = (grade: number): string => {
    if (grade >= 80) return "Very Happy";
    if (grade >= 60) return "Happy";
    if (grade >= 40) return "Neutral";
    if (grade >= 20) return "Sad";
    return "Very Sad";
  };

  const getMoodIcon = (grade: number) => {
    if (grade >= 80) return "happy" as const;
    if (grade >= 60) return "happy-outline" as const;
    if (grade >= 40) return "radio-button-on" as const;
    if (grade >= 20) return "sad-outline" as const;
    return "sad" as const;
  };

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => onChatPress(item.id, item.title)}
      key={item.id}
    >
      <View style={styles.chatIconContainer}>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color={THEME.colors.primary}
        />
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle}>{item.title}</Text>
        </View>

        <Text style={styles.chatPreview} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const [showJustification, setShowJustification] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Day header - Keep outside ScrollView as fixed header */}
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

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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

          {/* Evaluation Section */}
          {data === null && refreshing ? (
            <View style={styles.evaluationContainer}>
              <View style={styles.evaluationHeader}>
                <Ionicons
                  name="analytics"
                  size={24}
                  color={THEME.colors.primary}
                />
                <Text style={styles.evaluationTitle}>Daily Evaluation</Text>
              </View>
              <LoadingSpinner />
            </View>
          ) : (
            data && (
              <View style={styles.evaluationContainer}>
                <View style={styles.evaluationHeader}>
                  <Ionicons
                    name="analytics"
                    size={24}
                    color={THEME.colors.primary}
                  />
                  <Text style={styles.evaluationTitle}>Daily Evaluation</Text>
                </View>

                <View
                  style={[
                    styles.moodIndicator,
                    { backgroundColor: getMoodColor(data.grade) + "20" },
                  ]}
                >
                  <Ionicons
                    name={getMoodIcon(data.grade)}
                    size={32}
                    color={getMoodColor(data.grade)}
                  />
                  <Text
                    style={[
                      styles.moodScore,
                      { color: getMoodColor(data.grade) },
                    ]}
                  >
                    {data.grade}%
                  </Text>
                  <Text
                    style={[
                      styles.moodLabel,
                      { color: getMoodColor(data.grade) },
                    ]}
                  >
                    {getMoodLabel(data.grade)}
                  </Text>
                </View>

                {data.justificative && (
                  <>
                    <TouchableOpacity
                      style={styles.justificationHeader}
                      onPress={() => setShowJustification(!showJustification)}
                    >
                      <Text style={styles.justificationTitle}>AI Analysis</Text>
                      <Ionicons
                        name={showJustification ? "chevron-up" : "chevron-down"}
                        size={24}
                        color={THEME.colors.mutedForeground}
                      />
                    </TouchableOpacity>

                    {showJustification && (
                      <View style={styles.justificationContent}>
                        <Text style={styles.justificationText}>
                          {data.justificative}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            )
          )}

          {/* History Chat Section */}
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>Day History Chat</Text>
            {data?.chats && data.chats.length >= 0 ? (
              <View style={styles.chatListContainer}>
                {data.chats.map((item) => renderChatItem({ item }))}
              </View>
            ) : data === null && !refreshing ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="chatbubble-outline"
                  size={48}
                  color={THEME.colors.mutedForeground}
                />
                <Text style={styles.emptyStateText}>
                  No conversations yet.{"\n"}Start a new chat to begin.
                </Text>
              </View>
            ) : (
              <LoadingSpinner />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
