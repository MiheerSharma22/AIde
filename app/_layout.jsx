import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: "#f4511e", // header section background color
    //   },
    //   headerTintColor: "#fff", // header text color
    //   headerTitleStyle: {
    //     fontWeight: "500", // header title font weight
    //   },
    // }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
