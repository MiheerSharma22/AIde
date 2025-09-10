import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const TypingDot = ({ delay = 0 }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const AiReplyLoader = () => {
  return (
    <View style={styles.container}>
      <TypingDot delay={500} />
      <TypingDot delay={800} />
      <TypingDot delay={1100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#368ccc", // Match your AI bubble color
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12, // ✅ Fixed spacing so it's not cut off
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});

export default AiReplyLoader;
