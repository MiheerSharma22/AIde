import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Link href="/login" className="text-white">
        Login to page
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
