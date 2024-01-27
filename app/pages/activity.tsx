import { gql, useQuery } from "@apollo/client";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  VirtualizedList,
} from "react-native";
import {
  Appbar,
  Text,
  ActivityIndicator,
  Portal,
  Snackbar,
} from "react-native-paper";
import { ActivityListItem } from "../components/ListItem";
import { useState } from "react";

const GET_USER_ACTIVITY = gql`
  query GetUserActivity {
    getUserActivity {
      id
      optionSelected {
        name
        avatar
      }
      question {
        text
      }
      submitter {
        name
        gender
        phaseOfLife
      }
      createdAt
    }
  }
`;

export default function ActivityScreen() {
  const [errorVisible, setErrorVisible] = useState(false);
  const { loading, data, refetch } = useQuery(GET_USER_ACTIVITY, {
    onError: () => {
      setErrorVisible(true);
    },
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Activity" />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <ActivityIndicator animating={true} />}
        {!loading && data && data.getUserActivity.length === 0 && (
          <Text>Nothing in here</Text>
        )}
        {!loading && data && data.getUserActivity.length > 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <VirtualizedList
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
              }
              getItemCount={() => data.getUserActivity.length}
              initialNumToRender={10}
              getItem={(_, index) => data.getUserActivity.at(index)}
              renderItem={({ item }) => (
                <ActivityListItem
                  title={item.optionSelected.name}
                  subtitle={item.question.text}
                  timestamp={item.createdAt}
                  avatarSource={item.optionSelected.avatar}
                  gender={item.submitter.gender}
                  phaseOfLife={item.submitter.phaseOfLife}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <Portal>
          <Snackbar
            visible={errorVisible}
            onDismiss={() => {
              setErrorVisible(false);
            }}
            action={{
              label: "Close",
            }}
          >
            Error fetching activity
          </Snackbar>
        </Portal>
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
