// best way to create a route => create a folder with route name and in that folder
// create a index.jsx file and export it
// in root (app's) index.jsx file use link tag to this exported file
import { View, Text } from "react-native";
import React from "react";

const About = () => {
  return (
    <View>
      <Text> About</Text>
    </View>
  );
};

export default About;
