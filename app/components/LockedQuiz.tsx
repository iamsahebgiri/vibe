import React, { useState, useEffect, PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COUNTDOWN_KEY = "@countdownEndTime";

interface LockedQuizProps extends PropsWithChildren {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const LockedQuiz = ({
  children,
  timeRemaining,
  setTimeRemaining,
}: LockedQuizProps) => {
  useEffect(() => {
    // Load the countdown end time from AsyncStorage
    const loadCountdownTime = async () => {
      try {
        const savedTime = await AsyncStorage.getItem(COUNTDOWN_KEY);
        if (savedTime) {
          const endTime = parseInt(savedTime, 10);
          const currentTime = Math.floor(Date.now() / 1000);
          const remaining = endTime - currentTime;

          // Ensure the countdown is not negative
          setTimeRemaining(Math.max(0, remaining));
        } else {
          setTimeRemaining(0);
        }
      } catch (error) {
        console.error("Error loading countdown time:", error);
      }
    };

    loadCountdownTime();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrement the timeRemaining every second
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime: number) => prevTime - 1);
      }
    }, 1000);

    // Save the countdown end time to AsyncStorage
    const saveCountdownTime = async () => {
      try {
        const currentTime = Math.floor(Date.now() / 1000);
        await AsyncStorage.setItem(
          COUNTDOWN_KEY,
          String(currentTime + timeRemaining)
        );
      } catch (error) {
        console.error("Error saving countdown time:", error);
      }
    };

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
      saveCountdownTime();
    };
  }, [timeRemaining]);

  // Render the revealed component when the countdown reaches zero
  const isComponentVisible = timeRemaining === 0;

  if (!isComponentVisible)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          variant="headlineLarge"
          style={{
            fontWeight: "bold",
          }}
        >
          Play again
        </Text>
        <LottieView
          style={{
            height: 200,
            width: 200,
          }}
          source={require("../assets/images/fire.json")}
          autoPlay
          loop
        />
        <Text variant="headlineSmall">
          New Poll in {formatTime(timeRemaining)}
        </Text>
      </View>
    );

  return children;
};

// Helper function to format seconds into HH:mm:ss
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default LockedQuiz;
