import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signin } from '@screens/Signin';

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="signin" 
        component={Signin} 
      />
    </Stack.Navigator>
  )
}




