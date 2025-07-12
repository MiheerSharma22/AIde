import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// TODO: also import message card using alias import not relative import
import { MessageCard } from "../../components/MessageCard";

export default function Chats() {
  const { token, chatType } = useLocalSearchParams();
  const [allMessages, setAllMessages] = useState([]);

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

  // TODO: CHANGE THE WAY WE PASS TOKEN FROM ROOT INDEX FILE (PARAMS), STORE IT IN CENTRAL STATE
  // fetch all the messages from the server
  const handleFetchAllChats = async () => {
    const data = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}${chatTypeToAPIEndpointMap[chatType]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await data.json();
    console.log("get all messages response: ", res);
    setAllMessages(res.data[chatTypeToResuLtKeyMap[chatType]]);
  };
  useEffect(() => {
    handleFetchAllChats();
  }, []);

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
