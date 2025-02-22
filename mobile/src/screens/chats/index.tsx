import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";

// Mock data for chats
const MOCK_CHATS = [
  {
    id: "1",
    title: "Anxiety Management",
    lastMessage: "Let's talk about breathing exercises...",
    timestamp: "2024-03-20T10:30:00",
  },
  {
    id: "2",
    title: "Sleep Journal",
    lastMessage: "How was your sleep schedule this week?",
    timestamp: "2024-03-19T15:45:00",
  },
  {
    id: "3",
    title: "Stress Relief",
    lastMessage: "Remember to take breaks during work...",
    timestamp: "2024-03-18T09:20:00",
  },
  {
    id: "4",
    title: "Mindfulness Session",
    lastMessage: "Today we'll focus on present moment...",
    timestamp: "2024-03-17T14:15:00",
  },
];

export type ChatsParams = {};

type Props = DrawerScreenProps<RootDrawerParamList, "Chats">;

export function ChatsScreen({ navigation, route }: Props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [chats, setChats] = React.useState(MOCK_CHATS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatCard}>
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
          <Text style={styles.chatTimestamp}>{formatDate(item.timestamp)}</Text>
        </View>

        <Text style={styles.chatPreview} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const onNewChatPress = () => {
    const chatId: string = "1";
    navigation.navigate("ChatDetail", {
      chatId: chatId,
    });
  };

  const onChatPress = (chatId: string) => {
    navigation.navigate("ChatDetail", {
      chatId,
    });
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

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Recent Chats</Text>
        <View style={styles.dividerLine} />
      </View>

      <FlatList
        data={chats}
        renderItem={renderChatItem}
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
