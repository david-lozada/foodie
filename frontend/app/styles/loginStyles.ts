import { StyleSheet, Platform } from "react-native";
import {
  Colors,
  BrandColors,
  Spacing,
  BorderRadius,
  Shadows,
} from "@/constants/theme";

const createLoginStyles = (theme: typeof Colors.light) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxl,
      backgroundColor: theme.primary,
      borderBottomLeftRadius: BorderRadius.xl,
      borderBottomRightRadius: BorderRadius.xl,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.lg,
    },
    brandContainer: {
      alignItems: "center",
      marginBottom: Spacing.md,
    },
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: BorderRadius.full,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.md,
      ...Shadows.md,
    },
    logoText: {
      fontSize: 32,
      fontWeight: "900",
      color: theme.primary,
      letterSpacing: -1,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: Spacing.xs,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.9)",
      textAlign: "center",
      fontWeight: "500",
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xxl,
    },
    inputGroup: {
      marginBottom: Spacing.lg,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginBottom: Spacing.sm,
      marginLeft: Spacing.xs,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.inputBackground,
      borderRadius: BorderRadius.md,
      borderWidth: 2,
      borderColor: theme.inputBorder,
      paddingHorizontal: Spacing.md,
      height: 56,
      ...Shadows.sm,
    },
    inputContainerFocused: {
      borderColor: theme.inputBorderFocus,
      backgroundColor: theme.background,
      ...Shadows.md,
    },
    inputIcon: {
      marginRight: Spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      fontWeight: "500",
    },
    eyeButton: {
      padding: Spacing.sm,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginTop: -Spacing.sm,
      marginBottom: Spacing.lg,
    },
    forgotPasswordText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: "600",
    },
    loginButton: {
      backgroundColor: theme.primary,
      height: 56,
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: Spacing.md,
      ...Shadows.lg,
    },
    loginButtonPressed: {
      backgroundColor: theme.primaryHover,
      transform: [{ scale: 0.98 }],
    },
    loginButtonDisabled: {
      opacity: 0.6,
    },
    loginButtonText: {
      fontSize: 18,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },
    registerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Spacing.xl,
      gap: Spacing.xs,
    },
    registerText: {
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    registerLink: {
      fontSize: 15,
      color: theme.primary,
      fontWeight: "700",
    },
    accentDot: {
      width: 8,
      height: 8,
      borderRadius: BorderRadius.full,
      backgroundColor: BrandColors.coral,
      position: "absolute",
      top: 12,
      right: 12,
    },
  });
};

export default createLoginStyles;
