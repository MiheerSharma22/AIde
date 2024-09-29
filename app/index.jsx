import { Link } from "expo-router"; // If you're using this for navigation
import { ImageBackground, Text, View, Image } from "react-native";
import homeScreenBG from "@/assets/images/AIde-homescreen-bg.png";
import logo from "@/assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export default function Index() {
  const [showWelcomeText, setShowWelcomeText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomeText(true);
    }, [700]);
  }, []);

  return (
    // backgrpund image container
    <ImageBackground
      source={homeScreenBG} // You can use the imported image directly
      style={{
        flex: 1,
        width: "100%", // Ensure it stretches across the width
        height: "100%", // Ensure it stretches across the height
        justifyContent: "space-around",
        alignItems: "center",
        gap: "5rem",
      }}
      resizeMode="cover"
    >
      {/*logo and welcome text */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          width: "80%",
          transformOrigin: "center",
        }}
      >
        {/* logo image */}
        <Image source={logo} className="h-[80px]" resizeMode="contain" />

        {/* welcome screen text */}
        {showWelcomeText && (
          <Text
            className="text-[#7B4FFA]"
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              transitionProperty: "all",
              transitionDuration: 150,
              fontFamily: "cursive",
              opacity: 0.7,
            }}
          >
            Your own AI helper.
          </Text>
        )}
      </View>

      {/* sign in with google button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: "rgba(115, 114, 115, 0.43)",
          borderRadius: "0.5rem",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.5rem",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text className="text-white">Google Sign IN</Text>
        <FontAwesome size={28} name="google" color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
}
