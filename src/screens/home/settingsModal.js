// src/components/SettingsModal/index.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';

const SettingsModal = ({ visible, onClose, onOpenChangeName, navigation, userName = 'Alex' }) => {
  const [notifications, setNotifications] = useState(true);
  const [selectedLanguage] = useState('Spanish');
  const [dailyGoal] = useState('10 minutes');
  const [lessonDifficulty] = useState('Intermediate');

  const handleNavigation = (screen) => {
    onClose();
    if (navigation) {
      navigation.navigate(screen);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.modalContent}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
              >
                <Icons.Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* Profile Section */}
              <TouchableOpacity 
                style={styles.profileSection}
                onPress={onOpenChangeName}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{userName}</Text>
                  <Text style={styles.profileSubtext}>View profile</Text>
                </View>
                <Icons.Ionicons name="chevron-forward" size={20} color={colors.textLight} />
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Learning Preferences */}
              <Text style={styles.sectionLabel}>Learning</Text>

              {/* Language */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleNavigation('LanguageSelector')}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accentBlue}20` }]}>
                    <Icons.Ionicons name="globe" size={20} color={colors.accentBlue} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>Language</Text>
                    <Text style={styles.menuValue}>{selectedLanguage}</Text>
                  </View>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* Daily Goal */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleNavigation('DailyGoalSelector')}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accent}20` }]}>
                    <Icons.Ionicons name="flag" size={20} color={colors.accent} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>Daily Goal</Text>
                    <Text style={styles.menuValue}>{dailyGoal}</Text>
                  </View>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* Difficulty */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleNavigation('DifficultySelector')}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accentPink}20` }]}>
                    <Icons.Ionicons name="speedometer" size={20} color={colors.accentPink} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>Difficulty</Text>
                    <Text style={styles.menuValue}>{lessonDifficulty}</Text>
                  </View>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* Notifications */}
              <View style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accent}20` }]}>
                    <Icons.Ionicons name="notifications" size={20} color={colors.accent} />
                  </View>
                  <Text style={styles.menuLabel}>Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: colors.secondary, true: colors.accent }}
                  thumbColor={colors.white}
                  style={styles.switch}
                />
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Other Settings */}
              <Text style={styles.sectionLabel}>More</Text>

              {/* Privacy */}
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accentBlue}20` }]}>
                    <Icons.Ionicons name="lock-closed" size={20} color={colors.accentBlue} />
                  </View>
                  <Text style={styles.menuLabel}>Privacy</Text>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* Help */}
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accentPink}20` }]}>
                    <Icons.Ionicons name="help-circle" size={20} color={colors.accentPink} />
                  </View>
                  <Text style={styles.menuLabel}>Help & Support</Text>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* About */}
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${colors.accent}20` }]}>
                    <Icons.Ionicons name="information-circle" size={20} color={colors.accent} />
                  </View>
                  <Text style={styles.menuLabel}>About</Text>
                </View>
                <Icons.Ionicons name="chevron-forward" size={18} color={colors.textLight} />
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity style={styles.logoutItem}>
                <Icons.Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>

              <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.semiTransparent,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom:25
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
    maxHeight: 520,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  profileSubtext: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  menuValue: {
    fontSize: 13,
    color: colors.accent,
    marginTop: 2,
    fontWeight: '500',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  versionText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    paddingVertical: 16,
  },
});

export default SettingsModal;