import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UserTabRoutes } from './user.tab.routes';

import { Signin } from '@screens/Signin';
import { Boss } from '@screens/Boss';

import { useAuth } from '@hooks/auth'

export function Routes() {
  const { user } = useAuth();
  console.log(user);
  return(
    <NavigationContainer>
      {user.id ? <Boss /> : <Signin />}
    </NavigationContainer>
  )
}