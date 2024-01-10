import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TextInput, Text, Button, RadioButton } from "react-native-paper";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const OnboardingGender = () => {
  const [gender, setGender] = React.useState("male");
  const { password, age } = useLocalSearchParams();

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
        <Text variant="titleLarge">Provide Your Gender</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
            marginBottom: 24,
          }}
        >
          Understanding our users helps us tailor the app experience.
        </Text>
        <RadioButton.Group
          onValueChange={(newValue) => setGender(newValue)}
          value={gender}
        >
          <View>
            <Text>Male</Text>
            <RadioButton value="male" />
          </View>
          <View>
            <Text>Female</Text>
            <RadioButton value="female" />
          </View>
        </RadioButton.Group>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          mode="outlined"
          disabled={!router.canGoBack()}
          style={{
            borderRadius: 99,
          }}
          contentStyle={{
            height: 48,
          }}
          icon="arrow-left"
          onPress={router.back}
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
          onPress={() =>
            router.push({
              pathname: "/(onboarding)/phase-of-life",
              params: {
                password,
                age,
                gender,
              },
            })
          }
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingGender;
