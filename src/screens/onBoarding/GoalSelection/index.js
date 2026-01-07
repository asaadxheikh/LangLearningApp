// src/screens/onBoarding/GoalSelectionScreen/index.js

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
import {colors} from '../../../theme/colors'
import {goBack, navigate} from '../../../navigation/navigationRef';
import OnboardingProgressBadge from '../../onBoarding/component/OnboardingProgressBadge';
import {goals} from '../../../constants/data'
import Icons from '../../../assets/icons/icons';
import Button from '../../../components/Button';
import { useApp } from '../../../contexts/AppContext';

const GoalSelectionScreen = () => {
  const { userData, updateUserData } = useApp();
  const { userName } = userData;
  const [selectedGoals, setSelectedGoals] = useState([]);


  const toggleGoal = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      updateUserData({ selectedGoals });
      navigate('SkillLevelScreenScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* Header with Back Button and Username */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
            activeOpacity={0.7}
          >
            <Icons.Ionicons name="chevron-back" size={28} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={styles.userName}>{userName}</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Progress Badge */}
        <OnboardingProgressBadge
          currentStep={3}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>Select one or more that apply</Text>
        </View>

        {/* Goals List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.goalsContainer}>
            {goals.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);

              return (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    isSelected && {
                      borderColor: goal.color,
                      backgroundColor: `${goal.color}15`,
                    },
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                  activeOpacity={0.7}
                >
                  {/* Icon Container */}
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${goal.color}25` },
                    ]}
                  >
                    <Icons.Ionicons
                      name={isSelected ? goal.icon : `${goal.icon}-outline`}
                      size={28}
                      color={goal.color}
                    />
                  </View>

                  {/* Goal Name */}
                  <Text style={styles.goalName}>{goal.name}</Text>

                  {/* Checkmark */}
                  {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: goal.color }]}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            Don't worry, you can change these later in settings
          </Text>
        </ScrollView>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            icon="chevron-forward"
            disabled={selectedGoals.length === 0}
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
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
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
    fontWeight: '600',
    color: colors.text,
    marginLeft:20
  },
  placeholder: {
    width: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 22,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default GoalSelectionScreen;

