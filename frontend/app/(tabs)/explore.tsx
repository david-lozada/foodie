import { Image } from "expo-image";
import { Platform } from "react-native";
import { YStack, XStack, Text, Theme } from "tamagui";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  return (
    <Theme name={colorScheme ?? "light"}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={{
              bottom: -90,
              left: -35,
              position: "absolute",
            }}
          />
        }
      >
        <YStack gap="$2">
          <Text fontSize={32} fontWeight="700" color="$color">
            Explore
          </Text>
          <Text color="$color">
            This app includes example code to help you get started.
          </Text>
        </YStack>

        <Collapsible title="File-based routing">
          <Text color="$color">
            This app has two screens:{" "}
            <Text fontWeight="600">app/(tabs)/index.tsx</Text> and{" "}
            <Text fontWeight="600">app/(tabs)/explore.tsx</Text>
          </Text>
          <Text color="$color">
            The layout file in{" "}
            <Text fontWeight="600">app/(tabs)/_layout.tsx</Text> sets up the tab
            navigator.
          </Text>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <Text color="$primary" fontWeight="600">
              Learn more
            </Text>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Android, iOS, and web support">
          <Text color="$color">
            You can open this project on Android, iOS, and the web. To open the
            web version, press <Text fontWeight="600">w</Text> in the terminal
            running this project.
          </Text>
        </Collapsible>

        <Collapsible title="Images">
          <Text color="$color">
            For static images, you can use the <Text fontWeight="600">@2x</Text>{" "}
            and <Text fontWeight="600">@3x</Text> suffixes to provide files for
            different screen densities
          </Text>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginTop: 10,
            }}
          />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <Text color="$primary" fontWeight="600">
              Learn more
            </Text>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Light and dark mode components">
          <Text color="$color">
            This template has light and dark mode support. The{" "}
            <Text fontWeight="600">useColorScheme()</Text> hook lets you inspect
            what the user's current color scheme is, and so you can adjust UI
            colors accordingly.
          </Text>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <Text color="$primary" fontWeight="600">
              Learn more
            </Text>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Animations">
          <Text color="$color">
            This template includes an example of an animated component. The{" "}
            <Text fontWeight="600">components/HelloWave.tsx</Text> component
            uses the powerful{" "}
            <Text fontWeight="600" style={{ fontFamily: "monospace" }}>
              react-native-reanimated
            </Text>{" "}
            library to create a waving hand animation.
          </Text>
          {Platform.OS === "ios" && (
            <Text color="$color">
              The{" "}
              <Text fontWeight="600">components/ParallaxScrollView.tsx</Text>{" "}
              component provides a parallax effect for the header image.
            </Text>
          )}
        </Collapsible>
      </ParallaxScrollView>
    </Theme>
  );
}
