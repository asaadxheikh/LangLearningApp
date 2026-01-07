import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import Icons from '../../assets/icons/icons';
import React, { useState } from 'react';
import SettingsModal from './settingsModal';
import ChangeNameModal from './changeNameModal';

const HomeScreen = ({ navigation }) => {
  const [userName] = useState('Alex');
  const [streak, setStreak] = useState(5);
  const [todayProgress, setTodayProgress] = useState(3);
  const totalSections = 5;
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [changeNameVisible, setChangeNameVisible] = useState(false);

  // Default color palette for tasks and cards
  const defaultColors = [colors.primary];
  
  // Function to get color for item
  const getItemColor = (item, index) => {
    // If item has color property, use it
    if (item.color) {
      return item.color;
    }
    // Otherwise, assign color based on index
    return defaultColors[index % defaultColors.length];
  };

  const learningTasks = [
    {
      id: 'scenario',
      title: 'Real-Life Scenario',
      description: 'Practice real conversations',
      icon: 'chatbubbles',
      color: colors.accentBlue, // Optional - can come from backend
      completed: true,
      screen: 'Scenario',
    },
    {
      id: 'speaking',
      title: 'Speaking Task',
      description: 'Improve your pronunciation',
      icon: 'mic',
      color: colors.accent, // Optional - can come from backend
      completed: true,
      screen: 'SpeakingTask',
    },
    {
      id: 'review',
      title: 'Quick Review',
      description: 'Key phrases from today',
      icon: 'checkmark-done',
      color: colors.accentPink, // Optional - can come from backend
      completed: false,
      screen: 'QuickReview',
    },
  ];

  const dailyRoutineCards = [
    {
      id: 'dayInLife',
      title: 'A day in the life',
      description: 'Describe your typical weekday routine.',
      image: require('../../assets/images/dummyImage.png'),
      screen: 'DayInLifeScreen',
    },
    {
      id: 'appointment',
      title: 'Get an appointment',
      description: 'Call and schedule an appointment.',
      image: require('../../assets/images/dummyImage.png'),
      screen: 'AppointmentScreen',
    },
    {
      id: 'shopping',
      title: 'Go shopping',
      description: 'Practice shopping conversations.',
      image: require('../../assets/images/dummyImage.png'),
      screen: 'ShoppingScreen',
    },
  ];

  const handleTaskPress = (task) => {
    if (task.screen) {
      navigation.navigate(task.screen);
    }
  };

  const handleDailyRoutinePress = (card) => {
    if (card.screen) {
      navigation.navigate(card.screen);
    }
  };

  const handleContinueLearning = () => {
    navigation.navigate('LessonFlowScreen');
  };

  const progressPercentage = (todayProgress / totalSections) * 100;

  const renderTaskCard = ({ item, index }) => {
    const itemColor = getItemColor(item, index);
    
    return (
      <TouchableOpacity
        style={[
          styles.taskCard, 
          { backgroundColor: itemColor },
          item.completed 
        ]}
        onPress={() => handleTaskPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.taskIconWrapper,  ]}>
          <Icons.Ionicons name={item.icon} size={28} color={item.color} />
        </View>
        
        <View style={styles.taskCardContent}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        
        <View style={styles.taskCardRight}>
          {item.completed && (
            <View style={styles.completedCheck}>
              <Icons.Ionicons name="checkmark" size={16} color={colors.secondary} />
            </View>
          )}
          {!item.completed && (
            <View style={styles.completedCheck}>
            <Icons.Ionicons name="arrow-forward" size={20} color={colors.secondary}/>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderDailyRoutineCard = ({ item, index }) => {
    const itemColor = getItemColor(item, index);
    
    return (
      <TouchableOpacity 
        style={[styles.dailyRoutineCard, { backgroundColor: itemColor }]}
        onPress={() => handleDailyRoutinePress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.dailyRoutineImageContainer}>
          <Image source={item.image} style={styles.dailyRoutineImage} resizeMode="cover" />
          <View style={styles.durcontainer}>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>7 min</Text>
            </View>
          </View>
          <View style={styles.playButton}>
            <Icons.Ionicons name="play" size={12} color={colors.text} />
          </View>
        </View>

        <View style={styles.dailyRoutineContent}>
          <Text style={styles.dailyRoutineTitle}>{item.title}</Text>
          <Text style={styles.dailyRoutineDescription}>{item.description}</Text>
          
          <View style={styles.dailyRoutineButton}>
            <Text style={styles.dailyRoutineButtonText}>start</Text>
            <Icons.Ionicons name="arrow-forward" size={18} color={colors.secondary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello, {userName}! 👋</Text>
            <Text style={styles.subtitle}>Ready to learn today?</Text>
          </View>
          
          <View style={styles.headerActions}>
            <View style={styles.streakBadge}>
              <Icons.Ionicons name="flame" size={18} color="#FF6B6B" />
              <Text style={styles.streakNumber}>{streak}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => setSettingsVisible(true)} 
              style={styles.settingsButton}
            >
              <Icons.Ionicons name="settings-outline" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View>
              <Text style={styles.progressLabel}>Today's Progress</Text>
              <Text style={styles.progressStats}>
                {todayProgress} of {totalSections} completed
              </Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
          </View>
          
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
            </View>
          </View>
          
          {todayProgress === totalSections ? (
            <View style={styles.congratsMessage}>
              <Text style={styles.congratsEmoji}>🎉</Text>
              <Text style={styles.congratsText}>Amazing! You've completed today's goal!</Text>
            </View>
          ) : (
            <Text style={styles.progressEncouragement}>
              Keep going! {totalSections - todayProgress} more to reach your goal
            </Text>
          )}
        </View>

        {/* Continue Learning Section */}
        <View style={styles.continueSection}>
          <TouchableOpacity 
            style={styles.continueCard}
            onPress={handleContinueLearning}
            activeOpacity={0.95}
          >
            <View style={styles.continueBadge}>
              <Text style={styles.continueBadgeText}>premium</Text>
            </View>
            
            <View style={styles.continueImageWrapper}>
              <Image 
                source={require('../../assets/images/dummyImage.png')} 
                style={styles.continueImage} 
                resizeMode="cover" 
              />
            </View>
            
            <View style={styles.continueCardContent}>
              <Text style={styles.continueCardTitle}>Unit 4: Ordering Coffee</Text>
              <Text style={styles.continueCardDescription}>
                Learn to order your favorite drinks like a local.
              </Text>
              
              <View style={styles.continueCardFooter}>
                <View style={styles.continueTimeInfo}>
                  <Icons.Ionicons name="time-outline" size={16} color={colors.secondary} />
                  <Text style={styles.continueTimeText}>~ 10 min lesson</Text>
                </View>
                
                <View style={styles.continueButton}>
                  <Icons.Ionicons name="play" size={16} color={colors.white} />
                  <Text style={styles.continueButtonText}>Continue</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Learning Tasks Section - NOW VERTICAL */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksContainer}>
            {learningTasks.map((item, index) => (
              <View key={item.id}>
                {renderTaskCard({ item, index })}
              </View>
            ))}
          </View>
        </View>

        {/* Daily Routine Section */}
        <View style={styles.dailyRoutineSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Routine</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={dailyRoutineCards}
            renderItem={renderDailyRoutineCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dailyRoutineList}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: colors.red_500 }]}>
              <Icons.Ionicons name="calendar" size={24} color={colors.red_600} />
            </View>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIconBg, { backgroundColor: '#E5F0FF' }]}>
              <Icons.Ionicons name="book" size={24} color={colors.accentBlue} />
            </View>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>
        </View>
      </ScrollView>
      
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onOpenChangeName={() => {
          setSettingsVisible(false);
          setChangeNameVisible(true);
        }}
        navigation={navigation}
        userName={userName}
      />
      
      <ChangeNameModal
        visible={changeNameVisible}
        onClose={() => setChangeNameVisible(false)}
        onSave={() => setChangeNameVisible(false)}
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
  scrollContent: {
    paddingBottom: 32,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // Progress Card
  progressCard: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  progressStats: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  progressCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor:colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.accent,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.accent,
  },
  progressBarWrapper: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor:colors.lightGrey,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  progressEncouragement: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  congratsMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  congratsEmoji: {
    fontSize: 20,
  },
  congratsText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
    flex: 1,
  },
  
  // Continue Learning Section
  continueSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  continueCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: colors.grey,
  },
  continueBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  continueImageWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: colors.primary,
  },
  continueImage: {
    width: '100%',
    height: '100%',
  },
  continueCardContent: {
    padding: 20,
  },
  continueCardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  continueCardDescription: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: 20,
  },
  continueCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueTimeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  
  // Section Headers
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  
  // Task Cards - VERTICAL LAYOUT
  tasksContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 12,
  },
  taskIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor:colors.white
  },
  taskCardContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 19,
    fontWeight: '500',
  },
  taskCardRight: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  taskNumber: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  completedCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Daily Routine Section
  dailyRoutineSection: {
    marginBottom: 32,
  },
  dailyRoutineList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  dailyRoutineCard: {
    width: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  dailyRoutineImageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
    padding: 12,
  },
  dailyRoutineImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  durcontainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor:colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    borderTopEndRadius:0,
    borderBottomRightRadius:0
  },
  durationBadge: {
    width: '100%',
    backgroundColor:colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  playButton: {
    position: 'absolute',
    bottom: 6,
    left: 17,
    width: 20,
    height: 20,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  dailyRoutineContent: {
    padding: 16,
    paddingTop: 12,
  },
  dailyRoutineTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.secondary,
    marginBottom: 6,
  },
  dailyRoutineDescription: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '500',
  },
  dailyRoutineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightPrimary,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  dailyRoutineButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;