import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// import { globalStyles } from "../styles/A";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
export default function Login({ navigation }) {
  const app_url = Linking.createURL();
  console.log(app_url);

  const client_id =
    "22885e48c641821b3ec506d92722f36f13163875eefc833a7c7b218048631612";
  console.log(client_id);

  const url =
    "https://api.intra.42.fr/oauth/authorize?client_id=" +
    client_id +
    "&redirect_uri=" +
    app_url +
    "&response_type=code";

  const handleLogin = async () => {
    WebBrowser.openBrowserAsync(url);
    Linking.addEventListener("url", (event) => {
      let data = Linking.parse(event.url);
      let code = data.queryParams.code;
      console.log(code);

      WebBrowser.dismissBrowser();
      navigation.navigate("Search", { code: code, app_url: app_url });
    });
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          // title= "Login" color="rgb(3,186,188)"
          onPress={handleLogin}
        >
          <View style={styles.loginButton}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.headerImage}
            />
            <Text style={styles.btnText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#00AFB1",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
});
