import React from 'react';
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
import OnboardingProgressBadge from '../component/OnboardingProgressBadge';
import { navigate,goBack } from '../../../navigation/navigationRef';

const PlacementTestScreen = ({ route }) => {
  const { userName, selectedLanguage, selectedGoals, selectedLevel } = route.params;

  const testAreas = [
    {
      id: 'listening',
      name: 'Listening',
      icon: 'headset',
      color: colors.accentBlue,
      description: 'Understand spoken language',
    },
    {
      id: 'understanding',
      name: 'Understanding',
      icon: 'bulb',
      color: colors.accent,
      description: 'Comprehend written content',
    },
    {
      id: 'speaking',
      name: 'Speaking',
      icon: 'mic',
      color: colors.accentPink,
      description: 'Express yourself clearly',
    },
  ];

  const handleTakeTest = () => {
    // Navigate to personalized plan screen
    navigate('PersonalizedPlanScreen', {
      userName,
      selectedLanguage,
      selectedGoals,
      selectedLevel,
      tookPlacementTest: true,
    });
  };

  const handleSkip = () => {
    // Navigate to personalized plan screen
    navigate('PersonalizedPlanScreen', {
      userName,
      selectedLanguage,
      selectedGoals,
      selectedLevel,
      tookPlacementTest: false,
    });
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
          currentStep={5}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icons.Ionicons name="clipboard" size={56} color={colors.accent} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Optional Placement Test</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Take a short test to help us better understand your current level
          </Text>

          {/* Test Areas */}
          <View style={styles.testAreasContainer}>
            <Text style={styles.sectionTitle}>Short test covering:</Text>
            
            {testAreas.map((area) => (
              <View key={area.id} style={styles.testAreaCard}>
                <View
                  style={[
                    styles.areaIconContainer,
                    { backgroundColor: `${area.color}25` },
                  ]}
                >
                  <Icons.Ionicons
                    name={area.icon}
                    size={24}
                    color={area.color}
                  />
                </View>
                
                <View style={styles.areaTextContent}>
                  <Text style={styles.areaName}>{area.name}</Text>
                  <Text style={styles.areaDescription}>{area.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Icons.Ionicons name="time-outline" size={20} color={colors.accent} />
            <Text style={styles.infoText}>Takes about 5-7 minutes</Text>
          </View>

          {/* Skip Note */}
          <Text style={styles.skipNote}>
            You can skip this test. We'll adjust the difficulty as you learn.
          </Text>
        </ScrollView>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Take Test"
            icon="checkmark-circle"
            onPress={handleTakeTest}
            style={{ marginBottom: 12 }}
          />
          
          <Button
            title="Skip for Now"
            variant="outlined"
            onPress={handleSkip}
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
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
  },
  testAreasContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  testAreaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  areaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  areaTextContent: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  areaDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.accent}15`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  skipNote: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default PlacementTestScreen;