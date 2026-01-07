import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Icons from '../../../assets/icons/icons';
import Button from '../../../components/Button/index';
import OnboardingProgressBadge from '../component/OnboardingProgressBadge';
import { navigate, goBack } from '../../../navigation/navigationRef';
import { useApp } from '../../../contexts/AppContext';

const PersonalizedPlanScreen = () => {
  const { userData } = useApp();
  const { userName } = userData;
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Simulate plan generation loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Animate content appearance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  const handleStartLearning = () => {
    navigate('HomeScreen');
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
          currentStep={6}
          totalSteps={6}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            // Loading State
            <View style={styles.loadingContainer}>
              <View style={styles.loadingIconContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
                <View style={styles.loadingCircle}>
                  <Icons.Ionicons name="sparkles" size={64} color={colors.accent} />
                </View>
              </View>
              <Text style={styles.loadingText}>Generating your personalized plan...</Text>
            </View>
          ) : (
            // Content State
            <Animated.View
              style={[
                styles.contentContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Icon Container */}
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Icons.Ionicons name="checkmark-circle" size={56} color={colors.accent} />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.title}>Personal Plan Generated</Text>
              
              {/* Subtitle */}
              <Text style={styles.subtitle}>
                The app generates a personalized daily learning plan.
              </Text>

              {/* Success Animation */}
              <View style={styles.successContainer}>
                <View style={styles.successCard}>
                  <Icons.Ionicons name="calendar" size={32} color={colors.accent} />
                  <Text style={styles.successTitle}>Daily Plan Ready</Text>
                  <Text style={styles.successDescription}>
                    Your personalized learning journey starts now!
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}
        </ScrollView>

        {/* Start Learning Button */}
        {!isLoading && (
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Button
              title="Start Learning"
              icon="arrow-forward"
              onPress={handleStartLearning}
            />
          </Animated.View>
        )}
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
    justifyContent: 'space-between',
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  loadingIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  loadingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '500',
    marginTop:16
  },
  contentContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  successContainer: {
    width: '100%',
    marginTop: 16,
  },
  successCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.accent}30`,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default PersonalizedPlanScreen;

