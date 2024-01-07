import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={{
          padding: 12,
          alignItems: 'center',
          gap: 12,
          justifyContent: "center"
        }}>
          <Text style={styles.emoji}>😅</Text>
          <Text style={styles.prompt}>
            Shamelessly double/triple texts and still doesn't get a reply
          </Text>
        </View>
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
  prompt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 72,
  },
});
