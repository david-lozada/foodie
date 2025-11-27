import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = () => {
    console.log("🔐 Login attempt:", { email, password: "***" });
    // Add your login logic here
    router.push("/");
  };

  const handleSignUp = () => {
    console.log("📝 Navigate to sign up");
    // Navigate to sign up screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-gradient-to-b from-primary-100 to-primary-200"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header Section */}
          <View className="mb-12">
            <Text className="text-5xl font-bold text-gray-800 mb-2">
              FOODIE
            </Text>
            <Text className="text-lg text-gray-600">
              Sign in to continue to Foodie
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-5">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                Username
              </Text>
              <View
                className={`bg-white rounded-2xl px-5 py-4 shadow-sm border-2 ${
                  focusedInput === "email"
                    ? "border-secondary-200"
                    : "border-transparent"
                }`}
              >
                <TextInput
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="text-base text-gray-800"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                Password
              </Text>
              <View
                className={`bg-white rounded-2xl px-5 py-4 shadow-sm border-2 flex-row items-center ${
                  focusedInput === "password"
                    ? "border-secondary-200"
                    : "border-transparent"
                }`}
              >
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoComplete="password"
                  className="flex-1 text-base text-gray-800"
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="ml-2"
                >
                  {({ pressed }) => (
                    <Text
                      className={`text-sm font-medium ${pressed ? "text-gray-700" : "text-gray-500"}`}
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Forgot Password */}
            <Pressable className="self-end">
              {({ pressed }) => (
                <Text
                  className={`font-semibold text-sm ${pressed ? "text-secondary-100" : "text-secondary-200"}`}
                >
                  Forgot Password?
                </Text>
              )}
            </Pressable>

            {/* Login Button */}
            <Pressable onPress={handleLogin} className="shadow-lg mt-4">
              {({ pressed }) => (
                <View
                  className={`rounded-2xl py-4 ${pressed ? "bg-secondary-100" : "bg-secondary-200"}`}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Sign In
                  </Text>
                </View>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 font-medium">
                or continue with
              </Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row gap-4">
              <Pressable className="flex-1">
                {({ pressed }) => (
                  <View
                    className={`bg-white rounded-2xl py-4 shadow-sm border border-gray-200 ${pressed ? "opacity-70" : "opacity-100"}`}
                  >
                    <Text className="text-center font-semibold text-gray-700">
                      🍎 Apple
                    </Text>
                  </View>
                )}
              </Pressable>
              <Pressable className="flex-1">
                {({ pressed }) => (
                  <View
                    className={`bg-white rounded-2xl py-4 shadow-sm border border-gray-200 ${pressed ? "opacity-70" : "opacity-100"}`}
                  >
                    <Text className="text-center font-semibold text-gray-700">
                      🔍 Google
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600 text-base">
              Don't have an account?{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
