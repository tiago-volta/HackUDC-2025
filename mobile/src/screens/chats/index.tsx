import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";
import { chatService } from "../../core/services/chat.service";
import { ChatPreview, GroupedChats } from "../../core/domain/chat";
import { useFocusEffect } from "@react-navigation/native";

export type ChatsParams = {};

type Props = DrawerScreenProps<RootDrawerParamList, "Chats">;

const formatDate = (date: string) => {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

  if (date === today) return "Today";
  if (date === yesterday) return "Yesterday";

  // For other dates, return the formatted date
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function ChatsScreen({ navigation, route }: Props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [groupedChats, setGroupedChats] = React.useState<GroupedChats>({});

  const fetchChats = React.useCallback(async () => {
    try {
      const chats = await chatService.getGroupedChats();
      setGroupedChats(chats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchChats();
    setRefreshing(false);
  }, [fetchChats]);

  useFocusEffect(
    React.useCallback(() => {
      fetchChats();
    }, [fetchChats])
  );

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => onChatPress(item.id, item.title)}
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

  const renderDateSection = ({
    section,
  }: {
    section: { title: string; data: ChatPreview[] };
  }) => (
    <View style={styles.dateSection}>
      <View style={styles.dateDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dateSectionTitle}>{formatDate(section.title)}</Text>
        <View style={styles.dividerLine} />
      </View>
    </View>
  );

  const onNewChatPress = async () => {
    try {
      const chatId = await chatService.createNewChat();
      navigation.navigate("ChatDetail", { chatId });
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const onChatPress = (chatId: string, title: string) => {
    navigation.navigate("ChatDetail", { chatId, title });
  };

  const getSectionData = () => {
    return Object.entries(groupedChats)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([date, chats]) => ({
        title: date,
        data: chats,
      }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Conversations</Text>
        <Text style={styles.subtitle}>
          Continue your journey to better mental health
        </Text>
      </View>

      <TouchableOpacity style={styles.newChatButton} onPress={onNewChatPress}>
        <Ionicons name="add" size={24} color={THEME.colors.primaryForeground} />
        <Text style={styles.newChatButtonText}>Start New Conversation</Text>
      </TouchableOpacity>

      <SectionList
        sections={getSectionData()}
        renderItem={renderChatItem}
        renderSectionHeader={renderDateSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.primary}
            colors={[THEME.colors.primary]}
          />
        }
        ListEmptyComponent={() => (
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
        )}
      />
    </SafeAreaView>
  );
}
