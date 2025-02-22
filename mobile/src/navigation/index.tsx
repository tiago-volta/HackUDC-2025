import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { CustomDrawerContent } from "../components/custom-drawer";
import { THEME } from "../constants/theme";
import { useAuth } from "../contexts/auth";
import { LoginScreen } from "../screens/auth";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import { ChatsParams, ChatsScreen } from "../screens/chats";
import { ChatDetailParams, ChatDetailScreen } from "../screens/chat-detail";
import { CalendarJournalScreen } from "../screens/journal";
import { DayJournalParams, DayJournalScreen } from "../screens/day-journal";

export type RootDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Journal: undefined;
  Chats: ChatsParams;
  ChatDetail: ChatDetailParams;
  DayJournal: DayJournalParams;
};

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

export function AppNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: THEME.colors.primaryForeground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: THEME.colors.background,
          width: 280,
        },
        drawerActiveTintColor: THEME.colors.primary,
        drawerInactiveTintColor: THEME.colors.mutedForeground,
        drawerLabelStyle: {},
      }}
    >
      <Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          title: "Chats",
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Journal"
        component={CalendarJournalScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="DayJournal"
        component={DayJournalScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: THEME.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: THEME.colors.foreground,
  },
});
