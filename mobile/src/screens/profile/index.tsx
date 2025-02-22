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

export type Country = {
  code: string;
  name: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  // Add more countries as needed
];

export function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getCountryFlag = (code: string) => {
    const country = COUNTRIES.find((c) => c.code === code);
    return country ? country.flag : "🌍";
  };

  const formatBirthDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.completeName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.nationalityBadge}>
              <Text style={styles.nationalityText}>
                {getCountryFlag(user.nationality)}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{user.completeName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Ionicons name="person" size={24} color={THEME.colors.primary} />
              <Text style={styles.infoTitle}>Personal Information</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>
                {calculateAge(user.birthDate)} years old
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Birth Date</Text>
              <Text style={styles.infoValue}>
                {formatBirthDate(user.birthDate)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Occupation</Text>
              <Text style={styles.infoValue}>{user.occupation}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nationality</Text>
              <Text style={styles.infoValue}>
                {getCountryFlag(user.nationality)}{" "}
                {COUNTRIES.find((c) => c.code === user.nationality)?.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons
              name="chatbubble"
              size={24}
              color={THEME.colors.primary}
            />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="calendar" size={24} color={THEME.colors.primary} />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Months</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color={THEME.colors.primary} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons
              name="create"
              size={20}
              color={THEME.colors.primaryForeground}
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons
              name="log-out"
              size={20}
              color={THEME.colors.destructiveForeground}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
