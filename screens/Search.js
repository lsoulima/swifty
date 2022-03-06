import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Text,
} from "react-native";
import logo from "../assets/logo.png";
import bg from "../assets/bg.png";

export default function Search({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image style={styles.Logo} source={logo} />
        <TextInput
          style={styles.input}
          placeholder="Enter login"
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={() => Alert.alert("You'll be redirected to profile's page")}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Search</Text>
          </View>
        </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    width: 66,
    height: 58,
  },
  input: {
    height: 40,
    margin: 70,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#03BABC",
    padding: 10,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: "#00AFB1",
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
