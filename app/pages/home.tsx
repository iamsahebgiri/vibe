import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );

  console.log(data);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            padding: 12,
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Text style={styles.emoji}>😅</Text>
          <Text style={styles.prompt}>
            Shamelessly double/triple texts and still doesn't get a reply
          </Text>
        </View>
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
  prompt: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  emoji: {
    fontSize: 72,
  },
});
