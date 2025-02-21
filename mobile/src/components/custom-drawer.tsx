import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/auth";
import { THEME } from "../constants/theme";

import { DrawerContentComponentProps } from "@react-navigation/drawer";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
        {/* <Text style={styles.role}>{user?.role}</Text> */}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.colors.primaryForeground,
    borderColor: THEME.colors.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.colors.primary,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.colors.primary,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: THEME.colors.primary,
    opacity: 0.8,
  },
});
