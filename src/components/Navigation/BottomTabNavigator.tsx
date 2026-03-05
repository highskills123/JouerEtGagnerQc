import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../../screens/HomeScreen';
import { TournamentsScreen } from '../../screens/TournamentsScreen';
import { FriendsScreen } from '../../screens/FriendsScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { COLORS } from '../../utils/constants';

export type BottomTabParamList = {
  Home: undefined;
  Videos: undefined;
  Games: undefined;
  Surveys: undefined;
  Tournaments: undefined;
  Friends: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface TabIconProps {
  emoji: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ emoji, focused }) => (
  <Text style={{ fontSize: focused ? 26 : 22, opacity: focused ? 1 : 0.6 }}>
    {emoji}
  </Text>
);

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.surfaceVariant,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          tabBarLabel: 'Tournois',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏆" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarLabel: 'Amis',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👥" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Options',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
