import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const APIKey = require("./APIKey.json");
const url = require("./url.json");

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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tlRes: "",
    };
  }

  render() {
    const { text, tlRes } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ text })}
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
        <Text style={{ padding: 10 }}>{tlRes}</Text>

        <Button title="Translate" />
      </View>
    );
  }
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
