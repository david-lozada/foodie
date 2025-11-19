module.exports = function (api) {
  api.cache(true);
  return {
    // We keep the base Expo preset first.
    presets: [
      "babel-preset-expo",
      // Use the modern 'nativewind/babel' preset.
      // This single preset handles the necessary CSS-in-JS transformation
      // and correctly sets the JSX runtime to 'react-native-css-interop/jsx-runtime'.
      "nativewind/babel",
    ],
    // Ensure you also have the necessary plugins for reanimated if you use it (you do)
    plugins: ["react-native-reanimated/plugin"],
  };
};
