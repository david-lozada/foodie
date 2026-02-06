import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  Colors,
  BrandColors,
  Spacing,
  BorderRadius,
  Shadows,
} from "@/constants/theme";

const { width, height } = Dimensions.get("window");

const createWelcomeStyles = (theme: typeof Colors.light) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    gradientBackground: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: height * 0.65,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
      justifyContent: "space-between",
      paddingTop: Platform.OS === "ios" ? 80 : 60,
      paddingBottom: Platform.OS === "ios" ? 50 : 40,
    },
    topSection: {
      alignItems: "center",
    },
    logoContainer: {
      width: 120,
      height: 120,
      borderRadius: BorderRadius.full,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.xl,
      ...Shadows.lg,
    },
    logoText: {
      fontSize: 54,
      fontWeight: "900",
      color: BrandColors.crimson,
      letterSpacing: -2,
    },
    accentDotsContainer: {
      flexDirection: "row",
      position: "absolute",
      top: 20,
      right: 20,
      gap: 6,
    },
    accentDot: {
      width: 10,
      height: 10,
      borderRadius: BorderRadius.full,
    },
    brandName: {
      fontSize: 56,
      fontWeight: "900",
      color: "#2D2D2D",
      letterSpacing: -2,
      marginBottom: Spacing.sm,
      textAlign: "center",
    },
    tagline: {
      fontSize: 20,
      color: "#4A4A4A",
      textAlign: "center",
      fontWeight: "600",
      lineHeight: 28,
      marginBottom: Spacing.xxl,
    },
    bottomSection: {
      gap: Spacing.md,
    },
    primaryButton: {
      backgroundColor: BrandColors.crimson,
      height: 60,
      borderRadius: BorderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      ...Shadows.lg,
    },
    primaryButtonPressed: {
      backgroundColor: BrandColors.crimsonDark,
      transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
      fontSize: 18,
      fontWeight: "800",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },
    secondaryButton: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      height: 60,
      borderRadius: BorderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: BrandColors.mintGreen,
      ...Shadows.md,
    },
    secondaryButtonPressed: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transform: [{ scale: 0.98 }],
    },
    secondaryButtonText: {
      fontSize: 18,
      fontWeight: "800",
      color: BrandColors.crimson,
      letterSpacing: 0.5,
    },
    decorativeCircle: {
      position: "absolute",
      borderRadius: BorderRadius.full,
    },
    decorativeCircle1: {
      width: 200,
      height: 200,
      backgroundColor: "rgba(253, 171, 158, 0.2)",
      top: -50,
      right: -50,
    },
    decorativeCircle2: {
      width: 150,
      height: 150,
      backgroundColor: "rgba(255, 240, 189, 0.3)",
      bottom: height * 0.4,
      left: -40,
    },
    decorativeCircle3: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(199, 219, 156, 0.25)",
      top: height * 0.25,
      right: 30,
    },
  });
};

export default createWelcomeStyles;
