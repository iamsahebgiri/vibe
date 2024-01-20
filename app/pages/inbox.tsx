import { gql, useQuery } from "@apollo/client";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { InboxListItem } from "../components/ListItem";

const GET_MY_INBOX = gql`
  query GetInbox {
    getMyInbox {
      id
      submitter {
        gender
        phaseOfLife
      }
      createdAt
    }
  }
`;

export default function InboxScreen() {
  const { loading, error, data, refetch } = useQuery(GET_MY_INBOX);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Inbox" />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
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
            <FlatList
              data={data.getMyInbox}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
              }
              renderItem={({ item }) => (
                <InboxListItem
                  timestamp={item.createdAt}
                  gender={item.submitter.gender}
                  phaseOfLife={item.submitter.phaseOfLife}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
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
