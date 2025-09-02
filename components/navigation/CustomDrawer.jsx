import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAuthToken } from "@/hooks/useAuthToken";

export default function CustomDrawer() {
  const router = useRouter();
  const { userDetails, logoutUser } = useAuthToken();

  const user = {
    name: userDetails.name,
    profilePic: userDetails.photo,
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/"); // Go to home or login
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Drawer Options */}
      {/* <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/chatType/settings")}
        >
          <Ionicons name="settings-outline" size={22} color="#6200EE" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View> */}

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    margin: 15,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: "auto",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
