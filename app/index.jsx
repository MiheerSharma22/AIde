import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  Button,
  Platform,
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

const {
  EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  EXPO_PUBLIC_BASE_URL,
} = process.env;

console.log("All ENV keys: ", Object.keys(process.env));

export default function Index() {
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const router = useRouter();
  const { accessToken, setUserAndAccessToken } = useAuthToken();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID,

      ...(Platform.OS === "ios" && {
        iosClientId: EXPO_PUBLIC_IOS_CLIENT_ID,
      }),

      ...(Platform.OS === "android" && {
        androidClientId: EXPO_PUBLIC_ANDROID_CLIENT_ID,
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

  console.log(
    "Google creds for o auth: ",
    EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    EXPO_PUBLIC_ANDROID_CLIENT_ID,
    EXPO_PUBLIC_IOS_CLIENT_ID
  );

  const handleGoogleSignIn = async () => {
    console.log("inside google sign in method");
    try {
      // await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log("response: ", response);

      if (isSuccessResponse(response)) {
        console.log("\ninside isSuccessResponse if block");

        const { idToken, user } = response.data;

        console.log("\nbefor calling google endpoint on BE");
        console.log("\nendpoint url BE login: ", EXPO_PUBLIC_BASE_URL);

        // Send the ID token to the backend
        const res = await fetch(`${EXPO_PUBLIC_BASE_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        });

        console.log("\nafter getting response from BE on sign in: ", res);

        const data = await res.json();

        console.log("\ndata from res: ", data);

        if (data.success) {
          setUserAndAccessToken(data.accessToken, user);

          router.push({
            pathname: "/chatType",
          });
        }
      } else {
        console.error("API not providing expected response!");
      }
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
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowWelcomeText(true);
  //   }, [700]);
  // }, []);

  // to call the fetch all chats api when received token from google after user tries to login

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

        {/* welcome screen text */}
        {/* {showWelcomeText && ( */}
        <Text className="text-[#7B4FFA] text-[15px] font-bold opacity-70 tracking-wider">
          Your own AI helper.
        </Text>
        {/* )} */}
      </View>

      {/* sign in with google button */}
      <Button
        title="Sign in with Google"
        onPress={() => {
          handleGoogleSignIn();
        }}
      />
      {/* </View> */}
    </ImageBackground>
  );
}
