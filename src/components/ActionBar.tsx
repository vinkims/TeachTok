import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import ActionBarIcon from "./ActionBarIcon";
import UserActionBarIcon from "./UserActionBarIcon";

const height = Dimensions.get("window").height;
const scale = height / 729;

interface ActionBarProps {
  profileUrl: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ profileUrl }) => {
  return (
    <View style={styles.actionBar}>
      <UserActionBarIcon profileUrl={profileUrl} />
      <ActionBarIcon url="likes" iconText="87"/>
      <ActionBarIcon url="message" iconText="2"/>
      <ActionBarIcon url="bookmark" iconText="203"/>
      <ActionBarIcon url="arrow" iconText="17"/>
    </View>
  );
}

export default ActionBar;

const styles = StyleSheet.create({
  actionBar: {
    bottom: 0,
    height: 297 * scale,
    marginHorizontal: 10,
    position: "absolute",
    right: 0,
    width: 45
  },
})