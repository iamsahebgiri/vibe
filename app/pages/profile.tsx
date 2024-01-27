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
  Divider,
  Menu,
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
import TopDrips from "../components/TopDrips";

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
  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const client = useApolloClient();

  const signOut = async () => {
    await SecureStore.deleteItemAsync("TOKEN");
    await GoogleSignin.signOut();
    client.clearStore();
    router.replace("/login");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Menu
          visible={isMenuOpen}
          onDismiss={() => setMenuOpen(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuOpen(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              router.push("/(onboarding)/age");
            }}
            title="Edit Profile"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              showDialog();
              setMenuOpen(false);
            }}
            title="Log out"
          />
        </Menu>
      </Appbar.Header>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Log out</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to logout of vibe?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={signOut}>Sign out</Button>
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
            <TopDrips />
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
