import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";
import { THEME } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../navigation";
type MoodEntry = {
  date: string;
  isMarked: boolean;
};

export type CalendarJournalParams = {};

type Props = DrawerScreenProps<RootDrawerParamList, "Journal">;

const YEARS = Array.from({ length: 20 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarJournalScreen({ navigation }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toISOString().split("T")[0].slice(0, 7)
  );
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear().toString()
  );

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    // Mark entries
    // MOCK_MOOD_DATA.forEach((entry) => {
    //   marks[entry.date] = {
    //     marked: true,
    //     dotColor: THEME.colors.primary,
    //     activeOpacity: 0.5,
    //   };
    // });

    // Mark today
    const todayStr = today.toISOString().split("T")[0];
    marks[todayStr] = {
      ...marks[todayStr],
      marked: marks[todayStr]?.marked || false,
      dotColor: marks[todayStr]?.dotColor || THEME.colors.primary,
      today: true,
    };

    return marks;
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    console.log(day);
    const selectedDate = new Date(day.dateString);
    console.log(selectedDate);
    console.log(today);

    // Prevent selection of future dates
    // if (selectedDate > today) {
    //   return;
    // }

    navigation.navigate("DayJournal", {
      date: selectedDate,
    });
  };

  const handleMonthSelect = (month: string) => {
    const monthIndex = MONTHS.indexOf(month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    setCurrentMonth(`${selectedYear}-${formattedMonth}`);
    setDatePickerVisible(false);
  };

  console.log(currentMonth);

  const DatePickerModal = () => (
    <Modal
      visible={isDatePickerVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setDatePickerVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons
                name="close"
                size={24}
                color={THEME.colors.mutedForeground}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.datePickerContainer}>
            {/* Years Column */}
            <View style={styles.yearColumn}>
              <Text style={styles.columnHeader}>Year</Text>
              <FlatList
                data={YEARS}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.yearItem,
                      selectedYear === item && styles.selectedYear,
                    ]}
                    onPress={() => setSelectedYear(item)}
                  >
                    <Text
                      style={[
                        styles.yearText,
                        selectedYear === item && styles.selectedYearText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item}
              />
            </View>

            {/* Months Grid */}
            <View style={styles.monthGrid}>
              <Text style={styles.columnHeader}>Month</Text>
              <View style={styles.monthsContainer}>
                {MONTHS.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.monthItem}
                    onPress={() => handleMonthSelect(month)}
                  >
                    <Text style={styles.monthText}>{month.slice(0, 3)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Journal Calendar</Text>
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => setCurrentMonth(today.toISOString().split("T")[0])}
          >
            <Ionicons
              name="today-outline"
              size={24}
              color={THEME.colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {/* {MOCK_MOOD_DATA.length} entries recorded */}
        </Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          maxDate={today.toISOString().split("T")[0]}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: THEME.colors.background,
            calendarBackground: THEME.colors.background,
            textSectionTitleColor: THEME.colors.mutedForeground,
            todayTextColor: THEME.colors.primary,
            todayBackgroundColor: `${THEME.colors.primary}20`,
            dayTextColor: THEME.colors.foreground,
            textDisabledColor: `${THEME.colors.mutedForeground}50`,
            monthTextColor: THEME.colors.foreground,
            arrowColor: THEME.colors.primary,
            dotColor: THEME.colors.primary,
            selectedDotColor: THEME.colors.primaryForeground,
            indicatorColor: THEME.colors.primary,
          }}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          {/* <Text style={styles.statNumber}>{MOCK_MOOD_DATA.length}</Text> */}
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {/* {
              MOCK_MOOD_DATA.filter(
                (entry) => new Date(entry.date).getMonth() === today.getMonth()
              ).length
            } */}
          </Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={THEME.colors.primary}
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Quick Guide</Text>
            <Text style={styles.infoText}>
              • Dots indicate recorded journal entries{"\n"}• Tap on any marked
              day to view details{"\n"}• Future dates are disabled
            </Text>
          </View>
        </View>
      </View>
      <DatePickerModal />
    </SafeAreaView>
  );
}
