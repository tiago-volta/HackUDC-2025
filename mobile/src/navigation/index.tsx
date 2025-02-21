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

const Drawer = createDrawerNavigator();

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
    </SafeAreaView>
  );
}

export function AppNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <Drawer.Navigator
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
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cog" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
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
