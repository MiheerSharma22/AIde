import { Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

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
    <>
      {allMessages?.length > 0 ? (
        <ScrollView className="bg-green-500 rounded-md flex-1 p-4">
          {allMessages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </ScrollView>
      ) : (
        <Text>No Messages Yet! start asking.</Text>
      )}
    </>
  );
}
