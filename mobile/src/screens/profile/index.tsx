import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";

// Mock Big Five data
const BIG_FIVE_DATA = [
  {
    label: "Openness",
    value: 75,
    description:
      "You show high curiosity and appreciation for art, emotion, adventure, unusual ideas, imagination, and variety of experience. This suggests you're creative, innovative, and always eager to learn new things in your therapeutic journey.",
  },
  {
    label: "Responsibility",
    value: 85,
    description:
      "Your high level of conscientiousness/responsibility indicates strong self-discipline, aim for achievement, and planned behavior. This trait helps you maintain consistency in your mental health practices and follow through with therapeutic recommendations.",
  },
  {
    label: "Extraversion",
    value: 60,
    description:
      "Your moderate extraversion score suggests a balanced approach to social interactions. You can engage well with others while also being comfortable with solitude, which is valuable for mental well-being.",
  },
  {
    label: "Agreeableness",
    value: 80,
    description:
      "Your high agreeableness shows strong empathy and concern for others' well-being. This trait helps you build supportive relationships and engage positively in therapy sessions.",
  },
  {
    label: "Neuroticism",
    value: 45,
    description:
      "Your moderate-low neuroticism suggests relatively stable emotions and good stress management. While you experience normal emotional responses, you generally handle pressure well.",
  },
];

// Mock Enneagram data – replace these with dynamic values when available
const MOCK_ENNEAGRAM = {
  type: 4,
  title: "The Individualist (The Romantic)",
  emoji: "🎨",
  description:
    "As an Individualist, you are creative, introspective, and emotionally deep. You value authenticity and uniqueness; however, sometimes you may feel misunderstood or overly self-absorbed. Embracing your individuality can help enrich your personal growth and therapy journey.",
};

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
  const [selectedTrait, setSelectedTrait] = useState<any>(null);
  const [showEnneagramModal, setShowEnneagramModal] = useState(false);
  const screenWidth = Dimensions.get("window").width;

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

  const handleTraitPress = (index: number) => {
    setSelectedTrait(BIG_FIVE_DATA[index]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* USER HEADER */}
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

        {/* PERSONAL INFO CARD */}
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

        {/* ENNEAGRAM SECTION */}
        <TouchableOpacity
          style={styles.enneagramCard}
          onPress={() => setShowEnneagramModal(true)}
        >
          <View style={styles.enneagramContent}>
            <Text style={styles.enneagramEmoji}>{MOCK_ENNEAGRAM.emoji}</Text>
            <View style={styles.enneagramTextContainer}>
              <Text style={styles.enneagramTitle}>
                Type {MOCK_ENNEAGRAM.type}: {MOCK_ENNEAGRAM.title}
              </Text>
              <Text style={styles.enneagramSub}>Tap for more information</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={THEME.colors.mutedForeground}
            />
          </View>
        </TouchableOpacity>

        {/* USER STATS */}
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

        {/* BIG FIVE RADAR CHART */}
        <View style={styles.personalityCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="analytics" size={24} color={THEME.colors.primary} />
            <Text style={styles.infoTitle}>Personality Insights</Text>
          </View>

          <View style={styles.chartContainer}>
            <RadarChart
              data={BIG_FIVE_DATA}
              size={screenWidth - 80}
              maxValue={100}
              scale={0.9}
              fillColor={THEME.colors.background}
              gradientColor={{
                startColor: THEME.colors.primary,
                endColor: THEME.colors.background,
                count: 5,
              }}
              stroke={[
                THEME.colors.border,
                THEME.colors.border,
                THEME.colors.border,
                THEME.colors.border,
                THEME.colors.primary,
              ]}
              strokeWidth={[0.5, 0.5, 0.5, 0.5, 1.5]}
              strokeOpacity={[0.3, 0.3, 0.3, 0.3, 0.2]}
              labelSize={14}
              labelColor={THEME.colors.mutedForeground}
              labelDistance={1.2}
              dataFillColor={THEME.colors.primary}
              dataFillOpacity={0.15}
              dataStroke={THEME.colors.primary}
              dataStrokeWidth={2}
              dataStrokeOpacity={0.8}
              divisionStroke={THEME.colors.border}
              divisionStrokeWidth={1}
              divisionStrokeOpacity={0.3}
              isCircle
            />
          </View>

          <Text style={styles.chartHelper}>
            Tap on any trait to learn more about your personality profile
          </Text>

          <View style={styles.traitsLegend}>
            {BIG_FIVE_DATA.map((trait, index) => (
              <TouchableOpacity
                key={trait.label}
                style={styles.traitItem}
                onPress={() => handleTraitPress(index)}
              >
                <View style={styles.traitScore}>
                  <Text style={styles.traitScoreText}>{trait.value}%</Text>
                </View>
                <Text style={styles.traitLabel}>{trait.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons
              name="log-out"
              size={20}
              color={THEME.colors.destructiveForeground}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Big Five Trait Modal */}
        <Modal
          isVisible={selectedTrait !== null}
          onBackdropPress={() => setSelectedTrait(null)}
          backdropOpacity={0.4}
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedTrait?.label}</Text>
              <TouchableOpacity
                onPress={() => setSelectedTrait(null)}
                style={styles.modalClose}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={THEME.colors.mutedForeground}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalScoreContainer}>
              <Text style={styles.modalScoreLabel}>Score</Text>
              <Text style={styles.modalScoreValue}>
                {selectedTrait?.value}%
              </Text>
            </View>
            <Text style={styles.modalDescription}>
              {selectedTrait?.description}
            </Text>
          </View>
        </Modal>

        {/* Enneagram Modal */}
        <Modal
          isVisible={showEnneagramModal}
          onBackdropPress={() => setShowEnneagramModal(false)}
          backdropOpacity={0.4}
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Enneagram Type {MOCK_ENNEAGRAM.type}: {MOCK_ENNEAGRAM.title}
              </Text>
              <TouchableOpacity
                onPress={() => setShowEnneagramModal(false)}
                style={styles.modalClose}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={THEME.colors.mutedForeground}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalScoreContainer}>
              <Text style={styles.modalScoreLabel}>Details</Text>
            </View>
            <Text style={styles.modalDescription}>
              {MOCK_ENNEAGRAM.description}
            </Text>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
