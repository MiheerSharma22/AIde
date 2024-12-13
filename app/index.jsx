import { useRouter } from "expo-router";
import {
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  Button,
} from "react-native";
import homeScreenBG from "@/assets/images/AIde-homescreen-bg.png";
import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import * as Google from "expo-auth-session/providers/google";
// web browser inside our application so we dont have to leave the app to google sign in
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: "",
    responseType: "id_token",
  });

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomeText(true);
    }, [700]);
  }, []);

  // to call the fetch all chats api when received token from google after user tries to login
  useEffect(() => {
    if (response?.params?.id_token)
      handleLoginSuccess(response?.params?.id_token);
  }, [response]);

  // function to call the backend API for auhtorisation after getting the token from google auth
  const handleLoginSuccess = async (token) => {
    console.log("response after login: ", token);

    // Send the ID token to the backend
    const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    });

    const data = await res.json();
    if (data.success)
      router.push({ pathname: "/chats", params: { token: data.accessToken } });
    console.log("Logged in user:", data);
  };

  return (
    // background image container
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
      {/* <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </GoogleOAuthProvider> */}
      <Button title="Sign in with Google" onPress={promptAsync} />
    </ImageBackground>
  );
}
