import { Image } from "expo-image";
import { Platform } from "react-native";
import { Link } from "expo-router";
import { YStack, XStack, Text, Theme, Button } from "tamagui";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <Theme name={colorScheme ?? "light"}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={{
              height: 178,
              width: 290,
              bottom: 0,
              left: 0,
              position: "absolute",
            }}
          />
        }
      >
        <XStack alignItems="center" gap="$2">
          <Text fontSize={32} fontWeight="700" color="$color">
            Welcome!
          </Text>
          <HelloWave />
        </XStack>

        <YStack gap="$2" marginBottom="$2">
          <Text fontSize={20} fontWeight="600" color="$color">
            Step 1: Try it
          </Text>
          <Text color="$color">
            Edit <Text fontWeight="600">app/(tabs)/index.tsx</Text> to see
            changes. Press{" "}
            <Text fontWeight="600">
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </Text>{" "}
            to open developer tools.
          </Text>
        </YStack>

        <YStack gap="$2" marginBottom="$2">
          <Link href="/modal">
            <Text fontSize={20} fontWeight="600" color="$primary">
              Step 2: Explore
            </Text>
          </Link>
          <Text color="$color">
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </Text>
        </YStack>

        <YStack gap="$2" marginBottom="$2">
          <Text fontSize={20} fontWeight="600" color="$color">
            Step 3: Get a fresh start
          </Text>
          <Text color="$color">
            When you're ready, run{" "}
            <Text fontWeight="600">npm run reset-project</Text> to get a fresh{" "}
            <Text fontWeight="600">app</Text> directory. This will move the
            current <Text fontWeight="600">app</Text> to{" "}
            <Text fontWeight="600">app-example</Text>.
          </Text>
        </YStack>
      </ParallaxScrollView>
    </Theme>
  );
}
