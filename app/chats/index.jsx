import { Text, ScrollView, ImageBackground } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatBg from "@/assets/images/chatBg.png";

import { MessageCard } from "@/components/MessageCard";
import { useAuthToken } from "@/hooks/useAuthToken";
import MessageInput from "@/components/MessageInput";

export default function Chats() {
  const chatScrollRef = useRef();
  const { chatType } = useLocalSearchParams();
  const [allMessages, setAllMessages] = useState([]);
  const { accessToken } = useAuthToken();

  const chatTypeToResultKeyMap = {
    recipe: "allUserRecipes",
    chat: "allUserMessages",
    itinerary: "allUserItineraries",
  };

  const chatTypeToAPIEndpointMap = {
    recipe: "/getAllRecipes",
    chat: "/getAllChatMessages",
    itinerary: "/getAllItineraries",
  };

  useEffect(() => {
    chatScrollRef.current?.scrollToEnd({ animated: false });
  }, [allMessages]);

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

    setAllMessages(res.data[chatTypeToResultKeyMap[chatType]]);
  };

  useEffect(() => {
    accessToken && handleFetchAllChats();
  }, [accessToken]);

  return (
    <ImageBackground source={ChatBg} className="flex-1" resizeMode="cover">
      {allMessages?.length > 0 ? (
        <ScrollView
          className="rounded-md flex-1 p-4"
          ref={chatScrollRef}
          onContentSizeChange={() =>
            chatScrollRef.current?.scrollToEnd({ animated: false })
          }
        >
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
