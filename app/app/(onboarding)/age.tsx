import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { View } from "react-native";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { gql, useQuery } from "@apollo/client";



const OnboardingAge = () => {
  const [age, setAge] = React.useState("21");
  const { password, mode } = useLocalSearchParams();

  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        padding: 12,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text variant="titleLarge">Share Your Age</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
          }}
        >
         Your age helps us customize content and features that suit different age groups.
        </Text>
        <TextInput
          style={{
            marginTop: 24,
          }}
          mode="outlined"
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          mode="outlined"
          disabled
          style={{
            borderRadius: 99,
          }}
          contentStyle={{
            height: 48,
          }}
          icon="arrow-left"
        >
          Prev
        </Button>
        <Button
          mode="contained"
          style={{
            borderRadius: 99,
          }}
          contentStyle={{
            height: 48,
            flexDirection: "row-reverse",
          }}
          icon="arrow-right"
          onPress={() => router.push({
            pathname: "/(onboarding)/gender",
            params: {
              mode,
              password,
              age
            },
          })}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingAge;
