import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
