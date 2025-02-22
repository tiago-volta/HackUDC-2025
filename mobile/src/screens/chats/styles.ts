import { StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    padding: THEME.spacing.medium,
    backgroundColor: THEME.colors.background,
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
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary,
    margin: THEME.spacing.medium,
    padding: THEME.spacing.medium,
    borderRadius: THEME.radius.default,
    shadowColor: THEME.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newChatButtonText: {
    color: THEME.colors.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: THEME.spacing.small,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: THEME.spacing.medium,
    marginVertical: THEME.spacing.medium,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.colors.border,
  },
  dividerText: {
    color: THEME.colors.mutedForeground,
    paddingHorizontal: THEME.spacing.medium,
    fontSize: 14,
    fontWeight: "500",
  },
  chatList: {
    padding: THEME.spacing.medium,
  },
  chatCard: {
    flexDirection: "row",
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: THEME.colors.foreground,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.muted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: THEME.spacing.medium,
  },
  unreadBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.colors.accent,
    borderWidth: 2,
    borderColor: THEME.colors.background,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  chatTimestamp: {
    fontSize: 12,
    color: THEME.colors.mutedForeground,
  },
  chatPreview: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: THEME.spacing.large,
  },
  emptyStateText: {
    marginTop: THEME.spacing.medium,
    fontSize: 16,
    color: THEME.colors.mutedForeground,
    textAlign: "center",
    lineHeight: 24,
  },
});
