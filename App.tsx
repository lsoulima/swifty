import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import logo from './assets/logo.png';
import bg from './assets/bg.png';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image
          style={styles.Logo}
          source={logo}/>
          <TextInput
          style={styles.input}
          placeholder="Enter your login"
          keyboardType="default"
        />
        <View style={styles.btn}>
          <Button
            title="Login"
            color= "rgb(3,186,188)"
            onPress={() => Alert.alert("You're logging in")}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  Logo: {
    width: 66,
    height: 58,
  },
  input: {
    height: 40,
    margin: 70,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#03BABC',
    padding: 10,
  },
  btn: {
    height: 70,
    marginVertical: 10,
    marginHorizontal: 90,
    alignSelf: 'stretch',
    padding: 10,
  }
});
