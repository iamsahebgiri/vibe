import { Platform, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function ActivityScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Activity" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Activity</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
