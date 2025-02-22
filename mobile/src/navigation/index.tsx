// navigation/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { THEME } from "../constants/theme";
import { useAuth } from "../contexts/auth";
import { LoginScreen } from "../screens/auth";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import { ChatsParams, ChatsScreen } from "../screens/chats";
import { ChatDetailParams, ChatDetailScreen } from "../screens/chat-detail";
import { CalendarJournalScreen } from "../screens/journal";
import { DayJournalParams, DayJournalScreen } from "../screens/day-journal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type RootStackParamList = {
  Back: undefined;
  Profile: undefined;
  ChatDetail: ChatDetailParams;
  DayJournal: DayJournalParams;
};

export type MainTabParamList = {
  Home: undefined;
  Chats: ChatsParams;
  Journal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const ProfileButton = ({
  onPress,
  user,
}: {
  onPress: () => void;
  user: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.profileButton}
    activeOpacity={0.7}
  >
    <View style={styles.profileAvatar}>
      <Text style={styles.profileAvatarText}>
        {user?.completeName?.[0]?.toUpperCase()}
      </Text>
    </View>
  </TouchableOpacity>
);

function MainTabNavigator({ navigation }: any) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: THEME.colors.background,
          borderTopColor: THEME.colors.border,
          height: Platform.select({ ios: 80, android: 60 }),
          paddingBottom: Platform.select({ ios: insets.bottom, android: 8 }),
          paddingTop: 8,
          position: "absolute", // This helps with the home indicator
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.mutedForeground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          paddingBottom: Platform.OS === "ios" ? 0 : 4,
        },
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTintColor: THEME.colors.primaryForeground,
        headerShadowVisible: false,
        headerRight: () => (
          <ProfileButton
            onPress={() => navigation.navigate("Profile")}
            user={user}
          />
        ),
        // Add safe area padding to header
        headerStatusBarHeight: insets.top,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="chatbubbles" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={CalendarJournalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="calendar" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTintColor: THEME.colors.primaryForeground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        // Add animation for modal
        animation: Platform.OS === "ios" ? "slide_from_bottom" : "fade",
      }}
    >
      <Stack.Screen
        name="Back"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          presentation: "modal",
          headerTitle: "Your Profile",
          headerTitleStyle: styles.modalHeaderTitle,
          headerLeft:
            Platform.OS === "ios"
              ? () => (
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.modalCloseText}>Done</Text>
                  </TouchableOpacity>
                )
              : undefined,
        })}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.primaryForeground,
        }}
      />
      <Stack.Screen
        name="DayJournal"
        component={DayJournalScreen}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: THEME.colors.primary,
          },
          headerTintColor: THEME.colors.primaryForeground,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${THEME.colors.primaryForeground}20`,
    padding: 3,
    borderRadius: 20,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.primaryForeground,
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarText: {
    color: THEME.colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : -4,
  },
  tabBadge: {
    backgroundColor: THEME.colors.destructive,
    fontSize: 12,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  modalHeaderTitle: {
    color: THEME.colors.primaryForeground,
    fontSize: 17,
    fontWeight: "600",
  },
  modalCloseButton: {
    marginLeft: 8,
    padding: 8,
  },
  modalCloseText: {
    color: THEME.colors.primaryForeground,
    fontSize: 17,
    fontWeight: "600",
  },
});
