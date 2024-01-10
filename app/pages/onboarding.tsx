import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { ThemeProvider, Input, Button, CheckBox } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [phase, setPhase] = React.useState('');
  const [isChecked, setChecked] = React.useState(false);

  const handleNext = () => {
    navigation.navigate('Gender', { password });
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Set Up Your Account</Text>

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CheckBox
          title="I agree to the terms and conditions"
          checked={isChecked}
          onPress={() => setChecked(!isChecked)}
        />

        <Button title="Next" onPress={handleNext} />
      </View>
    </ThemeProvider>
  );
};

const GenderScreen = ({ navigation }) => {
  const password = navigation.getParam('password', '');
  const [gender, setGender] = React.useState('');

  const handleNext = () => {
    navigation.navigate('Age', { password, gender });
  };

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Gender</Text>

        <Input
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />

        <Button title="Prev" onPress={handlePrev} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </ThemeProvider>
  );
};

const AgeScreen = ({ navigation }) => {
  const password = navigation.getParam('password', '');
  const gender = navigation.getParam('gender', '');
  const [age, setAge] = React.useState('');

  const handleNext = () => {
    navigation.navigate('Phase', { password, gender, age });
  };

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Age</Text>

        <Input
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Button title="Prev" onPress={handlePrev} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </ThemeProvider>
  );
};

const PhaseScreen = ({ navigation }) => {
  const password = navigation.getParam('password', '');
  const gender = navigation.getParam('gender', '');
  const age = navigation.getParam('age', '');
  const [phase, setPhase] = React.useState('');

  const handleNext = () => {
    // You can perform validation and save user data here
    // For simplicity, I'm just navigating to the welcome screen
    navigation.navigate('Welcome');
  };

  const handlePrev = () => {
    navigation.goBack();
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Current Phase of Life</Text>

        <Input
          placeholder="Current Phase of Life"
          value={phase}
          onChangeText={setPhase}
        />

        <Button title="Prev" onPress={handlePrev} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </ThemeProvider>
  );
};

const WelcomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to the App!</Text>
  </View>
);

const AppNavigator = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
    Gender: GenderScreen,
    Age: AgeScreen,
    Phase: PhaseScreen,
    Welcome: WelcomeScreen,
  },
  {
    initialRouteName: 'Onboarding',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
