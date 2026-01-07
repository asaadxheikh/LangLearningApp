// src/screens/onBoarding/LanguageSelectionScreen/index.js

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
import Button from '../../../components/Button';
import { goBack, navigate } from '../../../navigation/navigationRef';
import { languages } from '../../../constants/data';
import Icons from '../../../assets/icons/icons';
import OnboardingProgressBadge from '../component/OnboardingProgressBadge';
import { useApp } from '../../../contexts/AppContext';

const LanguageSelectionScreen = () => {
  const { userData, updateUserData } = useApp();
  const { userName } = userData;
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleNext = () => {
    if (selectedLanguage) {
      updateUserData({ selectedLanguage });
      navigate('GoalSelection');
    }
  };

  const handleLanguageSelect = (id) => {
    setSelectedLanguage(id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeader}>
  <TouchableOpacity onPress={() => goBack()}>
    <Icons.Ionicons
      name="chevron-back"
      size={28}
      color={colors.text}
    />
  </TouchableOpacity>

  <OnboardingProgressBadge
    currentStep={2}
  />
</View>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi {userName}! 👋</Text>
          <Text style={styles.subtitle}>
            Which language would you like to learn?
          </Text>
        </View>

        {/* Language Grid */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.id;

              return (
                <TouchableOpacity
                  key={lang.id}
                  activeOpacity={0.7}
                  onPress={() => handleLanguageSelect(lang.id)}
                  style={[
                    styles.languageCard,
                    isSelected
                      ? {
                          borderColor: lang.color,
                          backgroundColor: `${lang.color}20`,
                        }
                      : {
                          borderColor: 'transparent',
                          backgroundColor: colors.card,
                        },
                  ]}
                >
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text style={styles.languageName}>{lang.name}</Text>

                  {/* CHECK ICON — ONLY FOR SELECTED */}
                  {isSelected && (
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: lang.color },
                      ]}
                    >
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            icon="chevron-forward"
            disabled={!selectedLanguage}
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
  topHeader:{
   marginHorizontal:24,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  languageCard: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 3,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  flag: {
    fontSize: 48,
    marginBottom: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});

export default LanguageSelectionScreen;
