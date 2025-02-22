import { StyleSheet, Platform, Dimensions } from "react-native";
import { THEME } from "../../constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  keyboardContainer: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  chatListContainer: {},
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add bottom padding for scroll content
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: THEME.colors.foreground,
  },
  noteContainer: {
    backgroundColor: THEME.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  noteLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginBottom: 8,
  },
  noteInput: {
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
    color: THEME.colors.foreground,
    padding: 8,
    backgroundColor: THEME.colors.muted,
    borderRadius: 8,
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderColor: THEME.colors.border,
    gap: 8,
  },
  clearButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.destructive,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.destructiveForeground,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.primaryForeground,
  },
  historyContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 12,
  },
  // Chat styles
  chatList: {},
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
  dateSection: {
    paddingHorizontal: THEME.spacing.medium,
    marginVertical: THEME.spacing.small,
  },
  dateDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: THEME.spacing.small,
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
  // Evaluation
  evaluationContainer: {
    backgroundColor: THEME.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  evaluationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  evaluationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.foreground,
    marginLeft: 8,
  },
  moodIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.muted,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  moodScore: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  moodLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  justificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    marginTop: 16,
  },
  justificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  justificationContent: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  justificationText: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
    lineHeight: 20,
  },
});
