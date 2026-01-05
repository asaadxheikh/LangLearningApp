import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../../../theme/colors'
const OnboardingProgressBadge = ({ currentStep, totalSteps=5 ,customstyles}) => {
  return (
    <View style={[styles.container,customstyles]}>
      <Text style={styles.text}>
        {currentStep}/{totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
  },
});

export default OnboardingProgressBadge;
