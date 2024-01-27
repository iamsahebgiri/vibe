import { gql, useQuery } from "@apollo/client";
import { FlatList, RefreshControl, StyleSheet, View, VirtualizedList } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  List,
  Portal,
  Snackbar,
  Text,
} from "react-native-paper";
import { InboxListItem } from "../components/ListItem";
import { useState } from "react";

const GET_MY_INBOX = gql`
  query GetInbox {
    getMyInbox {
      id
      question {
        text
      }
      submitter {
        gender
        phaseOfLife
      }
      createdAt
    }
  }
`;

export default function InboxScreen() {
  const [errorVisible, setErrorVisible] = useState(false);
  const { loading, data, refetch } = useQuery(GET_MY_INBOX, {
    onError: () => {
      setErrorVisible(true);
    },
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Inbox" />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <ActivityIndicator animating={true} />}
        {!loading && data && data.getMyInbox.length === 0 && (
          <Text>Nothing in here</Text>
        )}
        {!loading && data && data.getMyInbox.length > 0 && (
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
              getItemCount={() => data.getMyInbox.length}
              initialNumToRender={10}
              getItem={(_, index) => data.getMyInbox.at(index)}
              renderItem={({ item }) => (
                <InboxListItem
                  timestamp={item.createdAt}
                  gender={item.submitter.gender}
                  phaseOfLife={item.submitter.phaseOfLife}
                  description={item.question.text}
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
            Error fetching top drips
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
