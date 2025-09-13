import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  Button,
  Platform,
  ActivityIndicator,
} from "react-native";

// web browser inside our application so we dont have to leave the app to google sign in
import * as WebBrowser from "expo-web-browser";
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import homeScreenBG from "@/assets/images/AIde-homescreen-bg.png";
import logo from "@/assets/images/logo.png";
import { useAuthToken } from "@/hooks/useAuthToken";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const { accessToken, setUserAndAccessToken } = useAuthToken();
  const [signInLoading, setSignInLoading] = useState(false);

  // const {
  //   EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  //   EXPO_PUBLIC_ANDROID_CLIENT_ID,
  //   EXPO_PUBLIC_IOS_CLIENT_ID,
  //   EXPO_PUBLIC_BASE_URL,
  // } = process.env;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,

      ...(Platform.OS === "ios" && {
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      }),

      ...(Platform.OS === "android" && {
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
      }),

      profileImageSize: 150,
    });

    // Check token persistence on app load
    const checkUser = async () => {
      try {
        if (accessToken) {
          router.replace("/chatType");
        }
      } catch (e) {
        console.error("Error in checking user details", e);
      }
    };

    checkUser();
  }, [accessToken]);

  const handleGoogleSignIn = async () => {
    try {
      setSignInLoading(true);
      // await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;

        // Send the ID token to the backend
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_BASE_URL}/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setUserAndAccessToken(data.accessToken, user);

          router.replace({
            pathname: "/chatType",
          });
        }
      } else {
        console.error("API not providing expected response!");
      }
      setSignInLoading(false);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.warn("Google sign in is in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.warn("Google Play not available");
            break;
          default:
            console.log("Error in google sign in: ", error);
        }
      } else {
        console.error(
          "An error occured in google sign in but not related to it"
        );
      }
      setSignInLoading(false);
    }
  };

  return (
    // background image container
    <ImageBackground
      source={homeScreenBG} // You can use the imported image directly
      className="gap-[5rem] items-center justify-around h-[100%] w-[100%] flex-1"
      resizeMode="cover"
    >
      {/* <View className="gap-[5rem] items-center justify-around h-[100%] w-[100%] flex-1 bg-black"> */}
      {/* logo and welcome text */}
      <View className="gap-[20px] w-[80%] origin-center justify-center items-center">
        {/* logo image */}
        <Image source={logo} className="h-[80px]" resizeMode="contain" />

        <Text className="text-[#7B4FFA] text-[15px] font-bold opacity-70 tracking-wider">
          Your own AI helper.
        </Text>
      </View>

      {/* sign in with google button */}
      {signInLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => {
            handleGoogleSignIn();
          }}
        />
      )}
      {/* </View> */}
    </ImageBackground>
  );
}
