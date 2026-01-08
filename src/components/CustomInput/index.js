// src/shared/components/ui/Input.js

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  returnKeyType = 'done',
  onSubmitEditing,
  multiline = false,
  numberOfLines = 4,
  editable = true,
  style,
  inputStyle,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determine if it's a password field
  const isPassword = secureTextEntry;
  const showPasswordToggle = isPassword && !rightIcon;

  // Container style based on state
  const containerStyle = [
    styles.container,
    isFocused && styles.containerFocused,
    error && styles.containerError,
    !editable && styles.containerDisabled,
  ];

  return (
    <View style={[styles.wrapper, style]}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Container */}
      <View style={containerStyle}>
        {/* Left Icon */}
        {icon && (
          <View style={styles.iconLeft}>
            <Icons.Ionicons 
              name={icon} 
              size={20} 
              color={isFocused ? colors.primary : colors.textLight} 
            />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithLeftIcon,
            (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
            multiline && styles.inputMultiline,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          editable={editable}
          maxLength={maxLength}
          underlineColorAndroid="transparent"
          cursorColor={colors.secondary}
        />

        {/* Right Icon or Password Toggle */}
        {showPasswordToggle ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Icons.Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textLight}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={onRightIconPress}
            activeOpacity={0.7}
            disabled={!onRightIconPress}
          >
            <Icons.Ionicons
              name={rightIcon}
              size={20}
              color={colors.textLight}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Icons.Ionicons 
            name="alert-circle" 
            size={14} 
            color={colors.error || '#FF6B6B'} 
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Character Count */}
      {maxLength && value && (
        <Text style={styles.charCount}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  containerFocused: {
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerError: {
    borderColor: colors.error || '#FF6B6B',
  },
  containerDisabled: {
    backgroundColor: colors.background,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: colors.text,
    paddingVertical: 16,
    paddingHorizontal: 0,
    minHeight: 56,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  inputMultiline: {
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  iconLeft: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: colors.error || '#FF6B6B',
    marginLeft: 4,
  },
  charCount: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: colors.textLight,
    textAlign: 'right',
    marginTop: 4,
    marginRight: 4,
  },
});

export default CustomInput;