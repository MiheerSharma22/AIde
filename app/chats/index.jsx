import { Text, ScrollView, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatBg from "@/assets/images/chatBg.png";

import { MessageCard } from "@/components/MessageCard";
import { useAuthToken } from "@/hooks/useAuthToken";
import MessageInput from "@/components/MessageInput";

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
        <Text className="m-auto opacity-70 text-white text-xl font-semibold tracking-wider">
          No messages yet! Start asking.
        </Text>
      )}

      <MessageInput
        accessToken={accessToken}
        chatType={chatType}
        setAllMessages={setAllMessages}
      />
    </ImageBackground>
  );
}
