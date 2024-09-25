import { Link } from "expo-router"; // If you're using this for navigation
import { ImageBackground, Text, View, StyleSheet, Button } from "react-native";
import homeScreenBG from "../assets/images/AIde-homescreen-bg.png";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
  return (
    <ImageBackground
      source={homeScreenBG} // You can use the imported image directly
      style={{
        flex: 1,
        width: "100%", // Ensure it stretches across the width
        height: "100%", // Ensure it stretches across the height
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
      resizeMode="cover"
    >
      <View className="w-[80%] flex items-center gap-5">
        <Text
          className="text-white"
          style={{
            fontSize: "2rem",
          }}
        >
          Welcome to AIde!
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "rgba(115, 114, 115, 0.43)",
          borderRadius: "0.5rem",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
        }}
        className="p-2"
      >
        <Text className="text-white">Google Sign IN</Text>
        <FontAwesome size={28} name="google" color="white" />
      </View>
    </ImageBackground>
  );
}
