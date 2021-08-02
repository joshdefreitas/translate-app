import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const APIKey = require("./APIKey.json");
const url = require("./url.json");
const auth = require("./auth.json");
var langcode = "en";
var phrase = "";

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
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Russian",
    value: "ru",
  },
  {
    label: "Japanese",
    value: "ja",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "Simplified Chinese",
    value: "zh",
  },
  {
    label: "Traditional Chinese",
    value: "zh-TW",
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tlRes: "",
      lang: "en",
      isLoading: true,
    };
  }

  translate = async () => {
    try {
      const response = await fetch(
        url.url + "/v3/translate?version=2018-05-01",
        {
          body: JSON.stringify({
            text: phrase,
            model_id: "en-" + langcode,
          }),
          headers: {
            Authorization: auth.auth,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      const tlJSON = await response.json();
      this.setState({ tlRes: tlJSON.translations[0].translation.toString() });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { text, tlRes } = this.state;
    return (
      <ImageBackground
        style={styles.background}
        source={require("./assets/bgimage.jpg")}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type here to translate!"
            onChangeText={(text) => {
              this.setState({ text });
              phrase = text;
              this.setState();
            }}
            defaultValue={text}
            multiline={true}
          />
          <RNPickerSelect
            onValueChange={(value) => (langcode = value)}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Please select language",
              value: "",
            }}
            style={{
              inputAndroid: {
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
              },
            }}
            items={langs}
          />
          <Text style={styles.output} multiline={true}>
            {tlRes}
          </Text>

          <TouchableOpacity title="Translate" onPress={this.translate}>
            <View style={styles.button}>
              <Text style={styles.text}>Translate</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    height: 150,
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    textAlignVertical: "top",
    marginTop: 150,
    marginBottom: 20,
  },
  text: {
    color: "steelblue",
    fontWeight: "500",
    fontSize: 20,
  },
  picker: {
    color: "black",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "powderblue",
    color: "white",
    borderRadius: 45,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  output: {
    width: 300,
    height: 150,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexWrap: "wrap",
    marginTop: 20,
  },
});
