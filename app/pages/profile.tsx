import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Appbar, Button } from "react-native-paper";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { gql, useQuery } from "@apollo/client";

const GET_ME = gql`
  query GetMe {
    getMe {
      id
      name
      email
      avatar
      age
      bio
      gender
      phaseOfLife
      createdAt
      updatedAt
    }
  }
`;
export default function ProfileScreen() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ME);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action
          icon="cog"
          onPress={async () => {
            await SecureStore.deleteItemAsync("TOKEN");
            await GoogleSignin.signOut();
            router.replace("/login");
          }}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        {!loading && data && <Text>{JSON.stringify(data, null, 2)}</Text>}
        {/* <Button onPress={() => refetch()}>Refetch</Button> */}
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
