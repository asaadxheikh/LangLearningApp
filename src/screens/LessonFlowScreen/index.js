// src/screens/learning/ScenarioScreen/index.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';
import Button from '../../components/Button/index';

const LessonFlowScreen = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState('scenario'); // scenario, dialogue, response, feedback
  const [selectedResponse, setSelectedResponse] = useState('');
  const [fadeAnim] = useState(new Animated.Value(1));

  // Mock scenario data
  const scenarioData = {
    title: 'Ordering at a Restaurant',
    situation: 'You are at a restaurant in Madrid and want to order food.',
    icon: 'restaurant',
    color: colors.accentBlue,
  };

  const dialogueData = {
    waiterText: '¡Hola! ¿Qué le gustaría ordenar?',
    waiterTranslation: 'Hello! What would you like to order?',
    waiterImage: '👨‍🍳',
  };

  const responseOptions = [
    {
      id: 1,
      text: 'Me gustaría una paella, por favor.',
      translation: 'I would like a paella, please.',
      isCorrect: true,
    },
    {
      id: 2,
      text: 'Quiero la cuenta.',
      translation: 'I want the bill.',
      isCorrect: false,
    },
    {
      id: 3,
      text: '¿Dónde está el baño?',
      translation: 'Where is the bathroom?',
      isCorrect: false,
    },
  ];

  const feedbackData = {
    correct: {
      title: '¡Excelente! 🎉',
      message: 'Perfect! You used the polite form "Me gustaría" which is great for ordering in restaurants.',
      tips: 'Remember to always say "por favor" (please) to be polite!',
    },
    incorrect: {
      title: 'Not quite! 🤔',
      message: 'This response doesn\'t fit the situation. The waiter is asking what you\'d like to order.',
      tips: 'Try using "Me gustaría..." (I would like...) when ordering food.',
    },
  };

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentStep === 'scenario') {
        setCurrentStep('dialogue');
      } else if (currentStep === 'dialogue') {
        setCurrentStep('response');
      } else if (currentStep === 'response') {
        setCurrentStep('feedback');
      }
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleResponseSelect = (option) => {
    setSelectedResponse(option.id);
  };

  const handleSubmitResponse = () => {
    if (selectedResponse) {
      handleNext();
    }
  };

  const handleComplete = () => {
    navigation.goBack(); // Auto-return to main screen
  };

  const renderScenario = () => (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      {/* Scenario Icon */}
      <View style={[styles.scenarioIconContainer, { backgroundColor: `${scenarioData.color}25` }]}>
        <Icons.Ionicons name={scenarioData.icon} size={64} color={scenarioData.color} />
      </View>

      {/* Scenario Title */}
      <Text style={styles.scenarioTitle}>{scenarioData.title}</Text>

      {/* Situation Description */}
      <View style={styles.situationCard}>
        <View style={styles.situationHeader}>
          <Icons.Ionicons name="information-circle" size={24} color={colors.accent} />
          <Text style={styles.situationHeaderText}>Situation</Text>
        </View>
        <Text style={styles.situationText}>{scenarioData.situation}</Text>
      </View>

      {/* Context Info */}
      <View style={styles.infoBox}>
        <Icons.Ionicons name="bulb" size={20} color={colors.accentPink} />
        <Text style={styles.infoText}>
          Pay attention to the context and choose the most appropriate response.
        </Text>
      </View>

      <Button
        title="Start Dialogue"
        icon="arrow-forward"
        onPress={handleNext}
        style={styles.button}
      />
    </Animated.View>
  );

  const renderDialogue = () => (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      {/* Character */}
      <View style={styles.characterContainer}>
        <View style={styles.characterBubble}>
          <Text style={styles.characterEmoji}>{dialogueData.waiterImage}</Text>
        </View>
        <Text style={styles.characterLabel}>Waiter</Text>
      </View>

      {/* Dialogue Bubble */}
      <View style={styles.dialogueBubble}>
        <Text style={styles.dialogueText}>{dialogueData.waiterText}</Text>
        <View style={styles.translationContainer}>
          <Icons.Ionicons name="language" size={16} color={colors.textLight} />
          <Text style={styles.translationText}>{dialogueData.waiterTranslation}</Text>
        </View>
      </View>

      {/* Audio Button */}
      <TouchableOpacity style={styles.audioButton}>
        <Icons.Ionicons name="volume-high" size={24} color={colors.white} />
        <Text style={styles.audioButtonText}>Listen Again</Text>
      </TouchableOpacity>

      <Button
        title="Choose Response"
        icon="arrow-forward"
        onPress={handleNext}
        style={styles.button}
      />
    </Animated.View>
  );

  const renderResponse = () => (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Choose your response:</Text>

      {/* Response Options */}
      <View style={styles.responseContainer}>
        {responseOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.responseCard,
              selectedResponse === option.id && styles.responseCardSelected,
            ]}
            onPress={() => handleResponseSelect(option)}
            activeOpacity={0.7}
          >
            <View style={styles.responseContent}>
              <Text style={styles.responseText}>{option.text}</Text>
              <Text style={styles.responseTranslation}>{option.translation}</Text>
            </View>
            
            {selectedResponse === option.id && (
              <View style={styles.selectedBadge}>
                <Icons.Ionicons name="checkmark-circle" size={24} color={colors.accent} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Submit Answer"
        icon="checkmark"
        disabled={!selectedResponse}
        onPress={handleSubmitResponse}
        style={styles.button}
      />
    </Animated.View>
  );

  const renderFeedback = () => {
    const selectedOption = responseOptions.find((opt) => opt.id === selectedResponse);
    const feedback = selectedOption?.isCorrect ? feedbackData.correct : feedbackData.incorrect;

    return (
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {/* Feedback Icon */}
        <View
          style={[
            styles.feedbackIconContainer,
            {
              backgroundColor: selectedOption?.isCorrect
                ? `${colors.accent}25`
                : `${colors.accentPink}25`,
            },
          ]}
        >
          <Icons.Ionicons
            name={selectedOption?.isCorrect ? 'checkmark-circle' : 'close-circle'}
            size={64}
            color={selectedOption?.isCorrect ? colors.accent : colors.accentPink}
          />
        </View>

        {/* Feedback Title */}
        <Text style={styles.feedbackTitle}>{feedback.title}</Text>

        {/* Selected Response Review */}
        <View style={styles.reviewCard}>
          <Text style={styles.reviewLabel}>Your answer:</Text>
          <Text style={styles.reviewText}>{selectedOption?.text}</Text>
          <Text style={styles.reviewTranslation}>{selectedOption?.translation}</Text>
        </View>

        {/* Feedback Message */}
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackMessage}>{feedback.message}</Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Icons.Ionicons name="bulb" size={20} color={colors.accentBlue} />
            <Text style={styles.tipsHeaderText}>Tip</Text>
          </View>
          <Text style={styles.tipsText}>{feedback.tips}</Text>
        </View>

        <Button
          title="Complete Lesson"
          icon="checkmark-done"
          onPress={handleComplete}
          style={styles.button}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icons.Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Real-Life Scenario</Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icons.Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

     

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentStep === 'scenario' && renderScenario()}
        {currentStep === 'dialogue' && renderDialogue()}
        {currentStep === 'response' && renderResponse()}
        {currentStep === 'feedback' && renderFeedback()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  closeButton: {
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
  progressSteps: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: colors.secondary,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: colors.accent,
  },
  progressStepCompleted: {
    backgroundColor: colors.accent,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  scenarioIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  scenarioTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  situationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  situationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  situationHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  situationText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.text,
    lineHeight: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.accentPink}15`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.text,
    lineHeight: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  characterBubble: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  characterEmoji: {
    fontSize: 56,
  },
  characterLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  dialogueBubble: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  dialogueText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 28,
  },
  translationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  translationText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: colors.textLight,
    fontStyle: 'italic',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentBlue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  audioButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 20,
  },
  responseContainer: {
    gap: 12,
    marginBottom: 24,
  },
  responseCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseCardSelected: {
    borderColor: colors.accent,
    backgroundColor: `${colors.accent}10`,
  },
  responseContent: {
    flex: 1,
  },
  responseText: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  responseTranslation: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.textLight,
    fontStyle: 'italic',
  },
  selectedBadge: {
    marginLeft: 12,
  },
  feedbackIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  feedbackTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textLight,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  reviewTranslation: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: colors.textLight,
    fontStyle: 'italic',
  },
  feedbackCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackMessage: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.text,
    lineHeight: 24,
  },
  tipsCard: {
    backgroundColor: `${colors.accentBlue}15`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  tipsHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  tipsText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: colors.text,
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
  },
});

export default LessonFlowScreen;