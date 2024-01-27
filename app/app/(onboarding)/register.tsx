import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TextInput, Text, Button, Portal, Snackbar } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const OnboardingPassword = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [register, { loading: isRegistering }] = useMutation(REGISTER);
  const isValidInput = () => {
    const isValidName = name.length > 2;
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    const isValidPassword = password.length > 6;

    return isValidName && isValidEmail && isValidPassword;
  };

  return (
    <SafeAreaView
      style={{
        padding: 12,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text variant="titleLarge">Join us</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
            marginBottom: 24,
          }}
        >
          To join with us, please set up your account first.
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            marginTop: 12,
          }}
        />
        <TextInput
          mode="outlined"
          placeholder="Password"
          secureTextEntry={isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          right={
            isPasswordVisible ? (
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setIsPasswordVisible(false);
                }}
              />
            ) : (
              <TextInput.Icon
                icon="eye-off"
                onPress={() => {
                  setIsPasswordVisible(true);
                }}
              />
            )
          }
          style={{
            marginTop: 12,
          }}
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
          style={{
            borderRadius: 99,
          }}
          contentStyle={{
            height: 48,
          }}
          icon="arrow-left"
          onPress={() => router.back()}
        >
          Prev
        </Button>
        <Button
          mode="contained"
          disabled={!isValidInput()}
          style={{
            borderRadius: 99,
          }}
          contentStyle={{
            height: 48,
            flexDirection: "row-reverse",
          }}
          loading={isRegistering}
          icon="arrow-right"
          onPress={() => {
            register({
              variables: {
                name,
                email,
                password,
              },
              onCompleted: async (data) => {
                const { token } = data.register;
                await SecureStore.setItemAsync("TOKEN", token);

                router.push({
                  pathname: "/(onboarding)/age",
                  params: {
                    password,
                    email,
                    mode: "email",
                  },
                });
              },
              onError: (error) => {
                console.log(error);
                setErrorVisible(true);
              },
            });
          }}
        >
          Register
        </Button>
      </View>
      <Portal>
        <Snackbar
          visible={errorVisible}
          onDismiss={() => {
            setErrorVisible(false);
          }}
          action={{
            label: "Close",
          }}
        >
          Error creating account
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
};

export default OnboardingPassword;
