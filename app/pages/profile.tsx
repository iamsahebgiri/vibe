import { Platform, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Saheb</Text>
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
