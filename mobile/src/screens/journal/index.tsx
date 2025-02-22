import React, { useState, useMemo } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";

// Mock data structure for mood entries
type MoodEntry = {
  date: string;
  moodScore: number;
  note?: string;
};

// Mock data - you can replace this with your API data later
const MOCK_MOOD_DATA: MoodEntry[] = [
  { date: "2024-03-01", moodScore: 85, note: "Feeling great today!" },
  { date: "2024-03-05", moodScore: 60, note: "Somewhat stressed" },
  { date: "2024-03-10", moodScore: 95, note: "Amazing day!" },
  { date: "2024-03-15", moodScore: 40, note: "Difficult day" },
  { date: "2024-03-20", moodScore: 75, note: "Pretty good" },
  { date: "2024-03-25", moodScore: 30, note: "Struggling" },
  // Add more mock data as needed
];

const getMoodColor = (score: number): string => {
  if (score >= 80) return "#22c55e"; // Green for great mood
  if (score >= 60) return "#84cc16"; // Light green for good mood
  if (score >= 40) return "#eab308"; // Yellow for neutral mood
  if (score >= 20) return "#f97316"; // Orange for low mood
  return "#ef4444"; // Red for very low mood
};

export type JournalParams = {};

type Props = DrawerScreenProps<RootDrawerParamList, "Journal">;

export function CalendarJournalScreen({ navigation }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate.toISOString().split("T")[0].slice(0, 7)
  );

  // Convert mood data to calendar marking format
  const markedDates = useMemo(() => {
    const marks = {};
    MOCK_MOOD_DATA.forEach((entry) => {
      marks[entry.date] = {
        marked: true,
        selected: true,
        selectedColor: getMoodColor(entry.moodScore),
        selectedTextColor:
          entry.moodScore >= 60
            ? THEME.colors.background
            : THEME.colors.primaryForeground,
      };
    });
    return marks;
  }, []);

  const handleDayPress = (day) => {
    // Find mood entry for selected date
    const moodEntry = MOCK_MOOD_DATA.find(
      (entry) => entry.date === day.dateString
    );

    // Navigate to detail screen with mood data
    navigation.navigate("MoodDetail", {
      date: day.dateString,
      moodEntry,
    });
  };

  const renderHeader = (date) => {
    const monthYear = date.toString("MMMM yyyy");
    return (
      <View style={styles.calendarHeader}>
        <Text style={styles.calendarHeaderText}>{monthYear}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood Journal</Text>
        <Text style={styles.subtitle}>Track your daily mental well-being</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}
          onDayPress={handleDayPress}
          markingType="custom"
          markedDates={markedDates}
          renderHeader={renderHeader}
          theme={{
            backgroundColor: THEME.colors.background,
            calendarBackground: THEME.colors.background,
            textSectionTitleColor: THEME.colors.mutedForeground,
            selectedDayBackgroundColor: THEME.colors.primary,
            selectedDayTextColor: THEME.colors.primaryForeground,
            todayTextColor: THEME.colors.primary,
            dayTextColor: THEME.colors.foreground,
            textDisabledColor: THEME.colors.mutedForeground,
            monthTextColor: THEME.colors.foreground,
          }}
        />
      </View>

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Mood Scale</Text>
        <View style={styles.legendItems}>
          {[
            { label: "Great", score: 90 },
            { label: "Good", score: 70 },
            { label: "Okay", score: 50 },
            { label: "Low", score: 30 },
            { label: "Poor", score: 10 },
          ].map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: getMoodColor(item.score) },
                ]}
              />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
