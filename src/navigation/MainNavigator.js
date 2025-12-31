import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// Main Tab Navigator
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      {/* <Stack.Screen name="MainLearning" component={MainLearningScreen} />
      <Stack.Screen name="Scenario" component={ScenarioScreen} />
      <Stack.Screen name="SpeakingTask" component={SpeakingTaskScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;