import { useRouter } from "expo-router";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import ProfileComponent from "../components/Profile";
import { useState } from "react";

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

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const client = useApolloClient();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="cog" onPress={showDialog} />
      </Appbar.Header>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Log out</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to logout of vibe?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={async () => {
                await SecureStore.deleteItemAsync("TOKEN");
                await GoogleSignin.signOut();
                client.clearStore();
                router.replace("/login");
              }}
            >
              Sign out
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        {loading && <ActivityIndicator animating={true} />}
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
