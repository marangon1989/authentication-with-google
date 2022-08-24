import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Speaker } from '@screens/Speaker';
import { Schedule } from '@screens/Schedule';
import { Company } from '@src/screens/Company';
import { Guest } from '@screens/Guest';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {

  const { COLORS } = useTheme();

  return(
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: COLORS.BLACK_40,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 64,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          paddingBottom:8,
          paddingTop: 8,
          backgroundColor: COLORS.WHITE_100
        }
      }}
    >
    <Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: (({ size, color }) => 
          <FontAwesome5
            name="home"
            size={size}
            color={color}
          />
        )
      }}
    />
    <Screen
      name="Speaker"
      component={Speaker}
      options={{
        tabBarIcon: (({ size, color }) => 
          <FontAwesome5
            name="users"
            size={size}
            color={color}
          />
        )
      }}
    />
    <Screen
      name="Schedule"
      component={Schedule}
      options={{
        tabBarIcon: (({ size, color }) => 
          <FontAwesome5
            name="calendar-day"
            size={size}
            color={color}
          />
        )
      }}
    />
    <Screen
      name="Companies"
      component={Company}
      options={{
        tabBarIcon: (({ size, color }) => 
          <FontAwesome5
            name="houzz"
            size={size}
            color={color}
          />
        )
      }}
    />
    <Screen
      name="Guest"
      component={Guest}
      options={{
        tabBarIcon: (({ size, color }) => 
          <FontAwesome5
            name="user-friends"
            size={size}
            color={color}
          />
        )
      }}
    />
    </Navigator>
  );
}