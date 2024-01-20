import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Avatar, Text, useTheme } from "react-native-paper";
import dayjs from "./../lib/dayjs";

const ListItem = ({ avatarSource, title, subtitle, timestamp }: any) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={42}
        source={{
          uri: avatarSource,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={{ ...styles.title, color: theme.colors.onBackground }}>
          {title}
        </Text>
        <Text
          style={{ ...styles.subtitle, color: theme.colors.onSurfaceVariant }}
        >
          {subtitle}
        </Text>
      </View>
      <Text style={styles.timestamp}>{dayjs(timestamp).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 21,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});

export default ListItem;
