import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './navigationRef';
import MainNavigator from './MainNavigator';
import WelcomeScreen from '../screens/onBoarding/WelcomeScreen';
import LanguageSelectionScreen from '../screens/onBoarding/LanguageSelectionScreen';
import GoalSelectionScreen from '../screens/onBoarding/GoalSelection';
import SkillSelectionScreen from '../screens/onBoarding/SkillSelectionScreen';
import PlacementTestScreen from '../screens/onBoarding/PlacementTestScreen';
import PersonalizedPlanScreen from '../screens/onBoarding/PersonalizedPlanScreen';
import LessonFlowScreen from '../screens/LessonFlowScreen';
import HomeScreen from '../screens/home';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
    //   const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or return a splash screen component
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {isFirstLaunch ? (
          // Onboarding Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
            <Stack.Screen name="LangLangSelection" component={LanguageSelectionScreen} />
            <Stack.Screen name="SkillLevelScreenScreen" component={SkillSelectionScreen} />
            <Stack.Screen name="PlacementTestScreen" component={PlacementTestScreen} />
            <Stack.Screen name="PersonalizedPlanScreen" component={PersonalizedPlanScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LessonFlowScreen" component={LessonFlowScreen} />
          </>
        ) : (
          // Main App Stack
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;