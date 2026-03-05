import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { VideosScreen } from '../../screens/VideosScreen';
import { GamesScreen } from '../../screens/GamesScreen';
import { SurveysScreen } from '../../screens/SurveysScreen';
import { AccountDetailsScreen } from '../../screens/AccountDetailsScreen';

export type RootStackParamList = {
  Main: undefined;
  Videos: undefined;
  Games: undefined;
  Surveys: undefined;
  AccountDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Videos" component={VideosScreen} />
      <Stack.Screen name="Games" component={GamesScreen} />
      <Stack.Screen name="Surveys" component={SurveysScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
    </Stack.Navigator>
  );
};
