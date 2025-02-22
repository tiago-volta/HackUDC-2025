// screens/mood-calendar/index.tsx
import React, { useState, useMemo } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

type MoodEntry = {
  date: string;
  moodScore: number;
  note?: string;
};

const MOCK_MOOD_DATA: MoodEntry[] = [
  { date: "2024-03-01", moodScore: 85 },
  { date: "2024-03-05", moodScore: 60 },
  { date: "2024-03-10", moodScore: 95 },
  { date: "2024-03-15", moodScore: 40 },
  { date: "2024-03-20", moodScore: 75 },
  { date: "2024-03-25", moodScore: 30 },
];

const getMoodColor = (score: number): string => {
  if (score >= 80) return "#22c55e"; // Green
  if (score >= 60) return "#84cc16"; // Light Green
  if (score >= 40) return "#eab308"; // Yellow
  if (score >= 20) return "#f97316"; // Orange
  return "#ef4444"; // Red
};

export function CalendarJournalScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate.toISOString().split("T")[0].slice(0, 7)
  );

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    MOCK_MOOD_DATA.forEach((entry) => {
      marks[entry.date] = {
        dots: [
          {
            key: entry.date,
            color: getMoodColor(entry.moodScore),
            selectedDotColor: getMoodColor(entry.moodScore),
          },
        ],
      };
    });
    return marks;
  }, []);

  const handleDayPress = (day) => {
    navigation.navigate("MoodDetail", {
      date: day.dateString,
      moodEntry: MOCK_MOOD_DATA.find((entry) => entry.date === day.dateString),
    });
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
          markedDates={markedDates}
          markingType="multi-dot"
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
