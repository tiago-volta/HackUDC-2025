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
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
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
  chatList: {
    paddingBottom: 20,
  },
  chatMessageContainer: {
    marginBottom: 12,
    flexDirection: "row",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  botMessage: {
    justifyContent: "flex-start",
  },
  chatBubble: {
    maxWidth: "80%",
    borderRadius: 12,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  userBubble: {
    backgroundColor: THEME.colors.primary,
  },
  botBubble: {
    backgroundColor: THEME.colors.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  chatMessageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: THEME.colors.primaryForeground,
  },
  botMessageText: {
    color: THEME.colors.foreground,
  },
  chatTimestamp: {
    fontSize: 12,
    color: THEME.colors.mutedForeground,
    textAlign: "right",
    marginTop: 4,
  },
});
