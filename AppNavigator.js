// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen'; // Your existing weather page
import BangaloreWeatherScreen from './BangaloreWeatherScreen';
import DelhiWeatherScreen from './DelhiWeatherScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bangalore" component={BangaloreWeatherScreen} />
        <Tab.Screen name="Delhi" component={DelhiWeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
