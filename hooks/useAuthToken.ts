import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      const accessToken = await AsyncStorage.getItem("userAccessToken");
      accessToken && setAccessToken(accessToken);

      const user = await AsyncStorage.getItem("userDetails");
      user && setUserDetails(JSON.parse(user));
    };

    getUserDetails();
  }, []);

  const setUserAndAccessToken = async (
    token: string,
    user: {
      id: string;
      name: string | null;
      email: string;
      photo: string | null;
      familyName: string | null;
      givenName: string | null;
    }
  ) => {
    await AsyncStorage.setItem("userAccessToken", token);
    await AsyncStorage.setItem("userDetails", JSON.stringify(user));
  };

  const logoutUser = async () => {
    await AsyncStorage.clear();
  };

  return { accessToken, setUserAndAccessToken, userDetails, logoutUser };
};
