import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';

import { Search } from '@components/Search';
import { SpeakerCard, SpeakerProps } from '@components/SpeakerCard';
import { Header } from '@src/components/Header';
import { MenuHeader } from '@src/components/MenuHeader';

import { 
  Container,
  NewSpeakerButton
} from './styles';


export function Speaker() {
  const [speaker, setSpeaker] = useState<SpeakerProps[]>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation();
  const { user } = useAuth();

  function fetchSpeaker(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('speakers')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as SpeakerProps[];

        setSpeaker(data);

      })
      .catch(() => Alert.alert('Query', 'The query could not be performed.'));
  }

  function handleSearch() {
    fetchSpeaker(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchSpeaker('');
  }

  function handleOpen(id: string) {
    navigation.navigate('speaker_details', { id });
  }

  function handleAdd() {
    navigation.navigate('speaker_details', {});
  }

  useFocusEffect(useCallback(
    () => {
      fetchSpeaker('');
    },[]));

  return (
    <>
      <Header />
      <Search
          value={search}
          onChangeText={setSearch}
          onSearch={handleSearch}
          onClear={handleSearchClear}
        />
      <MenuHeader 
        title='Speakers' 
        description='speakers that joined us for the 7th edition of the Worldwide Talks' 
        items_number={`${speaker.length} speakers`} 
      />
    
      <Container>
        <FlatList 
          data={speaker}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SpeakerCard 
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
          user &&
          <NewSpeakerButton 
            title="Register Speaker"
            type="secondary"
            onPress={handleAdd}
          />
        }
      </Container>
    </>

  );
}