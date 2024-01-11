import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Button } from "react-native-paper";

const GET_NEXT_QUESTIONS = gql`
  query GetNextQuestion {
    getNextQuestion {
      id
      text
      emoji
    }
    getRandom4Options {
      id
      email
      avatar
      name
    }
  }
`;

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(GET_NEXT_QUESTIONS);

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

  const questions = data.getNextQuestion;
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
          <Text style={styles.emoji}>{questions.at(currentIndex)?.emoji}</Text>
          <Text style={styles.prompt}>{questions.at(currentIndex)?.text}</Text>
          {currentIndex < 12 && (
            <Button
              onPress={() => {
                if (currentIndex < 12) {
                  setCurrentIndex((index) => index + 1);
                }
              }}
            >
              Next
            </Button>
          )}
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
