import { StatusBar } from 'expo-status-bar';
import { Image, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import logo from '../assets/logo.png';
import bg from '../assets/bg.png';
import styles from '../styles/App.style.js';

export default function Search({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image
          style={styles.logo}
          source={logo}/>
          <TextInput
          style={styles.input}
          placeholder="Enter login"
          keyboardType="default"
        />
        <View style={styles.btn}>
          <Button
            title="Search"
            color= "rgb(3,186,188)"
            onPress={() => Alert.alert("You're logging in")}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}