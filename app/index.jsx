import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text className="text-white">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text className="text-white text-lg">
        This page has no header shown on top
      </Text>

      {/* about route => separate folder (best approach) */}
      <Link className="mt-10 text-xl text-white" href={"./about"}>
        Go to about (folder based)
      </Link>

      {/* career route => single file in root folder */}
      <Link className="text-xl text-white" href={"./career"}>
        Go to career (file in root app folder)
      </Link>
    </View>
  );
}
