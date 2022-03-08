import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
export default function Login({ navigation }) {
  const exp_url = Linking.createURL();
  const client_id =
    "cd9dae94aea3931be0d85bd082b7ba815c87ebbab6abf7e42ebcf66593bf144a";
  const url =
    "https://api.intra.42.fr/oauth/authorize?client_id=" +
    client_id +
    "&redirect_uri=" +
    exp_url +
    "&response_type=code";

  const handleLogin = async () => {
    WebBrowser.openBrowserAsync(url);
    Linking.addEventListener("url", (event) => {
      let data = Linking.parse(event.url);
      let code = data.queryParams.code;
      console.log(code);
      WebBrowser.dismissBrowser();
      navigation.navigate("Search", { code: code, exp_url: exp_url });
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
