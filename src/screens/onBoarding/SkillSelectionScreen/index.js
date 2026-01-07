// src/screens/onBoarding/SkillLevelScreen/index.js

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
import { levels } from '../../../constants/data';
import Spacer from '../../../components/Spacer/Spacer'
import { useApp } from '../../../contexts/AppContext';

const SkillLevelScreen = () => {
  const { userData, updateUserData } = useApp();
  const { userName } = userData;
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleContinue = () => {
    if (selectedLevel) {
      updateUserData({ selectedLevel });
      navigate('PlacementTestScreen');
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
          
            <Spacer width={15}/>
          {/* <View style={styles.placeholder} /> */}
          <Text style={styles.userName}>{userName}</Text>
          
        </View>

        {/* Progress Badge */}
        <OnboardingProgressBadge
          currentStep={4}
          totalSteps={5}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your level?</Text>
          <Text style={styles.subtitle}>This helps us personalize your learning</Text>
        </View>

        {/* Levels List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.levelsContainer}>
            {levels.map((level) => {
              const isSelected = selectedLevel === level.id;

              return (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelCard,
                    isSelected && {
                      borderColor: level.color,
                      backgroundColor: `${level.color}15`,
                    },
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                  activeOpacity={0.7}
                >
                  {/* Icon */}
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${level.color}25` },
                    ]}
                  >
                    <Icons.Ionicons
                      name={isSelected ? level.icon : `${level.icon}-outline`}
                      size={28}
                      color={level.color}
                    />
                  </View>

                  {/* Text Content */}
                  <View style={styles.textContent}>
                    <Text style={styles.levelName}>{level.name}</Text>
                    <Text style={styles.levelDescription}>{level.description}</Text>
                  </View>

                  {/* Radio Button */}
                  <View
                    style={[
                      styles.radio,
                      isSelected && { borderColor: level.color },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[styles.radioInner, { backgroundColor: level.color }]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            Don't worry, we'll adjust the difficulty as you progress
          </Text>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            icon="chevron-forward"
            disabled={!selectedLevel}
            onPress={handleContinue}
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
  levelsContainer: {
    gap: 12,
  },
  levelCard: {
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
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
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

export default SkillLevelScreen;