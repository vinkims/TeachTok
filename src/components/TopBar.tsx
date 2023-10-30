import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const scale = height / 729;

interface TopBarProps {
  timer: string;
}

function TopBar({ timer }: TopBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stopWatchView}>
        <Image source={require("../assets/stopwatch_light_grey.png")} style={styles.searchIcon} />
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      <Text style={styles.topBarText}>For You</Text>
      <Image source={require("../assets/search_icon.png")} style={styles.searchIcon} />
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 31 * scale,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: width
  },
  searchIcon: {
    height: 20,
    width: 20
  },
  stopWatchView: {
    flexDirection: "row",
    justifyContent: "center"
  },
  timerText: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: "500"
  },
  topBarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900"
  }
});