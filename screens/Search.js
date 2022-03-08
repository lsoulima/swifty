import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Text,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg.png";
import CustomizeButton from "../helpers/button";
// import functions from '../helpers'

export default function Search({ navigation, route }) {
  const code = route.params.code;
  const exp_url = route.params.exp_url;
  const [login, setLogin] = useState("");
  const [token, setToken] = useState("");
  const [unknown, setUnknown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const rq_body = {
    grant_type: "authorization_code",
    client_id:
      "cd9dae94aea3931be0d85bd082b7ba815c87ebbab6abf7e42ebcf66593bf144a",
    client_secret:
      "43465afd62e84dd85ccb0f8ce0937beb9ee11952f71c19d6072c9ede7e478250",
    code: code,
    redirect_uri: exp_url,
  };
  const getUserInfo = async (token, user_id) => {
    const get_url = "https://api.intra.42.fr/v2/users/" + user_id;

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(get_url, {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }),
        });
        let json = await response.json();
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const getUserId = async (token) => {
    let filter = login.toLowerCase();
    filter = filter.trim();
    const get_url = "https://api.intra.42.fr/v2/users?filter[login]=" + filter;

    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(get_url, {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }),
        });
        let json = await response.json();
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const getToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch("https://api.intra.42.fr/oauth/token", {
          method: "POST",
          body: JSON.stringify(rq_body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let json = await response.json();
        resolve(json.access_token);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  const getTokenInfo = (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch("https://api.intra.42.fr/oauth/token/info", {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }),
        });
        let json = await response.json();
        resolve(json);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  const verifyToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let check;
        if (token != "") {
          check = await getTokenInfo(token);
          if (check.expires_in_seconds > 0) {
            resolve(token);
          }
        }
        if (token == "" || check.expires_in_seconds == undefined) {
          const new_token = await getToken();
          setToken(new_token);
          resolve(new_token);
        }
        resolve(0);
      } catch (err) {
        console.log(err);
        reject(-1);
      }
    });
  };

  const handleSubmit = async () => {
    setUnknown(false);
    if (login != "") {
      setIsLoading(true);
      const token = await verifyToken();
      const user = await getUserId(token);
      if (user[0] != undefined) {
        const info = await getUserInfo(token, user[0].id);
        setIsLoading(false);
        navigation.navigate("Profile", { login: login, userInfo: info });
      } else {
        setUnknown(true);
        setIsLoading(false);
      }
    }
  };

  const button = isLoading ? (
    <ActivityIndicator />
  ) : (
    <CustomizeButton onPress={handleSubmit} text="submit" />
  );
  const errorMessage = unknown ? (
    <Text style={styles.errorMessage}> User not found </Text>
  ) : null;

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image style={styles.Logo} source={logo} />
        <TouchableOpacity onPress={Keyboard.dismiss}>
          <View>
            <TextInput
              placeholder="Enter login"
              // keyboardType="default"
              onChangeText={setLogin}
              value={login}
              style={styles.input}
            />
            {errorMessage}
            {button}
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Logo: {
    width: 120,
    height: 100,
    marginBottom: 40,
  },
  input: {
    height: 40,
    alignSelf: "stretch",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#03BABC",
    padding: 10,
    marginBottom: 15,
  },
  errorMessage: {
    color: "#f73649",
    alignItems: "center",
    alignSelf: "center",
  },
});
