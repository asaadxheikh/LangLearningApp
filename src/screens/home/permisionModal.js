// src/components/PermissionsModal/index.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';

const PermissionsModal = ({ visible, onClose, onConfirm }) => {
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [contactsEnabled, setContactsEnabled] = useState(false);

  const handleConfirm = () => {
    if (!microphoneEnabled && !contactsEnabled) {
      Alert.alert(
        'Permissions Required',
        'Please enable at least one permission to continue.',
        [{ text: 'OK' }]
      );
      return;
    }

    onConfirm({
      microphone: microphoneEnabled,
      contacts: contactsEnabled,
    });
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Icons.Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icons.Ionicons name="shield-checkmark" size={48} color={colors.accent} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Permissions Required</Text>
          <Text style={styles.subtitle}>
            Enable permissions to get the best learning experience
          </Text>

          {/* Permissions List */}
          <View style={styles.permissionsContainer}>
            {/* Microphone Permission */}
            <View style={styles.permissionCard}>
              <View style={styles.permissionLeft}>
                <View style={[styles.permissionIcon, { backgroundColor: `${colors.accentBlue}20` }]}>
                  <Icons.Ionicons name="mic" size={24} color={colors.accentBlue} />
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Microphone</Text>
                  <Text style={styles.permissionDescription}>
                    Record your voice for pronunciation practice
                  </Text>
                </View>
              </View>
              <Switch
                value={microphoneEnabled}
                onValueChange={setMicrophoneEnabled}
                trackColor={{ false: colors.secondary, true: colors.accent }}
                thumbColor={colors.white}
              />
            </View>

            {/* Contacts Permission */}
            <View style={styles.permissionCard}>
              <View style={styles.permissionLeft}>
                <View style={[styles.permissionIcon, { backgroundColor: `${colors.accentPink}20` }]}>
                  <Icons.Ionicons name="people" size={24} color={colors.accentPink} />
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Contacts</Text>
                  <Text style={styles.permissionDescription}>
                    Invite friends and share your progress
                  </Text>
                </View>
              </View>
              <Switch
                value={contactsEnabled}
                onValueChange={setContactsEnabled}
                trackColor={{ false: colors.secondary, true: colors.accent }}
                thumbColor={colors.white}
              />
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Icons.Ionicons name="information-circle" size={20} color={colors.accent} />
            <Text style={styles.infoText}>
              You can change these permissions later in settings
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Continue</Text>
              <Icons.Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  permissionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  permissionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.accent}15`,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  buttonsContainer: {
    gap: 12,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  skipButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
});

export default PermissionsModal;