import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { THEME } from "../../constants/theme";
import { ChatPreview, GroupedChats } from "../../core/domain/chat";
import { chatService } from "../../core/services/chat.service";
import { MainTabParamList, RootStackParamList } from "../../navigation";
import { styles } from "./styles";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";

export type ChatsParams = {};
type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Chats">,
  NativeStackScreenProps<RootStackParamList>
>;

const formatDate = (date: string) => {
  date = date.replaceAll("-", "/");
  date = date.split("/").reverse().join("/");
  const parts = date.split("/");
  date = `${parts[1]}/${parts[0]}/${parts[2]}`;
  date = date.replace(/(^|\/)0+/g, "$1");
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
  console.log(today, yesterday, date);

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

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState<ChatPreview | null>(
    null
  );

  const handleDeletePress = (chat: ChatPreview) => {
    setSelectedChat(chat);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedChat) return;

    try {
      await chatService.deleteChat(selectedChat.id);
      await fetchChats();
      setIsDeleteModalVisible(false);
      setSelectedChat(null);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

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
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePress(item)}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={THEME.colors.destructive}
            />
          </TouchableOpacity>
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
      <View style={styles.content}>
        <SectionList
          sections={getSectionData()}
          renderItem={renderChatItem}
          renderSectionHeader={renderDateSection}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.title}>Your Conversations</Text>
              <Text style={styles.subtitle}>
                Continue your journey to better mental health
              </Text>
            </View>
          )}
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
                No conversations yet.{"\n"}Tap + to start a new chat.
              </Text>
            </View>
          )}
        />

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={onNewChatPress}
          activeOpacity={0.8}
        >
          <View style={styles.fabIcon}>
            <Ionicons
              name="add"
              size={28}
              color={THEME.colors.primaryForeground}
            />
          </View>
          <Text style={styles.fabText}>New Chat</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        chatTitle={selectedChat?.title ?? ""}
        onClose={() => {
          setIsDeleteModalVisible(false);
          setSelectedChat(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </SafeAreaView>
  );
}
