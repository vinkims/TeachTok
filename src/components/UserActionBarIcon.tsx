import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/theme";

const height = Dimensions.get("window").height;
const scale = height / 729;

interface UserActionBarIconProps {
  profileUrl: string
}

const UserActionBarIcon: React.FC<UserActionBarIconProps> = ({ profileUrl }) => {
  const avatarUri = {uri: profileUrl}
  return (
    <View style={styles.container}>
      {profileUrl && <Image source={avatarUri} style={styles.image} />}
    </View>
  );
}

export default UserActionBarIcon;

const styles = StyleSheet.create({
  container: {
    height: 53 * scale,
    width: 45
  },
  image: {
    borderRadius: 22.5,
    height: 45,
    width: 45
  }
});