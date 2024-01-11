import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Appbar } from "react-native-paper";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action
          icon="cog"
          onPress={async () => {
            await SecureStore.deleteItemAsync("TOKEN");
            await GoogleSignin.signOut();
            router.replace("/");
          }}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Saheb</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
