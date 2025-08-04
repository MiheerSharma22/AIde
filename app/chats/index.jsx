import { Text, ScrollView, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ChatBg from "@/assets/images/chatBg.png";

// TODO: also import message card using alias import not relative import
import { MessageCard } from "../../components/MessageCard";
import { useAuthToken } from "@/hooks/useAuthToken";

export default function Chats() {
  const { chatType } = useLocalSearchParams();
  const [allMessages, setAllMessages] = useState([]);
  const { accessToken } = useAuthToken();

  const chatTypeToResuLtKeyMap = {
    recipe: "allUserRecipes",
    chat: "allUserMessages",
    itinerary: "allUserItineraries",
  };

  const chatTypeToAPIEndpointMap = {
    recipe: "/getAllRecipes",
    chat: "/getAllChatMessages",
    itinerary: "/getAllItineraries",
  };

  // fetch all the messages from the server
  const handleFetchAllChats = async () => {
    const data = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}${chatTypeToAPIEndpointMap[chatType]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const res = await data.json();
    console.log("get all messages response: ", res);
    setAllMessages(res.data[chatTypeToResuLtKeyMap[chatType]]);
  };

  useEffect(() => {
    accessToken && handleFetchAllChats();
  }, [accessToken]);

  return (
    <ImageBackground source={ChatBg} className="flex-1" resizeMode="cover">
      {allMessages?.length > 0 ? (
        <ScrollView className="rounded-md flex-1 p-4">
          {allMessages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </ScrollView>
      ) : (
        <Text>No Messages Yet! start asking.</Text>
      )}
    </ImageBackground>
  );
}
