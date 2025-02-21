import { StyleSheet } from "react-native";
import { THEME } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: THEME.colors.primary,
    borderBottomLeftRadius: THEME.radius.default,
    borderBottomRightRadius: THEME.radius.default,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.primaryForeground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: THEME.colors.primary,
  },
  email: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.colors.primaryForeground,
    marginBottom: 8,
  },
  role: {
    fontSize: 16,
    color: THEME.colors.primaryForeground,
    opacity: 0.8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.card,
    padding: 16,
    borderRadius: THEME.radius.default,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: THEME.colors.foreground,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.destructive,
    padding: 16,
    borderRadius: THEME.radius.default,
    margin: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.colors.destructiveForeground,
    marginLeft: 8,
  },
});
