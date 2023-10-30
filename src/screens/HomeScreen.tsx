import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from "react-native";

import ActionBar from '../components/ActionBar';
import AnswerContainer from '../components/AnswerContainer';
import AuthorContainer from '../components/AuthorContainer';
import PlaylistContainer from '../components/PlaylistContainer';
import QuestionContainer from '../components/QuestionContainer';
import TopBar from '../components/TopBar';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = height / 729;

interface CorrectOption {
  answer: string;
  id: string;
  correct: boolean;
}

interface CorrectOptionData {
  correct_options: CorrectOption[];
  id: number;
}

interface HomeScreenProps {
  navigation: any;
}

interface QuestionProps {
  description: string;
  id: number;
  image: string;
  options: Array<{ answer: string; id: string}>;
  playlist: string;
  question: string;
  type: string;
  user: {
    avatar: string;
    name: string;
  };
}

interface QuestionDataProps {
  data: QuestionProps;
  handleAnswerSelect: (index: number, answer: string, correct: boolean) => void;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  let timerId: NodeJS.Timeout;
  const [ answerCorrect, setAnswerCorrect ] = useState(false);
  const [ appData, setAppData ] = useState<QuestionProps[]>([]);
  const [ hasMoreData, setHasMoreData ] = useState(true);
  const [ loadingMore, setLoadingMore ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ timer, setTimer ] = useState<number>(0);

  const fetchQuestions = async (pageNumber: number) => {
    try {
      const response = await fetch (
        'https://cross-platform.rp.devfactory.com/for_you',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data.options.length > 0) {
          setAppData((prevData) => [...prevData, data]);
          setPage(pageNumber + 1);
        } else {
          setHasMoreData(false);
        }
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log('Error getting questions: ', error);
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    fetchQuestions(page);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      startTimer();
    });

    return () => {
      unsubscribe();
      clearInterval(timerId);
    }
  }, [navigation]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}m`;
  }

  const handleAnswerSelect = async (questionId: number, answerId: string, correct: boolean) => {
    console.log("Selected answer: ", answerId);
    console.log("Question no: ", questionId);

    await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${questionId}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data: CorrectOptionData) => {
      console.log(data);
      const selectedAnswer = data.correct_options.find((option) => option.id === answerId);
      if (selectedAnswer) {
        selectedAnswer.correct = true;
      }
    })
    .catch ((error) => {
      console.log('Error', error);
    })
  }

  const handleEndReached = () => {
    if (!loadingMore && hasMoreData) {
      setLoadingMore(true);
      fetchQuestions(page);
    }
  };

  const startTimer = () => {
    timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
      setTimer(0);
    }
  };

  const QuestionView = ({data, handleAnswerSelect}: QuestionDataProps) => {
    const image = {uri: data.image}
    return (
      <View style={[styles.container]}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          <TopBar timer={formatTime(timer)} />
          <View style={styles.multipleChoiceView}>
            <View style={styles.multipleChoiceQuestionView}>
              <View style={styles.questionView}>
                <View style={styles.question}>
                  <QuestionContainer question={data.question} />
                  <View style={styles.answerFrame}>
                    {data.options.map((item, index) => (
                      <AnswerContainer 
                        index={index} 
                        questionId={data.id} 
                        answer={item.answer} 
                        answerId={item.id} 
                        key={item.id}  
                        correct={answerCorrect}
                        onSelect={(selectedIdx, selectedAnswer, correct) => 
                          handleAnswerSelect(selectedIdx, selectedAnswer, correct)
                        }
                      />
                    ))}
                  </View>
                </View>
                <AuthorContainer authorName={data.user.name} description={data.description} />
              </View>
              <ActionBar profileUrl={data.user.avatar} />
            </View>
            <PlaylistContainer playlist={data.playlist} />
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <FlatList
      data={appData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <QuestionView data={item} handleAnswerSelect={handleAnswerSelect} />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      initialNumToRender={10}
      contentContainerStyle={{ height: appData.length * height }}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index
      })}
    />
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  answerFrame: {
    height: 172 * scale,
    marginTop: 8 * scale,
    width: width * 0.784
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    height: height,
    width: width
  },
  flatlistContainer: {
    height: height
  },
  multipleChoiceView: {
    height: 634 * scale,
    marginTop: 16 * scale,
    width: width,
  },
  multipleChoiceQuestionView: {
    flexDirection: "row",
    height: 578 * scale,
    marginTop: 12 * scale,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 0,
    width: width
  },
  question: {
    height: 514 * scale,
    width: width * 0.784
  },
  questionView: {
    height: 578 * scale,
    width: width * 0.784,
  },
  userAvatarContainer: {
    height: 53 * scale,
    width: 45
  },
  userAvatarImage: {
    borderRadius: 22.5,
    height: 45,
    width: 45
  }
});
