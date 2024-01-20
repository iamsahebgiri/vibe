import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const ProfileComponent = ({ profileData }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.email}>{profileData.email}</Text>
        {profileData.gender && profileData.age && (
          <Text style={styles.detail}>
            {profileData.age} years old {profileData.gender}
          </Text>
        )}
        <Text style={styles.createdAt}>
          Joined on {new Date(profileData.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  createdAt: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});

export default ProfileComponent;
