import React from "react";
import { View } from "react-native";
import { TouchableRipple, Text, Avatar, useTheme } from "react-native-paper";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";

export default function Option({
  src,
  name,
  isSelected,
  onSelected
}: {
  src: string;
  name: string;
  isSelected: boolean;
  onSelected: () => void;
}) {
  const theme = useTheme();
  return (
    <TouchableRipple
      style={{ borderRadius: 8 }}
      borderless
      onPress={() => onSelected()}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 12,
          borderWidth: 2,
          borderColor: isSelected ? theme.colors.primary : "transparent",
          backgroundColor: theme.colors.background,
          borderRadius: 8,
        }}
      >
        <Avatar.Image size={38} source={{uri: src}} />
        <Text variant="labelLarge">{name}</Text>
      </View>
    </TouchableRipple>
  );
}
