import React from "react";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  const options = {
    headerShown: false,
  }
  return (
    <Stack>
      {/* <Stack.Screen
        name="password"
        options={options}
      /> */}
      <Stack.Screen
        name="age"
        options={options}
      />
      <Stack.Screen
        name="gender"
        options={options}
      />
      <Stack.Screen
        name="phase-of-life"
        options={options}
      />
    </Stack>
  );
};

export default OnboardingLayout;
