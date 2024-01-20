import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import { Appbar, Avatar, List } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";

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
  const { loading, error, data } = useQuery(GET_USER_ACTIVITY);
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
              paddingHorizontal: 12,
            }}
          >
            <FlatList
              data={data.getUserActivity}
              renderItem={({ item }) => (
                <List.Item
                  title={item.optionSelected.name}
                  description={item.question.text}
                  left={(props) => (
                    <Avatar.Image
                      size={42}
                      source={{
                        uri: item.optionSelected.avatar,
                      }}
                    />
                  )}
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
