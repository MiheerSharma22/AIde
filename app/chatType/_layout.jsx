import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/navigation/CustomDrawer";

export default function ChatTypeLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#1c1c1d" },
        headerTintColor: "#a855f7",
        drawerStyle: {
          backgroundColor: "#1c1c1d",
          width: 280,
        },
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Drawer>
  );
}
