import { gql, useQuery } from "@apollo/client";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import {ActivityListItem} from "../components/ListItem";

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
  const { loading, error, data, refetch } = useQuery(GET_USER_ACTIVITY);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Activity" />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        {!loading && data && data.getUserActivity.length > 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <FlatList
              data={data.getUserActivity}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
              }
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
