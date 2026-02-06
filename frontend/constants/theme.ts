/**
 * FOODIE Brand Design System
 * Color palette and theme configuration for the FOODIE SaaS application
 */

import { Platform } from "react-native";

// FOODIE Brand Color Palette
export const BrandColors = {
  mintGreen: "#C7DB9C", // Primary - Fresh, healthy
  cream: "#FFF0BD", // Secondary - Warm, inviting
  coral: "#FDAB9E", // Accent - Appetizing
  crimson: "#E50046", // Action - Bold, energetic
  // Complementary shades
  mintGreenDark: "#A8BC7D",
  creamDark: "#E6D7A4",
  coralDark: "#E48C7F",
  crimsonDark: "#C60039",
};

export const Colors = {
  light: {
    text: "#2D2D2D",
    textSecondary: "#6B6B6B",
    background: "#FFFFFF",
    backgroundSecondary: "#F8F8F8",
    tint: BrandColors.crimson,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: BrandColors.crimson,
    // Auth specific colors
    primary: BrandColors.crimson,
    primaryHover: BrandColors.crimsonDark,
    secondary: BrandColors.mintGreen,
    accent: BrandColors.coral,
    inputBackground: "#F5F5F5",
    inputBorder: "#E0E0E0",
    inputBorderFocus: BrandColors.crimson,
    error: "#D32F2F",
    success: BrandColors.mintGreen,
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#A0A0A0",
    background: "#151718",
    backgroundSecondary: "#1E1E1E",
    tint: BrandColors.coral,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: BrandColors.coral,
    // Auth specific colors
    primary: BrandColors.coral,
    primaryHover: BrandColors.coralDark,
    secondary: BrandColors.mintGreen,
    accent: BrandColors.cream,
    inputBackground: "#2A2A2A",
    inputBorder: "#3A3A3A",
    inputBorderFocus: BrandColors.coral,
    error: "#EF5350",
    success: BrandColors.mintGreen,
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Design System Tokens
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
