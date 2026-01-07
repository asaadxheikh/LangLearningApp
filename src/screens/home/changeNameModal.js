import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/Button';
import { useApp } from '../../contexts/AppContext';

const ChangeNameModal = ({ visible, onClose, onSave }) => {
  const { userData, updateUserData } = useApp();
  const [name, setName] = useState(userData.userName || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(userData.userName || '');
    }
  }, [visible, userData.userName]);

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert('Invalid Name', 'Please enter a valid name');
      return;
    }

    setIsLoading(true);

    // Simulate API call or save operation
    setTimeout(() => {
      updateUserData({ userName: trimmedName });
      setIsLoading(false);
      if (onSave) {
        onSave();
      } else {
        onClose();
      }
    }, 500);
  };

  const hasChanges = name.trim() !== (userData.userName || '');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Change Name</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Icons.Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Icon Container */}
                <View style={styles.iconContainer}>
                  <View style={styles.iconCircle}>
                    <Icons.Ionicons
                      name="person-outline"
                      size={40}
                      color={colors.accent}
                    />
                  </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>Update your name</Text>
                <Text style={styles.subtitle}>
                  Your name will be displayed throughout the app
                </Text>

                {/* Input Container */}
                <View style={styles.inputContainer}>
                  <CustomInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    label="Name"
                    autoCapitalize="words"
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                    maxLength={50}
                  />
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Save Changes"
                    onPress={handleSave}
                    disabled={!hasChanges || !name.trim() || isLoading}
                    loading={isLoading}
                    icon="checkmark"
                    iconPosition="right"
                  />
                </View>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.semiTransparent,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: 600,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});

export default ChangeNameModal;

