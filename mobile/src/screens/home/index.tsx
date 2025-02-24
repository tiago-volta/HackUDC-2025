// screens/home/index.tsx
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import {
  CompositeScreenProps,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList, RootStackParamList } from "../../navigation";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { chatService } from "../../core/services/chat.service";
import { LoadingSpinner } from "../../components/loading-spinner";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

const getMoodMessage = (grade: number) => {
  if (grade >= 80) return "You're doing great today!";
  if (grade >= 60) return "You're doing well today!";
  if (grade >= 40) return "You're doing okay today!";
  if (grade >= 20) return "You're not doing well today!";
  if (grade == 0) return "You haven't logged your mood today!";
  return "You're not doing great today!";
};

const getMoodIcon = (grade: number) => {
  if (grade >= 80) return "happy" as const;
  if (grade >= 60) return "happy-outline" as const;
  if (grade >= 40) return "radio-button-on" as const;
  if (grade >= 20) return "sad-outline" as const;
  if (grade == 0) return "sad" as const;
  return "sad" as const;
};

export function HomeScreen({ navigation }: Props) {
  const renderMoodCard = (mood: number) => (
    <View style={styles.moodCard}>
      <View style={styles.moodHeader}>
        <Text style={styles.moodTitle}>Today's Mood</Text>
        <TouchableOpacity
          style={styles.moodAction}
          onPress={() => navigation.navigate("Journal")}
        >
          <Text style={styles.moodActionText}>View Calendar</Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={THEME.colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.moodContent}>
        <View style={styles.moodChart}>
          <Ionicons
            name={getMoodIcon(mood)}
            size={32}
            color={THEME.colors.primary}
          />
          <Text style={styles.moodScore}>{mood}%</Text>
        </View>
        <Text style={styles.moodText}>{getMoodMessage(mood)}</Text>
      </View>
    </View>
  );

  const renderStatsCard = ({
    conversations,
    journalEntries,
  }: {
    conversations: number;
    journalEntries: number;
  }) => (
    <View style={styles.statsCard}>
      <Text style={styles.cardTitle}>Weekly Overview</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons
              name="chatbubbles"
              size={24}
              color={THEME.colors.primary}
            />
          </View>
          <Text style={styles.statNumber}>{conversations}</Text>
          <Text style={styles.statLabel}>Conversations</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name="calendar" size={24} color={THEME.colors.primary} />
          </View>
          <Text style={styles.statNumber}>{journalEntries}</Text>
          <Text style={styles.statLabel}>Journal Entries</Text>
        </View>
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

  const getTodaysMood = async () => {
    const date = new Date();
    const stringDate = date.toISOString().split("T")[0];
    const mood = await chatService.getCalendarDay(stringDate);
    return mood?.grade;
  };

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.cardTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate("Journal")}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="journal" size={24} color={THEME.colors.primary} />
          </View>
          <Text style={styles.actionText}>Write Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate("Chats", {})}
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="chatbubbles"
              size={24}
              color={THEME.colors.primary}
            />
          </View>
          <Text style={styles.actionText}>View Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="person" size={24} color={THEME.colors.primary} />
          </View>
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [todaysMood, setTodaysMood] = React.useState<number>(0);
  const [numberOfConversations, setNumberOfConversations] = React.useState(0);
  const [numberOfJournalEntries, setNumberOfJournalEntries] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  async function fetchNumbers() {
    const conversations = await chatService.getGroupedChats();
    let totalConversations = 0;
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    Object.keys(conversations).forEach((key) => {
      const keyDate = new Date(key);
      if (keyDate >= startOfWeek && keyDate <= currentDate) {
        totalConversations += conversations[key].length;
      }
    });
    return {
      numberOfConversations: totalConversations,
      numberOfJournalEntries: 0,
    };
  }

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const mood = await getTodaysMood();
        setTodaysMood(mood || 0);
        const numbers = await fetchNumbers();
        setNumberOfConversations(numbers.numberOfConversations);
        setNumberOfJournalEntries(numbers.numberOfJournalEntries);
      }
      fetchData().finally(() => setLoading(false));
    }, [getTodaysMood])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Let's check on your well-being</Text>
        </View>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {renderMoodCard(todaysMood)}
            {renderStatsCard({
              conversations: numberOfConversations,
              journalEntries: numberOfJournalEntries,
            })}
            {renderQuickActions()}
          </>
        )}
      </ScrollView>

      {/* FAB for new chat */}
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
    </SafeAreaView>
  );
}
