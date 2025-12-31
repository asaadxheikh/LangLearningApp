import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Icons from '../../assets/icons/icons'
import {colors} from '../../theme/colors'
const Button = ({
  variant = 'filled',
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  iconSize = 20,
  iconColor,
  style,
  textStyle,
  size = 'medium',
}) => {
  const isOutlined = variant === 'outlined';
  const isDisabled = disabled || loading;

  const sizeStyles = {
    small: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 14,
      borderRadius: 12,
    },
    medium: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: 16,
      borderRadius: 16,
    },
    large: {
      paddingVertical: 20,
      paddingHorizontal: 32,
      fontSize: 18,
      borderRadius: 16,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  const buttonStyle = [
    styles.button,
    {
      paddingVertical: currentSize.paddingVertical,
      paddingHorizontal: currentSize.paddingHorizontal,
      borderRadius: currentSize.borderRadius,
    },
    isOutlined ? styles.outlined : styles.filled,
    isDisabled && (isOutlined ? styles.outlinedDisabled : styles.filledDisabled),
    style,
  ];

  const textStyleCombined = [
    styles.text,
    { fontSize: currentSize.fontSize },
    isOutlined ? styles.outlinedText : styles.filledText,
    isDisabled && (isOutlined ? styles.outlinedTextDisabled : styles.filledTextDisabled),
    textStyle,
  ];

  // Determine icon color
  const finalIconColor = iconColor || 
    (isOutlined 
      ? (isDisabled ? colors.textLight : colors.primary) 
      : (isDisabled ? colors.textLight : colors.white)
    );

  // Render icon
  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={isOutlined ? colors.primary : colors.secondary} 
        />
      );
    }

    if (icon) {
      return (
        <Icons.Ionicons 
          name={icon} 
          size={iconSize} 
          color={finalIconColor}
        />
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {/* Icon on left */}
      {icon && iconPosition === 'left' && !loading && (
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
      )}

      {/* Loading indicator on left */}
      {loading && iconPosition === 'left' && (
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
      )}

      {/* Button text */}
      <Text style={textStyleCombined}>{title}</Text>

      {/* Icon on right */}
      {icon && iconPosition === 'right' && !loading && (
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
      )}

      {/* Loading indicator on right */}
      {loading && iconPosition === 'right' && (
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filled: {
    backgroundColor: colors.secondary,
  },
  filledDisabled: {
    backgroundColor: colors.grey,
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  filledText: {
    color: colors.white,
    fontWeight: '600',
  },
  filledTextDisabled: {
    color: colors.primary,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  outlinedDisabled: {
    borderColor: colors.primary,
    opacity: 0.5,
  },
  outlinedText: {
    color: colors.secondary,
    fontWeight: '600',
  },
  outlinedTextDisabled: {
    color: colors.textLight,
  },
  text: {
    textAlign: 'center',
  },
  iconContainer: {
    marginHorizontal: 6,
  },
});

export default Button;