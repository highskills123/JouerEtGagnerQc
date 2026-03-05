import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './components/Navigation/RootNavigator';
import { COLORS } from './utils/constants';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={COLORS.background} />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
