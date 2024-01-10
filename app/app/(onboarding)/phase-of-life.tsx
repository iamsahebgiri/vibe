import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TextInput, Text, Button, RadioButton } from "react-native-paper";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const OnboardingPhaseOfLife = () => {
  const [phaseOfLife, setPhaseOfLife] = React.useState("bachelor-1");
  const { password, age, gender } = useLocalSearchParams();

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
        <Text variant="titleLarge">Current Year in Bachelor's Program</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
            marginBottom: 24,
          }}
        >
          Please let us know which year of your bachelor's program you are in.
        </Text>
        <RadioButton.Group
          onValueChange={(value) => setPhaseOfLife(value)}
          value={phaseOfLife}
        >
          <RadioButton.Item label="First Year" value="bachelor-1" />
          <RadioButton.Item label="Second Year" value="bachelor-2" />
          <RadioButton.Item label="Third Year" value="bachelor-3" />
          <RadioButton.Item label="Fourth Year" value="bachelor-4" />
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
          onPress={() => console.log({ password, gender, age, phaseOfLife })}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingPhaseOfLife;
