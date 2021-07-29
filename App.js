import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
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
  return (
    <View style={styles.container}>
      <Text>{"Please select language"}</Text>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: { color: "black" },
        }}
        items={langs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
});
