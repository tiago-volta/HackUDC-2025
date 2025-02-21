import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/auth";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

export function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.email.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.email}>{user.email}</Text>
          {/* <Text style={styles.role}>{user.role}</Text> */}
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons
              name="person-outline"
              size={24}
              color={THEME.colors.primary}
            />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={THEME.colors.mutedForeground}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons
              name="shield-outline"
              size={24}
              color={THEME.colors.primary}
            />
            <Text style={styles.menuText}>Security</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={THEME.colors.mutedForeground}
            />
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={THEME.colors.destructiveForeground}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
