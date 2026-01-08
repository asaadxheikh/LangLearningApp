// src/screens/onBoarding/WelcomeScreen/index.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../../../theme/colors';
import Icons from '../../../assets/icons/icons'
import CustomInput from '../../../components/CustomInput/index';
import Button from '../../../components/Button/index';
import { navigate } from '../../../navigation/navigationRef';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBadge from '../component/OnboardingProgressBadge'
import { useApp } from '../../../contexts/AppContext';

const WelcomeScreen = () => {
  const [userName, setUserName] = useState('');
  const { updateUserData } = useApp();

  const handleContinue = () => {
    if (userName.trim()) {
      updateUserData({ userName: userName.trim() });
      navigate('LangLangSelection');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
                <OnboardingProgressBadge
    currentStep={1}
    customstyles={{marginHorizontal:20}}
  />
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icons.Ionicons name="globe-outline" size={56} color={colors.accent} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Learn the language{'\n'}you actually need
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Speak confidently in real-life situations with personalized daily lessons
          </Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <CustomInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </View>

          {/* Features List */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.featureText}>5-10 min daily sessions</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.accentPink }]} />
              <Text style={styles.featureText}>Real-life scenarios</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.accentBlue }]} />
              <Text style={styles.featureText}>AI-powered personalization</Text>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            icon="chevron-forward"
            disabled={!userName.trim()}
            onPress={handleContinue}
          />
        </View>
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Poppins',
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  inputContainer: {
    marginBottom: 32,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: colors.text,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

export default WelcomeScreen;