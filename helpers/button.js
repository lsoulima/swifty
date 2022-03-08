import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function CustomizeButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 50,
    marginTop: 50,
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
