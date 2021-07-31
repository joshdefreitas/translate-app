import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const langs = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Spanish",
    value: "es",
  },
  {
    label: "French",
    value: "fr",
  },
];

export default function App() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
      />
      <Text>{"Please select language"}</Text>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: { color: "black" },
        }}
        items={langs}
      />
      <Text style={{ padding: 10 }}>
        {text
          .split(" ")
          .map((word) => word && "lorem ipsum")
          .join(" ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    //alignItems: "center",
    justifyContent: "center",
  },
});
