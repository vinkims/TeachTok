import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/theme";
import arrowIcon from "../assets/arrow_icon.png";
import bookmarkIcon from "../assets/bookmark_white_icon.png";
import likesIcon from "../assets/likes_icon.png";
import messageIcon from "../assets/message_icon.png";

const height = Dimensions.get("window").height;
const scale = height / 729;

interface ActionBarIconProps {
  url: string;
  iconText: string;
}

const ActionBarIcon: React.FC<ActionBarIconProps> = ({ url, iconText }) => {
  let source;
  switch (url) {
    case 'arrow':
      source = arrowIcon;
      break;
    case 'bookmark':
      source = bookmarkIcon;
      break;
    case 'likes':
      source = likesIcon;
      break;
    case 'message':
      source = messageIcon;
      break;
    default:
      source = null;
  }

  return (
    <View style={styles.actionBarIconView}>
      {source && <Image source={source} style={styles.actionBarIcon} />}
      <Text style={styles.actionBarIconText}>{iconText}</Text>
    </View>
  );
}

export default ActionBarIcon

const styles = StyleSheet.create({
  actionBarIcon: {
    height: 30,
    width: 30
  },
  actionBarIconText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "500"
  },
  actionBarIconView: {
    alignItems: "center",
    height: 45 * scale,
    marginTop: 5,
    width: 46
  },
});