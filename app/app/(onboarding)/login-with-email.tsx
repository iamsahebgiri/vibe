import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TextInput, Text, Button, Portal, Snackbar } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const LOGIN_WITH_EMAIL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginWithEmail = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getMe] = useLazyQuery(gql`
  query GetMe {
    getMe {
      phaseOfLife
    }
  }
`);

  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN_WITH_EMAIL);
  const isValidInput = () => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    const isValidPassword = password.length > 6;

    return isValidEmail && isValidPassword;
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
        <Text variant="titleLarge">Welcome back</Text>
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 6,
            marginBottom: 24,
          }}
        >
          To log in to your account, please enter email and password.
        </Text>
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
          loading={loading}
          icon="arrow-right"
          onPress={() => {
            login({
              variables: {
                email,
                password,
              },
              onCompleted: async (data) => {
                const { token } = data.login;
                await SecureStore.setItemAsync("TOKEN", token);

                getMe({
                  onCompleted(userData) {
                    const { phaseOfLife } = userData.getMe;
                    console.log({
                      phaseOfLife,
                    });
                    if (phaseOfLife) {
                      router.replace("/");
                    } else {
                      router.replace({
                        pathname: "/(onboarding)/age",
                        params: {
                          mode: "gooogle",
                        },
                      });
                    }
                  },
                  onError(error: any) {
                    console.log(error);
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
          Log in
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
          Error logging in
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
};

export default LoginWithEmail;
