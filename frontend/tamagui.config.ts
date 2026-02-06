import { createTamagui } from "tamagui";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/config/v3";
import { createInterFont } from "@tamagui/font-inter";

// FOODIE Brand Colors
const brandColors = {
  mintGreen: "#C7DB9C",
  mintGreenDark: "#A8BC7D",
  cream: "#FFF0BD",
  creamDark: "#E6D7A4",
  coral: "#FDAB9E",
  coralDark: "#E48C7F",
  crimson: "#E50046",
  crimsonDark: "#C60039",
};

// Create custom font
const headingFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    11: 56,
    12: 64,
  },
  weight: {
    1: "300",
    2: "400",
    3: "500",
    4: "600",
    5: "700",
    6: "800",
    7: "900",
  },
});

const bodyFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
  },
  weight: {
    1: "300",
    2: "400",
    3: "500",
    4: "600",
    5: "700",
  },
});

// Custom tokens for FOODIE
const customTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    // FOODIE brand colors
    brandMintGreen: brandColors.mintGreen,
    brandMintGreenDark: brandColors.mintGreenDark,
    brandCream: brandColors.cream,
    brandCreamDark: brandColors.creamDark,
    brandCoral: brandColors.coral,
    brandCoralDark: brandColors.coralDark,
    brandCrimson: brandColors.crimson,
    brandCrimsonDark: brandColors.crimsonDark,

    // Semantic colors
    primary: brandColors.crimson,
    primaryHover: brandColors.crimsonDark,
    secondary: brandColors.mintGreen,
    secondaryHover: brandColors.mintGreenDark,
    accent: brandColors.coral,
    accentHover: brandColors.coralDark,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 9999,
  },
};

// Custom themes for FOODIE
const customLightTheme = {
  ...themes.light,
  background: "#FFFFFF",
  backgroundStrong: "#F8F8F8",
  backgroundHover: "#F5F5F5",
  backgroundPress: "#EEEEEE",
  backgroundFocus: "#FFFFFF",

  color: "#2D2D2D",
  colorHover: "#1A1A1A",
  colorPress: "#000000",
  colorFocus: "#2D2D2D",

  colorTransparent: "rgba(0,0,0,0)",

  borderColor: "#E0E0E0",
  borderColorHover: "#D0D0D0",
  borderColorPress: brandColors.crimson,
  borderColorFocus: brandColors.crimson,

  placeholderColor: "#6B6B6B",

  // FOODIE specific
  primary: brandColors.crimson,
  primaryHover: brandColors.crimsonDark,
  secondary: brandColors.mintGreen,
  secondaryHover: brandColors.mintGreenDark,
  accent: brandColors.coral,
  accentHover: brandColors.coralDark,
};

const customDarkTheme = {
  ...themes.dark,
  background: "#151718",
  backgroundStrong: "#1E1E1E",
  backgroundHover: "#2A2A2A",
  backgroundPress: "#333333",
  backgroundFocus: "#151718",

  color: "#ECEDEE",
  colorHover: "#FFFFFF",
  colorPress: "#FFFFFF",
  colorFocus: "#ECEDEE",

  colorTransparent: "rgba(0,0,0,0)",

  borderColor: "#3A3A3A",
  borderColorHover: "#4A4A4A",
  borderColorPress: brandColors.coral,
  borderColorFocus: brandColors.coral,

  placeholderColor: "#A0A0A0",

  // FOODIE specific
  primary: brandColors.coral,
  primaryHover: brandColors.coralDark,
  secondary: brandColors.mintGreen,
  secondaryHover: brandColors.mintGreenDark,
  accent: brandColors.cream,
  accentHover: brandColors.creamDark,
};

const config = createTamagui({
  themes: {
    light: customLightTheme,
    dark: customDarkTheme,
  },
  tokens: customTokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shorthands,
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
