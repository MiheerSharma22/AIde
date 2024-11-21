import { Link } from "expo-router"; // If you're using this for navigation
import { ImageBackground, Text, View, Image } from "react-native";
import homeScreenBG from "@/assets/images/AIde-homescreen-bg.png";
import logo from "@/assets/images/logo.png";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Index() {
  const [showWelcomeText, setShowWelcomeText] = useState(false);

  const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomeText(true);
    }, [700]);
  }, []);

  // function to call the backend API for auhtorisation after getting the token from google auth
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("response after login: ", credentialResponse);
    const { credential } = credentialResponse;

    // Send the ID token to the backend
    const res = await fetch("http://localhost:4000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credential }),
    });

    const data = await res.json();
    console.log("Logged in user:", data);
  };

  // google login failure handler
  const handleLoginFailure = () => {
    console.error("Login failed");
  };

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
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </GoogleOAuthProvider>
    </ImageBackground>
  );
}
