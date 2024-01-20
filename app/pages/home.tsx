import { StyleSheet, View } from "react-native";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button, RadioButton, Text} from "react-native-paper";
import LockedQuiz from "../components/LockedQuiz";

const ONE_HR = 600;

const GET_NEXT_QUESTIONS = gql`
  query GetNextQuestion {
    getQuestions {
      id
      text
      emoji
    }
    getOptions {
      id
      email
      avatar
      name
    }
  }
`;

const SUBMIT_QUESTION = gql`
  mutation SubmitQuestion(
    $questionId: ID!
    $optionSelected: ID!
    $option1: ID!
    $option2: ID!
    $option3: ID!
  ) {
    submitQuestion(
      questionId: $questionId
      optionSelected: $optionSelected
      option1: $option1
      option2: $option2
      option3: $option3
    ) {
      id
    }
  }
`;

function getRandomItems(array: any[], limit = 4) {
  return array
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export default function HomeScreen() {
  const { loading, error, data, refetch } = useQuery(GET_NEXT_QUESTIONS);
  const [submitQuestion, { loading: submitting }] =
    useMutation(SUBMIT_QUESTION);

  const [optionSelected, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(3);
  const [options, setOptions] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!loading && data) {
      setOptions(getRandomItems(data.getOptions));
    }
  }, [loading, data, currentIndex]);

  const handleShuffle = () => {
    setShuffleCount((count) => count - 1);
    setSelectedOption("");
    setOptions(getRandomItems(data.getOptions));
  };

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

  const questions = data.getQuestions;

  return (
    <View style={styles.container}>
      <LockedQuiz
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      >
        <>
          <Text>
            {currentIndex + 1} / {questions.length}
          </Text>
          <View
            style={{
              padding: 12,
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <Text style={styles.emoji}>
              {questions.at(currentIndex)?.emoji}
            </Text>
            <Text style={styles.prompt}>
              {questions.at(currentIndex)?.text}
            </Text>
            <RadioButton.Group
              onValueChange={(value) => setSelectedOption(value)}
              value={optionSelected}
            >
              {options.map((option: any, index) => (
                <RadioButton.Item
                  key={index}
                  label={option.name}
                  value={option.id}
                />
              ))}
            </RadioButton.Group>
            <View>
              {/* <Button
                onPress={() => {
                  refetch();
                  setCurrentIndex(0);
                }}
              >
                Refetch
              </Button> */}
              <Button
                mode="contained"
                onPress={() => {
                  const otherOptions = options.filter(
                    (option) => option.id !== optionSelected
                  );
                  submitQuestion({
                    variables: {
                      questionId: data.getQuestions[currentIndex]?.id,
                      optionSelected,
                      option1: otherOptions.at(0).id,
                      option2: otherOptions.at(1).id,
                      option3: otherOptions.at(2).id,
                    },
                    onCompleted() {
                      console.log(currentIndex);
                      console.log(data.getQuestions.length);
                      if (currentIndex === data.getQuestions.length - 1) {
                        console.log("last questions");
                        setTimeRemaining(ONE_HR);
                        setSelectedOption("");
                        setShuffleCount(3);
                        setCurrentIndex(0);
                        refetch();
                      }
                      if (currentIndex < data.getQuestions.length - 1) {
                        setCurrentIndex((index) => index + 1);
                        setShuffleCount(3);
                        setSelectedOption("");
                      }
                    },
                  });
                }}
                disabled={optionSelected === ""}
                loading={submitting}
              >
                Next
              </Button>
              <Button onPress={handleShuffle} disabled={shuffleCount <= 0}>
                Shuffle ({shuffleCount})
              </Button>
            </View>
          </View>
        </>
      </LockedQuiz>
    </View>
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
