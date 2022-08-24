import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from '@hooks/auth';

import { Home } from '@screens/Home';
import { Speaker } from '@screens/Speaker';
import { SpeakerDetails } from '@src/screens/SpeakerDetails';
import { Company } from '@screens/Company';
import { CompanyDetails } from '@src/screens/CompanyDetails';
import { Schedule } from '@screens/Schedule';
import { ScheduleDetails } from '@src/screens/ScheduleDetails';
import { Guest } from '@src/screens/Guest';

import { UserTabRoutes } from './user.tab.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
  const { user } = useAuth();

  return(
    <Navigator screenOptions={{ headerShown: false }}>
      {
        user ? (
          <Group>
              <Screen name="home" component={Home} />
              <Screen name="speaker" component={Speaker} />
              <Screen name="speaker_details" component={SpeakerDetails} />
              <Screen name="company" component={Company} />
              <Screen name="company_details" component={CompanyDetails} />
              <Screen name="schedule" component={Schedule} />
              <Screen name="schedule_details" component={ScheduleDetails} />
              <Screen name="guest" component={Guest} />

          </Group>
        ) : (
          <Group>
            <Screen name="UserTabRoutes" component={UserTabRoutes} />
            <Screen name="speaker" component={Speaker} />
            <Screen name="speaker_details" component={SpeakerDetails} />
            <Screen name="company" component={Company} />
            <Screen name="company_details" component={CompanyDetails} />
            <Screen name="schedule" component={Schedule} />
            <Screen name="schedule_details" component={ScheduleDetails} />
            <Screen name="guest" component={Guest} />
          </Group>
        )
      }
    </Navigator>
  );
}