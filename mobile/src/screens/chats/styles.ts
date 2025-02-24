import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "../../constants/theme";

const { width } = Dimensions.get("window");

const BOTTOM_TAB_HEIGHT = 56;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: THEME.spacing.medium,
    paddingTop: THEME.spacing.large,
    backgroundColor: THEME.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.mutedForeground,
  },
  chatList: {
    paddingHorizontal: THEME.spacing.medium,
    paddingBottom: 100, // Space for FAB
  },
  chatCard: {
    flexDirection: "row",
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
    borderWidth: 1,
    borderColor: THEME.colors.border,
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
  // FAB Styles
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
  // Chat item styles
  chatIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.muted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: THEME.spacing.medium,
  },
  chatContent: {
    flex: 1,
    justifyContent: "center",
  },
  chatPreview: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
    lineHeight: 20,
  },
  // Date section styles
  dateSection: {
    marginVertical: THEME.spacing.small,
  },
  dateDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: THEME.spacing.medium,
  },
  dateSectionTitle: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
    fontWeight: "500",
    paddingHorizontal: THEME.spacing.medium,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.colors.border,
  },
  // Empty state styles
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: THEME.spacing.large,
    marginTop: width * 0.2,
  },
  emptyStateText: {
    marginTop: THEME.spacing.medium,
    fontSize: 16,
    color: THEME.colors.mutedForeground,
    textAlign: "center",
    lineHeight: 24,
  },
  deleteButton: {
    padding: 8,
    marginRight: -8,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
    flex: 1, // This ensures the title takes up available space
    marginRight: 8, // Add some spacing between title and delete button
  },
});
