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
    padding: 20,
    backgroundColor: THEME.colors.primary,
    borderBottomLeftRadius: THEME.radius.default,
    borderBottomRightRadius: THEME.radius.default,
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
    opacity: 0.8,
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.default,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: THEME.colors.foreground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.colors.foreground,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
  },
});
