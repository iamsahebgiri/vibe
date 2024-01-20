import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Avatar, Text, useTheme } from "react-native-paper";
import dayjs from "./../lib/dayjs";

function nth(n: number) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

const ActivityListItem = ({
  avatarSource,
  title,
  subtitle,
  timestamp,
  gender,
  phaseOfLife,
}: any) => {
  const formatText = (gender: string, phaseOfLife: string) => {
    if (!gender || !phaseOfLife) return "";

    gender = gender.toLowerCase() === "male" ? "boy" : "girl";
    let [course, year] = phaseOfLife.split("-");

    return `From a ${gender} in ${year}${nth(+year)} pursuing ${course}`;
  };

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
          style={{
            ...styles.subtitle,
            color: theme.colors.onSecondaryContainer,
          }}
        >
          {subtitle}
        </Text>
        {gender && phaseOfLife ? (
          <Text
            style={{ ...styles.helper, color: theme.colors.onSurfaceVariant }}
          >
            {formatText(gender, phaseOfLife)}
          </Text>
        ) : null}
      </View>
      <Text
        style={{ ...styles.timestamp, color: theme.colors.onSurfaceDisabled }}
      >
        {dayjs(timestamp).fromNow(true)}
      </Text>
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
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  helper: {
    fontSize: 13,
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
  },
});

export default ActivityListItem;
