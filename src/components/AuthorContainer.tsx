import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const scale = height / 729;

interface AuthorProps {
  authorName: string;
  description: string;
}

function AuthorContainer({ authorName, description }: AuthorProps) {
  const parts = description.split('#');
  const mainText = parts[0];
  const highlighted = parts[1];
  return (
    <View style={styles.container}>
      {authorName && <Text style={styles.authorName}>{authorName}</Text>}
      <View style={styles.descriptionView}>
        {description && <Text style={[styles.descriptionText, {fontWeight: "400"}]}>{mainText}</Text>}
        {description && <Text style={[styles.descriptionText, {fontWeight: "700"}]}> #{highlighted}</Text>}
      </View>
    </View>
  );
}

export default AuthorContainer;

const styles = StyleSheet.create({
  authorName: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17.9
  },
  container: {
    height: 40 * scale,
    bottom: 0,
    position: "absolute"
  },
  descriptionText: {
    color: COLORS.white,
    fontSize: 13,
    lineHeight: 15.51
  },
  descriptionView: {
    flexDirection: "row"
  },
});