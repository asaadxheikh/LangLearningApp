
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../../../theme/colors';

const WelcomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleContinue = () => {
    if (userName.trim()) {
      navigation.navigate('LanguageSelection', { userName: userName.trim() });
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
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="globe-outline" size={56} color={colors.accent} />
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
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={colors.textLight}
              value={userName}
              onChangeText={setUserName}
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
          <TouchableOpacity
            style={[
              styles.button,
              !userName.trim() && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!userName.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.text} />
          </TouchableOpacity>
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
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 17,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    backgroundColor: colors.white,
    color: colors.text,
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
    color: colors.text,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
});

export default WelcomeScreen;