import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';

import { ScheduleCard, ScheduleProps } from '@src/components/ScheduleCard';
import { Header } from '@src/components/Header';
import { MenuHeader } from '@src/components/MenuHeader';

import { 
  Container,
  NewCompanyButton
} from './styles';

export function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleProps[]>([]);

  const navigation = useNavigation();
  const { user } = useAuth();

  function fetchSchedule(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('schedules')
      .orderBy('time')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ScheduleProps[];

        setSchedule(data);

      })
      .catch(() => Alert.alert('Query', 'The query could not be performed.'));
  }

  function handleOpen(id: string) {
    navigation.navigate('schedule_details', { id });
  }

  function handleAdd() {
    navigation.navigate('schedule_details', {});
  }

  useFocusEffect(useCallback(
    () => {
      fetchSchedule('');
    },[]));

  return (
    <>
      <Header />
      <MenuHeader 
        title='Schedule & Agenda' 
        description='Panels & Discussions held at the 7th fashinnovation Worldwide Talks 2022' 
        items_number={`${schedule.length} panels`} 
      />

      <Container>
        <FlatList 
          data={schedule}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ScheduleCard 
              data={item}
              onPress={() => handleOpen(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24
          }}
        />
        
        {
          user?.isAdmin &&
          <NewCompanyButton 
          title="Register Schedule"
          type="secondary"
          onPress={handleAdd}
        />
        }
      </Container>
    </>
  );
}