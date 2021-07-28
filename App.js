/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home';
import NewTaskScreen from './screens/newTask';
import SettingsScreen from './screens/settings';
import WeekScreen from './screens/week';
import DayScreen from './screens/day';
import MonthScreen from './screens/month';
import SelectedScreen from './screens/selectedTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Week" component={WeekScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Day" component={DayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Month" component={MonthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectedTask" component={SelectedScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
