import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Icons from '../../../assets/icons/icons';
import Button from '../../../components/Button/index';
import { navigate, goBack } from '../../../navigation/navigationRef';
import OnboardingProgressBadge from '../component/OnboardingProgressBadge';
import { useApp } from '../../../contexts/AppContext';

const ReminderScreen = () => {
  const { userData, updateUserData } = useApp();
  const [selectedOption, setSelectedOption] = useState('committed');

  const handleContinue = () => {
    updateUserData({ 
      wantsReminders: selectedOption === 'committed',
    });
    navigate('PersonalizedPlanScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
            activeOpacity={0.7}
          >
            <Icons.Ionicons name="chevron-back" size={28} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Badge */}
        <OnboardingProgressBadge
          currentStep={6}
          totalSteps={7}
          customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
        />

        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
      <Image source={require('../../../assets/images/reminder.png')} style={styles.image} resizeMode='cover'/>
          {/* Title */}
          <Text style={styles.title}>Let's build a daily learning habit</Text>

          {/* Commitment Options */}
          <View style={styles.optionsContainer}>
            {/* Committed Option */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === 'committed' && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedOption('committed')}
              activeOpacity={0.8}
            >
              <View style={styles.recommendedBanner}>
                <Text style={styles.recommendedText}>STRONGLY RECOMMENDED</Text>
              </View>
              
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <Text
                    style={[
                      styles.optionTitle,
                      selectedOption === 'committed' ? styles.optionTitleSelected : styles.optionTitleUnselected,
                    ]}
                  >
                    Yes, I'm committed
                  </Text>
                  <View style={styles.socialProof}>
                    <View style={styles.avatarGroup}>
                      <View style={styles.smallAvatar}>
                        <Icons.Ionicons name="person" size={12} color={colors.accentBlue} />
                      </View>
                      <View style={styles.smallAvatar}>
                        <Icons.Ionicons name="person" size={12} color={colors.accent} />
                      </View>
                      <View style={styles.smallAvatar}>
                        <Icons.Ionicons name="person" size={12} color={colors.accentPink} />
                      </View>
                    </View>
                    <Text style={styles.socialProofText}>
                      12,654 get daily reminders.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.optionIcon}>
                  <Icons.Ionicons
                    name="notifications"
                    size={40}
                    color="#FFD700"
                  />
                  {selectedOption === 'committed' && (
                    <View style={styles.heartBadge}>
                      <Icons.Ionicons name="heart" size={14} color={colors.red_600} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Not Committed Option */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                styles.optionCardGrey,
                selectedOption === 'not_committed' && styles.optionCardSelectedGrey,
              ]}
              onPress={() => setSelectedOption('not_committed')}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <Text
                    style={[
                      styles.optionTitle,
                      styles.optionTitleGrey,
                      selectedOption === 'not_committed' && styles.optionTitleSelectedGrey,
                    ]}
                  >
                    I'm not committed
                  </Text>
                  <Text style={styles.optionSubtext}>We won't send reminders.</Text>
                </View>
                
                <View style={styles.optionIcon}>
                  <View style={styles.bellOffContainer}>
                    <Icons.Ionicons
                      name="notifications"
                      size={40}
                      color={colors.textLight}
                    />
                    <View style={styles.diagonalLine} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            We'll remind you for your daily lesson.
          </Text>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            icon="chevron-forward"
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
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.accentBlue,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    paddingTop: 8,
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 32,
    alignSelf: 'center',
    borderRadius: 12,
  },
  optionCardSelected: {
    borderColor: colors.accentBlue,
    backgroundColor: `${colors.accentBlue}40`,
  },
  optionCardGrey: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
  },
  optionCardSelectedGrey: {
    borderColor: colors.textLight,
    backgroundColor: colors.white,
  },
  recommendedBanner: {
    position: 'absolute',
    top: -8,
    right: 12,
    backgroundColor: colors.accentBlue,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 10,
  },
  recommendedText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  optionLeft: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  optionTitleSelected: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  optionTitleUnselected: {
    fontFamily: 'Poppins',
    color: colors.textLight,
  },
  optionTitleGrey: {
    fontFamily: 'Poppins',
    color: colors.textLight,
  },
  optionTitleSelectedGrey: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.textLight,
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    gap: -8,
  },
  smallAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accentBlue,
  },
  socialProofText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.textLight,
  },
  optionSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.textLight,
    marginTop: 4,
  },
  optionIcon: {
    marginLeft: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  bellOffContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagonalLine: {
    position: 'absolute',
    width: 50,
    height: 2,
    backgroundColor: colors.textLight,
    transform: [{ rotate: '45deg' }],
  },
  helperText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default ReminderScreen;

