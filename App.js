import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Summer from './screens/Summer'
import Winter from './screens/Winter'
import Spring from './screens/Spring'
import Autumn from './screens/Autumn'

import AddRecipe from './screens/AddRecipe'
import ShowRecipe from './screens/ShowRecipe'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        options={{ headerShown: true }}
         name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Summer" component={Summer} />
        <Stack.Screen name="Winter" component={Winter} />
        <Stack.Screen name="Spring" component={Spring} />
        <Stack.Screen name="Autumn" component={Autumn} />

        <Stack.Screen name="Recipe" component={ShowRecipe} />
        <Stack.Screen name="Add Recipe" component={AddRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});