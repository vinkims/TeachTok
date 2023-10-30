import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const scale = height / 729;

interface QuestionProps {
  question: string;
}

function QuestionContainer({ question }: QuestionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.questionFrame}>
        <Text style={styles.questionText}>
          {question && <Text style={styles.questionTextBackground}>{question}</Text>}
        </Text>
      </View>
    </View>
  );
}

export default QuestionContainer;

const styles = StyleSheet.create({
  container: {
    height: 300 * scale,
    paddingVertical: 40 * scale,
    width: width * 0.784
  },
  questionFrame: {
    minWidth: width * 0.597,
    maxWidth: width * 0.613,
  },
  questionText: {
    color: COLORS.white,
    flexWrap: "wrap",
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 26.25,
  },
  questionTextBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 10
  },
});