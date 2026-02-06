import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { YStack, XStack, Text, Circle, Button, useTheme, Theme } from "tamagui";
import { Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Theme name="light">
      <YStack flex={1} backgroundColor="$background" position="relative">
        <StatusBar style="dark" />

        {/* Gradient Background */}
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={height * 0.65}
          overflow="hidden"
        >
          <LinearGradient
            colors={["#FFF0BD", "#C7DB9C", "#FDAB9E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </YStack>

        {/* Decorative Background Circles */}
        <Circle
          size={200}
          backgroundColor="rgba(253, 171, 158, 0.2)"
          position="absolute"
          top={-50}
          right={-50}
        />
        <Circle
          size={150}
          backgroundColor="rgba(255, 240, 189, 0.3)"
          position="absolute"
          bottom={height * 0.4}
          left={-40}
        />
        <Circle
          size={100}
          backgroundColor="rgba(199, 219, 156, 0.25)"
          position="absolute"
          top={height * 0.25}
          right={30}
        />

        <YStack
          flex={1}
          paddingHorizontal="$8"
          justifyContent="space-between"
          paddingTop={Platform.OS === "ios" ? 80 : 60}
          paddingBottom={Platform.OS === "ios" ? 50 : 40}
        >
          {/* Top Section - Logo & Branding */}
          <YStack alignItems="center">
            <YStack
              width={120}
              height={120}
              borderRadius="$9"
              backgroundColor="#FFFFFF"
              justifyContent="center"
              alignItems="center"
              marginBottom="$6"
              elevation="$4"
              position="relative"
            >
              <Text
                fontWeight="900"
                fontSize={54}
                color="$brandCrimson"
                letterSpacing={-2}
              >
                F
              </Text>
              <XStack position="absolute" top={20} right={20} gap="$1.5">
                <Circle size={10} backgroundColor="$brandCoral" />
                <Circle size={10} backgroundColor="$brandCrimson" />
                <Circle size={10} backgroundColor="$brandMintGreen" />
              </XStack>
            </YStack>

            <Text
              fontSize={56}
              fontWeight="900"
              color="#2D2D2D"
              letterSpacing={-2}
              marginBottom="$2"
              textAlign="center"
            >
              FOODIE
            </Text>
            <Text
              fontSize={20}
              color="#4A4A4A"
              textAlign="center"
              fontWeight="600"
              lineHeight={28}
              marginBottom="$10"
            >
              Your culinary companion for discovering, cooking, and sharing
              delicious moments
            </Text>
          </YStack>

          {/* Bottom Section - CTA Buttons */}
          <YStack gap="$4">
            <Button
              backgroundColor="$brandCrimson"
              height={60}
              borderRadius="$4"
              pressStyle={{ scale: 0.98, backgroundColor: "$brandCrimsonDark" }}
              onPress={() => router.push("/register" as any)}
            >
              <Text
                color="#FFFFFF"
                fontSize={18}
                fontWeight="800"
                letterSpacing={0.5}
              >
                Get Started
              </Text>
            </Button>

            <Button
              backgroundColor="rgba(255, 255, 255, 0.95)"
              height={60}
              borderRadius="$4"
              borderWidth={2}
              borderColor="$brandMintGreen"
              pressStyle={{
                scale: 0.98,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onPress={() => router.push("/login" as any)}
            >
              <Text
                color="$brandCrimson"
                fontSize={18}
                fontWeight="800"
                letterSpacing={0.5}
              >
                Sign In
              </Text>
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </Theme>
  );
}
