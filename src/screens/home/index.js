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
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';
import React, { useState } from 'react';
import SettingsModal from './settingsModal'
const HomeScreen = ({ navigation }) => {
  const [userName] = useState('Alex');
  const [streak, setStreak] = useState(5);
  const [todayProgress, setTodayProgress] = useState(5); // Changed to 5 to show completion
  const totalSections = 5;
  const [settingsVisible, setSettingsVisible] = useState(false);

  const learningTasks = [
    {
      id: 'continue',
      title: 'Continue Learning',
      description: 'Resume your last lesson',
      icon: 'play-circle',
      color: colors.accent,
      completed: false, // Changed to true
      screen: 'LessonFlowScreen',
    },
    {
      id: 'mistake',
      title: 'Daily Mistake',
      description: 'Learn from common errors',
      icon: 'alert-circle',
      color: colors.accentPink,
      completed: false,
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
      completed: true, // Changed to true
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
      <View style={[styles.taskNumberBadge, { backgroundColor: item.color }]}>
        <Text style={styles.taskNumberText}>{index + 1}</Text>
      </View>

      <View style={[styles.taskIconContainer, { backgroundColor: `${item.color}25` }]}>
        <Icons.Ionicons
          name={item.icon}
          size={32}
          color={item.color}
        />
      </View>

      <View style={styles.horizontalTaskContent}>
        <Text style={styles.horizontalTaskTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.horizontalTaskDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

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
          
          <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.settingsButton}>
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

        {/* Completion State - Shows when all tasks are completed */}
        {todayProgress === totalSections && (
          <View style={styles.completionStateCard}>
            {/* Trophy Icon */}
            <View style={styles.completionIconCircle}>
              <Icons.Ionicons name="trophy" size={48} color="#FFD700" />
            </View>

            {/* Completion Title */}
            <Text style={styles.completionStateTitle}>Day Complete! 🎉</Text>

          </View>
        )}

        {/* Additional Stats */}
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
      <SettingsModal
  visible={settingsVisible}
  onClose={() => setSettingsVisible(false)}
  navigation={navigation}
  userName={userName}
/>
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
  completionStateCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  completionIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.primary}40`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  completionStateTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  completionStatusContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  statusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  completionMessage: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
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

export default HomeScreen;