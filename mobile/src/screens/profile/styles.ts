import { StyleSheet, Platform } from "react-native";
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.primaryForeground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: THEME.colors.background,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: THEME.colors.primary,
  },
  nationalityBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: THEME.colors.background,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  nationalityText: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME.colors.primaryForeground,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: THEME.colors.primaryForeground,
    opacity: 0.9,
  },
  infoCard: {
    margin: 20,
    backgroundColor: THEME.colors.card,
    borderRadius: 20,
    padding: 20,
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
  infoSection: {
    gap: 16,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.foreground,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: THEME.colors.mutedForeground,
  },
  infoValue: {
    fontSize: 16,
    color: THEME.colors.foreground,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    width: "30%",
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
    color: THEME.colors.foreground,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: THEME.colors.mutedForeground,
  },
  actionButtons: {
    padding: 20,
    gap: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary,
    padding: 16,
    borderRadius: THEME.radius.default,
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.colors.primaryForeground,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.destructive,
    padding: 16,
    borderRadius: THEME.radius.default,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME.colors.destructiveForeground,
  },
});
