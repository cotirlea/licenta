import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from './Test';
import LogIn from '../myproject/Screens/LogIn/LogIn'
import Main from '../myproject/Screens/Main/Main'
import PlantScreen from '../myproject/Screens/PlantScreen/PlantScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle: { display: 'none' }}}>
        <Tab.Screen name="LogIn" component={LogIn}/>
        <Tab.Screen name="Test" component={Test}/>
        <Tab.Screen name="Main" component={Main}/>
        <Tab.Screen name="PlantScreen" component={PlantScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
