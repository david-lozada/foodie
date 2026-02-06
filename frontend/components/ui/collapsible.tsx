import { PropsWithChildren, useState } from "react";
import { YStack, XStack, Text } from "tamagui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  return (
    <YStack>
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$2"
        onPress={() => setIsOpen((value) => !value)}
        pressStyle={{ opacity: 0.8 }}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          color={colorScheme === "light" ? "#687076" : "#9BA1A6"}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />
        <Text fontWeight="600" color="$color">
          {title}
        </Text>
      </XStack>
      {isOpen && (
        <YStack marginTop="$2" marginLeft="$6" gap="$2">
          {children}
        </YStack>
      )}
    </YStack>
  );
}
