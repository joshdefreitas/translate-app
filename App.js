import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const APIKey = require("./APIKey.json");
const url = require("./url.json");
const auth = require("./auth.json");

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
      isLoading: true,
    };
  }

  translate = async () => {
    try {
      const response = await fetch(
        url.url + "/v3/translate?version=2018-05-01",
        {
          body: JSON.stringify({
            text: "Hello, how are you today",
            model_id: "en-es",
          }),
          headers: {
            Authorization: auth.auth,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      const tlJSON = await response.json();
      this.setState({ tlRes: response.status.toString(10) });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

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

        <Button title="Translate" onPress={this.translate} />
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
