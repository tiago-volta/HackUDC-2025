import { StyleSheet, Platform } from "react-native";
import { THEME } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  messagesList: {
    padding: THEME.spacing.medium,
  },
  messageContainer: {
    marginBottom: THEME.spacing.medium,
    flexDirection: "row",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  botMessage: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: THEME.radius.default,
    padding: THEME.spacing.medium,
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.foreground,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userMessageBubble: {
    backgroundColor: THEME.colors.primary,
  },
  botMessageBubble: {
    backgroundColor: THEME.colors.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: THEME.colors.primaryForeground,
  },
  botMessageText: {
    color: THEME.colors.foreground,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  userMessageTime: {
    color: THEME.colors.primaryForeground,
    opacity: 0.8,
    textAlign: "right",
  },
  botMessageTime: {
    color: THEME.colors.mutedForeground,
    textAlign: "right",
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    padding: THEME.spacing.small,
    marginLeft: THEME.spacing.medium,
  },
  typingText: {
    color: THEME.colors.mutedForeground,
    fontSize: 14,
    marginRight: THEME.spacing.small,
  },
  typingDots: {
    marginLeft: THEME.spacing.small,
  },
  inputContainer: {
    flexDirection: "row",
    padding: THEME.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    backgroundColor: THEME.colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: THEME.colors.muted,
    borderRadius: THEME.radius.default,
    padding: THEME.spacing.medium,
    marginRight: THEME.spacing.medium,
    color: THEME.colors.foreground,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sendButtonDisabled: {
    backgroundColor: THEME.colors.muted,
  },
});
