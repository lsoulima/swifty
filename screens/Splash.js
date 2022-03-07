import { StatusBar } from 'expo-status-bar';
import { Button, View } from 'react-native';
import styles from '../styles/App.style.js';

export default function Splash({ navigation }) {
  return (
    <View>
      <Button
        title="Go to search"
        onPress={() =>
          navigation.navigate('Search')
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}