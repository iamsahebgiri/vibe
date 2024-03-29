import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";

import * as SecureStore from "expo-secure-store";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

const LOGIN_WITH_GOOGLE = gql`
  mutation LoginWithGoogle($idToken: String!) {
    loginWithGoogle(idToken: $idToken) {
      token
    }
  }
`;

GoogleSignin.configure({
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    // "https://www.googleapis.com/auth/user.birthday.read",
    // "https://www.googleapis.com/auth/user.gender.read",
  ],
  webClientId:
    "339340436624-00b8ig04mki74l5mun14250pp27cet93.apps.googleusercontent.com",
});

export default function IndexScreen() {
  const router = useRouter();

  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE);
  const [getMe] = useLazyQuery(gql`
    query GetMe {
      getMe {
        phaseOfLife
      }
    }
  `);

  // console.log({ data, error: error?.message, loading });

  const signIn = async () => {
    setIsGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        console.log("Got id token.....");
        loginWithGoogle({
          variables: {
            idToken: userInfo.idToken,
          },
          onCompleted: async (data) => {
            const { token } = data.loginWithGoogle;
            await SecureStore.setItemAsync("TOKEN", token);

            getMe({
              onCompleted(userData) {
                console.log(userData);
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
                setIsGoogleLoading(false);
              },
              onError(error) {
                console.log(error);
              },
            });
          },
          onError(error) {
            console.log("couldn't log in with google");
            console.log(error);
          },
        });
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error);
      setIsGoogleLoading(false);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.section, width: "100%" }}>
        <Image
          source={require("../assets/images/bg.png")} // Replace with your background image
          style={{
            ...StyleSheet.absoluteFillObject,
            width: "100%",
            height: "100%",
          }}
        />
        <LinearGradient
          colors={["transparent", Colors.dark.black]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 0.9,
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Image
        source={require("../assets/images/vibe.png")}
        style={{
          height: 54,
          width: 1.78 * 54,
          marginTop: -100,
        }}
      />
      <View
        style={{
          ...styles.section,
          width: "100%",
          backgroundColor: Colors.dark.black,
          justifyContent: "flex-end",
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
      >
        <View
          style={{
            gap: 12,
          }}
        >
          <Button
            mode="contained"
            icon="google"
            style={{
              borderRadius: 99,
            }}
            contentStyle={{
              height: 48,
            }}
            onPress={signIn}
            loading={isGoogleLoading}
          >
            Continue with Google
          </Button>
          <Button
            mode="contained-tonal"
            style={{
              borderRadius: 99,
            }}
            contentStyle={{
              height: 48,
            }}
            onPress={() => router.push("/(onboarding)/register")}
          >
            Register with email
          </Button>
          <Button
            style={{
              borderRadius: 99,
            }}
            contentStyle={{
              height: 48,
            }}
            onPress={() => router.push("/(onboarding)/login-with-email")}
          >
            Login with email
          </Button>
        </View>
        {/* <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Privacy Policy pressed")}
          >
            <Text style={{ color: Colors.dark.slate }}>Privacy policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Terms of Service pressed")}
          >
            <Text
              style={{
                color: Colors.dark.slate,
              }}
            >
              Terms of service
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.black,
  },
  section: {
    flex: 1,
  },
});
