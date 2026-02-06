import { StyleSheet, Platform } from "react-native";
import {
  Colors,
  BrandColors,
  Spacing,
  BorderRadius,
  Shadows,
} from "@/constants/theme";

const createRegisterStyles = (theme: typeof Colors.light) => {
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
      backgroundColor: BrandColors.mintGreen,
      borderBottomLeftRadius: BorderRadius.xl,
      borderBottomRightRadius: BorderRadius.xl,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
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
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.md,
      ...Shadows.md,
    },
    logoText: {
      fontSize: 32,
      fontWeight: "900",
      color: BrandColors.crimson,
      letterSpacing: -1,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: "#2D2D2D",
      marginBottom: Spacing.xs,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#4A4A4A",
      textAlign: "center",
      fontWeight: "500",
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.lg,
    },
    inputGroup: {
      marginBottom: Spacing.md,
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
      borderColor: BrandColors.mintGreen,
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
    passwordStrengthContainer: {
      marginTop: Spacing.sm,
      marginLeft: Spacing.xs,
    },
    passwordStrengthBar: {
      height: 4,
      backgroundColor: theme.inputBorder,
      borderRadius: BorderRadius.sm,
      overflow: "hidden",
      marginBottom: Spacing.xs,
    },
    passwordStrengthFill: {
      height: "100%",
      borderRadius: BorderRadius.sm,
    },
    passwordStrengthText: {
      fontSize: 12,
      fontWeight: "600",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: Spacing.lg,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: BorderRadius.sm,
      borderWidth: 2,
      borderColor: theme.inputBorder,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.sm,
      backgroundColor: theme.background,
    },
    checkboxChecked: {
      backgroundColor: BrandColors.mintGreen,
      borderColor: BrandColors.mintGreen,
    },
    checkboxText: {
      flex: 1,
      fontSize: 14,
      color: theme.textSecondary,
      flexWrap: "wrap",
    },
    termsLink: {
      color: theme.primary,
      fontWeight: "600",
    },
    registerButton: {
      backgroundColor: BrandColors.mintGreen,
      height: 56,
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      marginTop: Spacing.md,
      ...Shadows.lg,
    },
    registerButtonPressed: {
      backgroundColor: BrandColors.mintGreenDark,
      transform: [{ scale: 0.98 }],
    },
    registerButtonDisabled: {
      opacity: 0.6,
    },
    registerButtonText: {
      fontSize: 18,
      fontWeight: "700",
      color: "#2D2D2D",
      letterSpacing: 0.5,
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Spacing.lg,
      gap: Spacing.xs,
    },
    loginText: {
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    loginLink: {
      fontSize: 15,
      color: theme.primary,
      fontWeight: "700",
    },
    accentDots: {
      flexDirection: "row",
      position: "absolute",
      top: 16,
      right: 16,
      gap: 4,
    },
    accentDot: {
      width: 6,
      height: 6,
      borderRadius: BorderRadius.full,
    },
  });
};

export default createRegisterStyles;
