import { Platform, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function InboxScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Inbox" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Inbox</Text>
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
