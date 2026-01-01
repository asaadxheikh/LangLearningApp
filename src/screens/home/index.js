import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';

const HomeScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
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

        {/* Learning Tasks */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Learning Flow</Text>
          
          <View style={styles.tasksContainer}>
            {learningTasks.map((task, index) => (
              <TouchableOpacity
                key={task.id}
                style={[
                  styles.taskCard,
                  task.completed && styles.taskCardCompleted,
                ]}
                onPress={() => handleTaskPress(task)}
                activeOpacity={0.7}
              >
                <View style={styles.taskLeft}>
                  <View style={[styles.taskIconContainer, { backgroundColor: `${task.color}25` }]}>
                    <Icons.Ionicons
                      name={task.icon}
                      size={28}
                      color={task.color}
                    />
                  </View>
                  
                  <View style={styles.taskContent}>
                    <View style={styles.taskTitleRow}>
                      <Text style={styles.taskNumber}>{index + 1}.</Text>
                      <Text style={styles.taskTitle}>{task.title}</Text>
                    </View>
                    <Text style={styles.taskDescription}>{task.description}</Text>
                  </View>
                </View>
                
                {task.completed ? (
                  <View style={[styles.completedBadge, { backgroundColor: task.color }]}>
                    <Icons.Ionicons name="checkmark" size={16} color={colors.white} />
                  </View>
                ) : (
                  <Icons.Ionicons name="chevron-forward" size={24} color={colors.textLight} />
                )}
              </TouchableOpacity>
            ))}
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
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  tasksContainer: {
    gap: 12,
  },
  taskCard: {
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
  taskCardCompleted: {
    opacity: 0.7,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginRight: 6,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
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
});

export default HomeScreen;