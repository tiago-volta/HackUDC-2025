import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "../../constants/theme";

const { width } = Dimensions.get("window");

const BOTTOM_TAB_HEIGHT = 90;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for FAB
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: THEME.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.colors.primaryForeground,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.primaryForeground,
    opacity: 0.9,
  },
  moodCard: {
    margin: 20,
    padding: 20,
    backgroundColor: THEME.colors.card,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  moodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  moodAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moodActionText: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: "500",
  },
  moodContent: {
    alignItems: "center",
  },
  moodChart: {
    alignItems: "center",
    marginBottom: 12,
  },
  moodScore: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.colors.primary,
    marginTop: 8,
  },
  moodText: {
    fontSize: 16,
    color: THEME.colors.mutedForeground,
  },
  statsCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: THEME.colors.card,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${THEME.colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.colors.mutedForeground,
  },
  quickActions: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: THEME.colors.card,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${THEME.colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: THEME.colors.foreground,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom:
      Platform.OS === "ios" ? 32 + BOTTOM_TAB_HEIGHT : 24 + BOTTOM_TAB_HEIGHT,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  fabText: {
    color: THEME.colors.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
});
