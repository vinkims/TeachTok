import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const scale = height / 729;

interface PlaylistProps {
  playlist: string
}

function PlaylistContainer({ playlist }: PlaylistProps) {
  return(
    <View style={styles.playlistView}>
      <View style={styles.imageView}>
        <Image source={require("../assets/album_icon.png")} style={styles.albumIcon} />
        {playlist && <Text style={styles.playlistText}>Playlist.Unit 5: {playlist}</Text>}
      </View>
      <Image source={require("../assets/right_arrow_icon.png")} style={styles.rightArrowIcon} />
    </View>
  );
}

export default PlaylistContainer;

const styles = StyleSheet.create({
  albumIcon: {
    height: 16,
    marginRight: 5,
    width: 20
  },
  imageView: {
    flexDirection: "row",
  },
  playlistText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 15.51
  },
  playlistView: {
    backgroundColor: "#161616",
    bottom: 0,
    flexDirection: "row",
    height: 36 * scale,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "absolute",
    width: width
  },
  rightArrowIcon: {
    height: 20,
    width: 20
  },
})