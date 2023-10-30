import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../constants/theme";

const width = Dimensions.get("window").width;

interface AnswerProps {
	answer: string;
  answerId: string;
	index: number;
  correct: boolean;
  onSelect: (questionId: number, answerId: string, correct: boolean) => void;
  questionId: number;
}

function AnswerContainer({ index, answer, answerId, correct, onSelect, questionId }: AnswerProps) {
  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ selected, setSelected ] = useState(false);

  const containerStyle = selected 
    ? correct
      ? styles.correctAnswerContainer : styles.wrongAnswerContainer
    : styles.container;

  const handleAnswerSelect = () => {
    setSelected(true);
    onSelect(questionId, answerId, correct);
  }

	return (
		<TouchableOpacity style={containerStyle} key={index} activeOpacity={0.1} onPress={handleAnswerSelect}>
      <View style={styles.textContainer}>
			  {answer && <Text style={styles.answerText}>{answer}</Text>}
      </View>
		</TouchableOpacity>
	);
}

export default AnswerContainer;

const styles = StyleSheet.create({
	answerText: {
    color: COLORS.white,
    elevation: 5,
    fontFamily: 'SF-Pro-Rounded',
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 20.29,
    opacity: 1,
    textShadowColor: COLORS.black,
    textShadowOffset: {
      height: 0,
      width: -1
    },
    textShadowRadius: 0.5,
  },
  correctAnswerContainer: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 5,
    padding: 12,
    width: width * 0.784,
  },
	container: {
		backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 5,
    padding: 12,
    width: width * 0.784
	},
  textContainer: {
    opacity: 1
  },
  wrongAnswerContainer: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 5,
    padding: 12,
    width: width * 0.784,
  },
});