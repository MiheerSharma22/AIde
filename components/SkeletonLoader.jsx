import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const SkeletonLoader = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true // reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const SkeletonBubble = ({ isLeft }) => (
    <View
      style={[
        styles.bubbleWrapper,
        isLeft ? styles.leftBubble : styles.rightBubble,
      ]}
    >
      <Animated.View
        style={[
          styles.bubble,
          isLeft ? styles.aiColor : styles.userColor,
          animatedStyle,
        ]}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[...Array(7)].map((_, i) => (
        <SkeletonBubble key={i} isLeft={i % 2 === 0} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  bubbleWrapper: {
    marginBottom: 20,
    maxWidth: "75%",
    minWidth: 200,
  },
  leftBubble: {
    alignSelf: "flex-start",
  },
  rightBubble: {
    alignSelf: "flex-end",
  },
  bubble: {
    height: 50,
    borderRadius: 10,
  },
  aiColor: {
    backgroundColor: "#368ccc88", // lighter AI blue
  },
  userColor: {
    backgroundColor: "#5f636888", // lighter user gray
  },
});

export default SkeletonLoader;
