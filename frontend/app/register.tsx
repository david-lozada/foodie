import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  YStack,
  XStack,
  Text,
  Circle,
  Button,
  Input,
  Label,
  Spinner,
  useTheme,
  Theme,
  Checkbox,
} from "tamagui";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleRegister = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    // TODO: Implement actual registration logic
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register:", { fullName, email, password });
    }, 1500);
  };

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { strength: 0, label: "", color: "$borderColor" };
    if (pass.length < 6)
      return { strength: 0.25, label: "Weak", color: "#EF5350" };
    if (pass.length < 10)
      return { strength: 0.5, label: "Fair", color: "#FFA726" };
    if (pass.length < 14)
      return { strength: 0.75, label: "Good", color: "#66BB6A" };
    return { strength: 1, label: "Strong", color: "$brandMintGreen" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <Theme name={colorScheme ?? "light"}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.background?.get() }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section with Brand */}
          <YStack
            paddingTop={Platform.OS === "ios" ? 60 : 40}
            paddingHorizontal="$8"
            paddingBottom="$10"
            backgroundColor="$brandMintGreen"
            borderTopLeftRadius="$8"
            borderTopRightRadius="$8"
            borderBottomLeftRadius="$8"
            borderBottomRightRadius="$8"
          >
            <Button
              size="$3"
              circular
              backgroundColor="rgba(255, 255, 255, 0.3)"
              icon={<Ionicons name="arrow-back" size={24} color="#2D2D2D" />}
              onPress={() => router.back()}
              marginBottom="$5"
              pressStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            />

            <YStack alignItems="center" marginBottom="$2">
              <Circle
                size={80}
                backgroundColor="rgba(255, 255, 255, 0.98)"
                justifyContent="center"
                alignItems="center"
                marginBottom="$4"
                elevation="$4"
              >
                <Text
                  fontSize={32}
                  fontWeight="900"
                  color="$brandCrimson"
                  letterSpacing={-1}
                >
                  F
                </Text>
                <XStack position="absolute" top={16} right={16} gap="$1">
                  <Circle size={6} backgroundColor="$brandCoral" />
                  <Circle size={6} backgroundColor="$brandCrimson" />
                </XStack>
              </Circle>
              <Text
                fontSize={32}
                fontWeight="800"
                color="#2D2D2D"
                marginBottom="$1"
                textAlign="center"
                letterSpacing={-1}
              >
                Join FOODIE
              </Text>
              <Text
                fontSize={16}
                color="#4A4A4A"
                textAlign="center"
                fontWeight="500"
              >
                Start your delicious journey today
              </Text>
            </YStack>
          </YStack>

          {/* Form Section */}
          <YStack
            flex={1}
            paddingHorizontal="$8"
            paddingTop="$6"
            paddingBottom="$8"
          >
            {/* Full Name Input */}
            <YStack marginBottom="$3">
              <Label
                fontSize={14}
                fontWeight="600"
                color="$color"
                marginBottom="$1"
                marginLeft="$1"
              >
                Full Name
              </Label>
              <XStack
                alignItems="center"
                backgroundColor="$backgroundStrong"
                borderRadius="$3"
                borderWidth={2}
                borderColor={
                  fullNameFocused ? "$brandMintGreen" : "$borderColor"
                }
                paddingHorizontal="$4"
                height={56}
                elevation="$1"
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={
                    fullNameFocused
                      ? theme.secondary?.get()
                      : theme.placeholderColor?.get()
                  }
                />
                <Input
                  flex={1}
                  fontSize={16}
                  color="$color"
                  placeholder="John Doe"
                  placeholderTextColor="$placeholderColor"
                  borderWidth={0}
                  backgroundColor="transparent"
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                  autoCapitalize="words"
                />
              </XStack>
            </YStack>

            {/* Email Input */}
            <YStack marginBottom="$3">
              <Label
                fontSize={14}
                fontWeight="600"
                color="$color"
                marginBottom="$1"
                marginLeft="$1"
              >
                Email Address
              </Label>
              <XStack
                alignItems="center"
                backgroundColor="$backgroundStrong"
                borderRadius="$3"
                borderWidth={2}
                borderColor={emailFocused ? "$brandMintGreen" : "$borderColor"}
                paddingHorizontal="$4"
                height={56}
                elevation="$1"
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={
                    emailFocused
                      ? theme.secondary?.get()
                      : theme.placeholderColor?.get()
                  }
                />
                <Input
                  flex={1}
                  fontSize={16}
                  color="$color"
                  placeholder="you@example.com"
                  placeholderTextColor="$placeholderColor"
                  borderWidth={0}
                  backgroundColor="transparent"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </XStack>
            </YStack>

            {/* Password Input */}
            <YStack marginBottom="$3">
              <Label
                fontSize={14}
                fontWeight="600"
                color="$color"
                marginBottom="$1"
                marginLeft="$1"
              >
                Password
              </Label>
              <XStack
                alignItems="center"
                backgroundColor="$backgroundStrong"
                borderRadius="$3"
                borderWidth={2}
                borderColor={
                  passwordFocused ? "$brandMintGreen" : "$borderColor"
                }
                paddingHorizontal="$4"
                height={56}
                elevation="$1"
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={
                    passwordFocused
                      ? theme.secondary?.get()
                      : theme.placeholderColor?.get()
                  }
                />
                <Input
                  flex={1}
                  fontSize={16}
                  color="$color"
                  placeholder="Create a strong password"
                  placeholderTextColor="$placeholderColor"
                  borderWidth={0}
                  backgroundColor="transparent"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Button
                  chromeless
                  size="$3"
                  icon={
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={theme.placeholderColor?.get()}
                    />
                  }
                  onPress={() => setShowPassword(!showPassword)}
                />
              </XStack>
              {password.length > 0 && (
                <YStack marginTop="$2" marginLeft="$1">
                  <YStack
                    height={4}
                    backgroundColor="$borderColor"
                    borderRadius="$1"
                    overflow="hidden"
                    marginBottom="$1"
                  >
                    <YStack
                      height="100%"
                      width={`${passwordStrength.strength * 100}%`}
                      backgroundColor={passwordStrength.color}
                      borderRadius="$1"
                    />
                  </YStack>
                  <Text
                    fontSize={12}
                    fontWeight="600"
                    color={passwordStrength.color}
                  >
                    {passwordStrength.label}
                  </Text>
                </YStack>
              )}
            </YStack>

            {/* Confirm Password Input */}
            <YStack marginBottom="$4">
              <Label
                fontSize={14}
                fontWeight="600"
                color="$color"
                marginBottom="$2"
                marginLeft="$1"
              >
                Confirm Password
              </Label>
              <XStack
                alignItems="center"
                backgroundColor="$backgroundStrong"
                borderRadius="$3"
                borderWidth={2}
                borderColor={
                  confirmPasswordFocused ? "$brandMintGreen" : "$borderColor"
                }
                paddingHorizontal="$4"
                height={56}
                elevation="$1"
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={
                    confirmPasswordFocused
                      ? theme.secondary?.get()
                      : theme.placeholderColor?.get()
                  }
                />
                <Input
                  flex={1}
                  fontSize={16}
                  color="$color"
                  placeholder="Re-enter your password"
                  placeholderTextColor="$placeholderColor"
                  borderWidth={0}
                  backgroundColor="transparent"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <Button
                  chromeless
                  size="$3"
                  icon={
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      color={theme.placeholderColor?.get()}
                    />
                  }
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </XStack>
            </YStack>

            {/* Terms & Conditions */}
            <XStack alignItems="center" marginBottom="$6" gap="$3">
              <Checkbox
                size="$4"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked === true)
                }
              >
                <Checkbox.Indicator>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </Checkbox.Indicator>
              </Checkbox>
              <Text
                fontSize={14}
                color="$color"
                opacity={0.7}
                flex={1}
                flexWrap="wrap"
              >
                I agree to the{" "}
                <Text color="$primary" fontWeight="600">
                  Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text color="$primary" fontWeight="600">
                  Privacy Policy
                </Text>
              </Text>
            </XStack>

            {/* Register Button */}
            <Button
              backgroundColor="$brandMintGreen"
              height={56}
              borderRadius="$3"
              disabled={isLoading}
              onPress={handleRegister}
              pressStyle={{
                backgroundColor: "$brandMintGreenDark",
                scale: 0.98,
              }}
              elevation="$4"
              opacity={isLoading ? 0.6 : 1}
            >
              {isLoading ? (
                <Spinner color="#2D2D2D" size="small" />
              ) : (
                <Text
                  color="#2D2D2D"
                  fontSize={18}
                  fontWeight="700"
                  letterSpacing={0.5}
                >
                  Create Account
                </Text>
              )}
            </Button>

            {/* Login Link */}
            <XStack
              justifyContent="center"
              alignItems="center"
              paddingVertical="$4"
              gap="$1"
            >
              <Text fontSize={15} color="$color" opacity={0.7} fontWeight="500">
                Already have an account?
              </Text>
              <Button
                chromeless
                padding={0}
                onPress={() => router.push("/login" as any)}
              >
                <Text fontSize={15} color="$primary" fontWeight="700">
                  Sign In
                </Text>
              </Button>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Theme>
  );
}
