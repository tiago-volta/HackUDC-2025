import { Dimensions, Platform, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";
const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    padding: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.colors.foreground,
  },
  todayButton: {
    padding: 8,
    borderRadius: THEME.radius.default,
    backgroundColor: `${THEME.colors.primary}10`,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.mutedForeground,
  },
  calendarContainer: {
    backgroundColor: THEME.colors.card,
    marginHorizontal: 20,
    borderRadius: THEME.radius.default,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
    padding: 16,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
    lineHeight: 20,
  },

  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: THEME.radius.default,
    backgroundColor: `${THEME.colors.primary}10`,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.radius.default,
    width: SCREEN_WIDTH - 40,
    maxHeight: SCREEN_WIDTH,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  modalCloseButton: {
    padding: 4,
  },
  datePickerContainer: {
    flexDirection: "row",
    height: 300,
  },
  yearColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
    paddingRight: 12,
  },
  monthGrid: {
    flex: 2,
    paddingLeft: 12,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginBottom: 12,
  },
  yearItem: {
    padding: 8,
    borderRadius: THEME.radius.default,
    marginBottom: 4,
  },
  selectedYear: {
    backgroundColor: THEME.colors.primary,
  },
  yearText: {
    fontSize: 16,
    color: THEME.colors.foreground,
  },
  selectedYearText: {
    color: THEME.colors.primaryForeground,
    fontWeight: "600",
  },
  monthsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  monthItem: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
  },
  monthText: {
    fontSize: 16,
    color: THEME.colors.foreground,
  },
});
