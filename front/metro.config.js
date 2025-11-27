let getDefaultConfig;
let withNativeWind;

try {
  // Prefer Expo's metro config when available
  ({ getDefaultConfig } = require("expo/metro-config"));
} catch (e) {
  try {
    // Some setups use the scoped package name
    ({ getDefaultConfig } = require("@expo/metro-config"));
  } catch (e2) {
    // Fallback: create a minimal default config so Metro can start
    // This keeps the config loadable inside containers where expo packages
    // may not be installed or resolvable during the build/start step.
    getDefaultConfig = () => ({
      resolver: {
        sourceExts: ["js", "jsx", "ts", "tsx", "json"],
      },
    });
    console.warn(
      "Warning: expo metro-config not found; using a minimal fallback config.",
    );
  }
}

try {
  ({ withNativeWind } = require("nativewind/metro"));
} catch (e) {
  // If nativewind is not available, use identity function so config is unchanged
  withNativeWind = (config) => config;
  console.warn(
    "Warning: nativewind/metro not found; continuing without nativewind integration.",
  );
}

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
