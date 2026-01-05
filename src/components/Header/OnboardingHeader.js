import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import OnboardingProgressBadge from '../../screens/onBoarding/component/OnboardingProgressBadge'
const OnboardingHeader = ({
  userName,
  onBackPress,
  currentStep,
  totalSteps,
}) => {
  return (
    <>
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Icons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.userName}>{userName}</Text>

        {/* Placeholder for center alignment */}
        <View style={styles.placeholder} />
      </View>

      <OnboardingProgressBadge
        currentStep={currentStep}
        totalSteps={totalSteps}
        customstyles={{ marginHorizontal: 24, marginBottom: 16 }}
      />
    </>
  );
};

export default OnboardingHeader;
const styles = StyleSheet.create({
  
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
})