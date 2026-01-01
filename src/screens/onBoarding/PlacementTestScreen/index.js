

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Icons from '../../../assets/icons/icons';
import React, { useState } from 'react';
const PlacementTestScreen = ({ navigation }) => {
  const [userName] = useState('Alex'); // This should come from storage/context
  const [streak, setStreak] = useState(5);
  const [todayProgress, setTodayProgress] = useState(3); // 3 out of 5 completed
  const totalSections = 5;

  const learningTasks = [
    {
      id: 'continue',
      title: 'Continue Learning',
      description: 'Resume your last lesson',
      icon: 'play-circle',
      color: colors.accent,
      completed: false,
      screen: 'ContinueLearning',
    },
    {
      id: 'mistake',
      title: 'Daily Mistake',
      description: 'Learn from common errors',
      icon: 'alert-circle',
      color: colors.accentPink,
      completed: true,
      screen: 'DailyMistake',
    },
    {
      id: 'scenario',
      title: 'Real-Life Scenario',
      description: 'Practice real conversations',
      icon: 'chatbubbles',
      color: colors.accentBlue,
      completed: true,
      screen: 'Scenario',
    },
    {
      id: 'speaking',
      title: 'Speaking Task',
      description: 'Improve your pronunciation',
      icon: 'mic',
      color: colors.accent,
      completed: true,
      screen: 'SpeakingTask',
    },
    {
      id: 'review',
      title: 'Quick Review',
      description: 'Key phrases from today',
      icon: 'checkmark-done',
      color: colors.accentPink,
      completed: false,
      screen: 'QuickReview',
    },
  ];

  const handleTaskPress = (task) => {
    if (task.screen) {
      navigation.navigate(task.screen);
    }
  };

  const progressPercentage = (todayProgress / totalSections) * 100;

  const renderTaskCard = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.horizontalTaskCard,
        item.completed && styles.taskCardCompleted,
      ]}
      onPress={() => handleTaskPress(item)}
      activeOpacity={0.7}
    >
      {/* Task Number */}
      <View style={[styles.taskNumberBadge, { backgroundColor: item.color }]}>
        <Text style={styles.taskNumberText}>{index + 1}</Text>
      </View>

      {/* Icon Container */}
      <View style={[styles.taskIconContainer, { backgroundColor: `${item.color}25` }]}>
        <Icons.Ionicons
          name={item.icon}
          size={32}
          color={item.color}
        />
      </View>

      {/* Task Content */}
      <View style={styles.horizontalTaskContent}>
        <Text style={styles.horizontalTaskTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.horizontalTaskDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      {/* Status Badge */}
      {item.completed && (
        <View style={[styles.completedBadge, { backgroundColor: item.color }]}>
          <Icons.Ionicons name="checkmark" size={16} color={colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi, {userName}! 👋</Text>
            <View style={styles.streakContainer}>
              <Icons.Ionicons name="flame" size={20} color="#FF6B6B" />
              <Text style={styles.streakText}>{streak} day streak</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Icons.Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{todayProgress}/{totalSections}</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          
          <Text style={styles.progressSubtext}>
            {todayProgress === totalSections 
              ? "🎉 Great job! You've completed today's lessons!" 
              : `${totalSections - todayProgress} more to go today!`}
          </Text>
        </View>

        {/* Learning Flow Section */}
        <View style={styles.learningFlowSection}>
          <Text style={styles.sectionTitle}>Learning Flow</Text>
          
          <FlatList
            data={learningTasks}
            renderItem={renderTaskCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            snapToInterval={280}
            decelerationRate="fast"
          />
        </View>

        {/* Completion Message (shown when all tasks done) */}
        {todayProgress === totalSections && (
          <View style={styles.completionCard}>
            <View style={styles.completionIcon}>
              <Icons.Ionicons name="trophy" size={40} color="#FFD700" />
            </View>
            <Text style={styles.completionTitle}>Day Complete! 🎉</Text>
            <Text style={styles.completionText}>
              Amazing work! Your progress has been saved and your streak is updated.
            </Text>
            <Text style={styles.completionSubtext}>
              Come back tomorrow for new lessons!
            </Text>
          </View>
        )}

        {/* Additional Stats or Info */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Icons.Ionicons name="calendar" size={24} color={colors.accent} />
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icons.Ionicons name="book" size={24} color={colors.accentBlue} />
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icons.Ionicons name="trophy" size={24} color={colors.accentPink} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  settingsButton: {
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
  progressSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  progressCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 6,
  },
  progressSubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  learningFlowSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  horizontalList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  horizontalTaskCard: {
    width: 260,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  taskCardCompleted: {
    opacity: 0.7,
  },
  taskNumberBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskNumberText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  taskIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  horizontalTaskContent: {
    marginBottom: 12,
  },
  horizontalTaskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  horizontalTaskDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  completedBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  completionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}50`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  completionText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  completionSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default PlacementTestScreen;

