import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.section, width: '100%' }}>
        <Image
          source={require('../assets/images/bg.png')} // Replace with your background image
          style={{
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
          }}
        />
        <LinearGradient
          colors={['transparent', Colors.dark.black]}
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
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Image
        source={require('../assets/images/vibe.png')}
        style={{
          height: 54,
          width: 1.78 * 54,
          marginTop: -100,
        }}
      />
      <View
        style={{
          ...styles.section,
          width: '100%',
          backgroundColor: Colors.dark.black,
          justifyContent: 'flex-end',
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
            onPress={() => router.push("/home")}
          >
            Continue with Google
          </Button>
          <Button
            mode="elevated"
            style={{
              borderRadius: 99,
            }}
            contentStyle={{
              height: 48,
            }}
            onPress={() => console.log('email')}
          >
            Continue with email
          </Button>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => console.log('Privacy Policy pressed')}
          >
            <Text style={{ color: Colors.dark.slate }}>Privacy policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Terms of Service pressed')}
          >
            <Text
              style={{
                color: Colors.dark.slate,
              }}
            >
              Terms of service
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.black,
  },
  section: {
    flex: 1,
  },
});
