import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";

const OnboardingPassword = () => {
  const [password, setPassword] = React.useState("");
  
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
        <Text variant="titleLarge">Set Up Your Account</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
            marginBottom: 24,
          }}
        >
          To ensure the security of your account, please set up a strong
          password.
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
          onPress={() => console.log("next")}
        >
          Prev
        </Button>
        <Button
          mode="contained"
          disabled={password.length < 6}
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
              pathname: "/(onboarding)/age",
              params: {
                password,
                mode: "email"
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

export default OnboardingPassword;
