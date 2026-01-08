import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Icons from '../../../assets/icons/icons';
import Button from '../../../components/Button/index';
import { navigate, goBack } from '../../../navigation/navigationRef';
import OnboardingProgressBadge from '../component/OnboardingProgressBadge';
import Spacer from '../../../components/Spacer/Spacer';
import { useApp } from '../../../contexts/AppContext';

const LevelAssessmentScreen = () => {
  const { userData, updateUserData } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'experience',
      question: 'How long have you been learning this language?',
      options: [
        { id: '0', text: 'Just starting (0-1 months)', score: 1 },
        { id: '1', text: 'A few months (2-6 months)', score: 2 },
        { id: '2', text: 'About a year (7-12 months)', score: 3 },
        { id: '3', text: 'More than a year (1-2 years)', score: 4 },
        { id: '4', text: 'Several years (2+ years)', score: 5 },
      ],
    },
    {
      id: 'conversation',
      question: 'How comfortable are you with basic conversations?',
      options: [
        { id: '0', text: 'Not at all - I can only say hello', score: 1 },
        { id: '1', text: 'A little - Simple greetings and basic phrases', score: 2 },
        { id: '2', text: 'Somewhat - I can talk about daily topics', score: 3 },
        { id: '3', text: 'Comfortable - I can have conversations on familiar topics', score: 4 },
        { id: '4', text: 'Very comfortable - I can discuss various topics', score: 5 },
      ],
    },
    {
      id: 'listening',
      question: 'How well do you understand native speakers?',
      options: [
        { id: '0', text: 'Not at all - I need everything translated', score: 1 },
        { id: '1', text: 'A little - Only slow, simple speech', score: 2 },
        { id: '2', text: 'Somewhat - I understand basic conversations', score: 3 },
        { id: '3', text: 'Well - I understand most conversations', score: 4 },
        { id: '4', text: 'Very well - I understand native speakers easily', score: 5 },
      ],
    },
    {
      id: 'reading',
      question: 'How well can you read and understand written text?',
      options: [
        { id: '0', text: 'Not at all - I can only read simple words', score: 1 },
        { id: '1', text: 'A little - Simple sentences with help', score: 2 },
        { id: '2', text: 'Somewhat - I can read basic texts', score: 3 },
        { id: '3', text: 'Well - I can read most texts with some difficulty', score: 4 },
        { id: '4', text: 'Very well - I can read complex texts easily', score: 5 },
      ],
    },
    {
      id: 'grammar',
      question: 'How confident are you with grammar rules?',
      options: [
        { id: '0', text: 'Not confident - I know very few rules', score: 1 },
        { id: '1', text: 'A little - I know some basic rules', score: 2 },
        { id: '2', text: 'Somewhat - I understand most basic grammar', score: 3 },
        { id: '3', text: 'Confident - I understand most grammar rules', score: 4 },
        { id: '4', text: 'Very confident - I have strong grammar knowledge', score: 5 },
      ],
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const selectedAnswer = answers[currentQuestion.id];

  const handleAnswerSelect = (optionId) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };

  const calculateLevel = () => {
    let totalScore = 0;
    let answeredCount = 0;

    questions.forEach((question) => {
      const answerId = answers[question.id];
      if (answerId !== undefined) {
        const selectedOption = question.options.find((opt) => opt.id === answerId);
        if (selectedOption) {
          totalScore += selectedOption.score;
          answeredCount++;
        }
      }
    });

    if (answeredCount === 0) return null;

    const averageScore = totalScore / answeredCount;

    // Determine level based on average score
    if (averageScore <= 2) {
      return '1'; // Beginner
    } else if (averageScore <= 3.5) {
      return '2'; // Intermediate
    } else {
      return '3'; // Advanced
    }
  };

  const handleNext = () => {
    if (selectedAnswer === undefined) return;

    if (isLastQuestion) {
      const determinedLevel = calculateLevel();
      if (determinedLevel) {
        updateUserData({ selectedLevel: determinedLevel });
        navigate('ReminderScreen');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      goBack();
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* Header with Back Button and Username */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Icons.Ionicons name="chevron-back" size={28} color={colors.text} />
          </TouchableOpacity>

          <Spacer width={15} />
        </View>

        {/* Progress Badge */}
        <OnboardingProgressBadge
          currentStep={4}
          totalSteps={5}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>

        {/* Question Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Let's find your level!</Text>
          <Text style={styles.subtitle}>
            Answer a few questions to help us personalize your learning
          </Text>
        </View>

        {/* Question Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.id;

                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                    ]}
                    onPress={() => handleAnswerSelect(option.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionContent}>
                      <View
                        style={[
                          styles.radio,
                          isSelected && styles.radioSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {option.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLastQuestion ? 'Finish Assessment' : 'Next Question'}
            icon="chevron-forward"
            disabled={selectedAnswer === undefined}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    marginBottom:15
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  progressBarContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.lightGrey,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: colors.textLight,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.textLight,
    lineHeight: 22,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 24,
    lineHeight: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  optionCardSelected: {
    borderColor: colors.accent,
    backgroundColor: `${colors.accent}15`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.text,
    lineHeight: 22,
  },
  optionTextSelected: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default LevelAssessmentScreen;

