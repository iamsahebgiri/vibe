import { useRouter } from "expo-router";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Appbar, Button } from "react-native-paper";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import ProfileComponent from "../components/profile";

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
  const { loading, error, data, refetch } = useQuery(GET_ME);

  const client = useApolloClient();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action
          icon="cog"
          onPress={async () => {
            await SecureStore.deleteItemAsync("TOKEN");
            await GoogleSignin.signOut();
            client.clearStore();
            router.replace("/login");
          }}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        {!loading && data && (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
          >
            <ProfileComponent profileData={data.getMe} />
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
