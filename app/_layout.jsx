import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="chatType/index" />
        <Stack.Screen
          name="chats/index"
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackTitle: "Back",
            headerTintColor: "#a855f7",
            headerStyle: { backgroundColor: "#1c1c1d" },
          }}
        />
      </Stack>
    </>
  );
}
