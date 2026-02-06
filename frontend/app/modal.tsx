import { Link } from "expo-router";
import { YStack, Text, Theme } from "tamagui";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ModalScreen() {
  const colorScheme = useColorScheme();

  return (
    <Theme name={colorScheme ?? "light"}>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding="$5"
        backgroundColor="$background"
      >
        <Text fontSize={24} fontWeight="700" color="$color">
          This is a modal
        </Text>
        <Link href="/" dismissTo style={{ marginTop: 20, paddingVertical: 10 }}>
          <Text color="$primary" fontWeight="600" fontSize={16}>
            Go to home screen
          </Text>
        </Link>
      </YStack>
    </Theme>
  );
}
