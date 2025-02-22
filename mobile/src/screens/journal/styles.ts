import { Platform, StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.mutedForeground,
  },
  calendarContainer: {
    backgroundColor: THEME.colors.card,
    margin: 20,
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
  legendContainer: {
    padding: 20,
    marginTop: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  calendarHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
  },
});
