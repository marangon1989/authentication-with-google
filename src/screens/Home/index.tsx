import React, { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect, Link } from '@react-navigation/native';

import { SpeakerList, SpeakerListProps } from '@src/components/SpeakerList';
import { CompanyList, CompanyListProps } from '@src/components/CompanyList';

import { useAuth } from '@hooks/auth';

import { 
  Container,
  Header,
  Greeting,
  GreetingPhoto,
  GreetingText,
  Title,
  Description,
  MenuHeader,
  MenuHeaderWrapper,
  MenuItemsNumber,
  FlatListCard,
  Banner,
} from './styles';


export function Home() {
  const [speaker, setSpeaker] = useState<SpeakerListProps[]>([]);
  const [company, setCompany] = useState<CompanyListProps[]>([]);

  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  function fetchSpeaker(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('speakers')
      .orderBy('name_insensitive')
      .limit(10)
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as SpeakerListProps[];

        setSpeaker(data);

      })
      .catch(() => Alert.alert('Query', 'The query could not be performed.'));
  }

  
  function fetchCompany(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('companies')
      .orderBy('name_insensitive')
      .limit(10)
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as CompanyListProps[];

        setCompany(data);

      })
      .catch(() => Alert.alert('Query', 'The query could not be performed.'));
  }


  function handleOpenSpeaker(id: string) {
    navigation.navigate('speaker_details', { id });
  }

  function handleOpenCompany(id: string) {
    navigation.navigate('company_details', { id });
  }

  useFocusEffect(useCallback(
    () => {
      fetchSpeaker('');
      fetchCompany('');
    },[]));

  return (
    <Container>
      
      <Header>
        <Greeting>
          <GreetingPhoto source={{ uri: user.photo}} />
          <GreetingText >Welcome, {user.name}!</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons
            onPress={signOut}
            name='logout' 
            color={COLORS.WHITE_100} 
            size={24} 
          />
        </TouchableOpacity>
      </Header>


      <Banner 
        source={require('@assets/images/banner.jpg')}
      />

        <MenuHeader>
          <MenuHeaderWrapper>
            <Title>Speakers</Title>
            <Description>speakers that joined us for the 7th edition of the Worldwide Talks</Description>
          </MenuHeaderWrapper>
          <MenuItemsNumber>
            <Link to={{ screen: 'speaker' }}>See all</Link>
          </MenuItemsNumber>
        </MenuHeader>


      <FlatListCard 
        data={speaker}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SpeakerList 
            data={item}
            onPress={() => handleOpenSpeaker(item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 24,
        }}
      />

        <MenuHeader>
          <MenuHeaderWrapper>
            <Title>Companies</Title>
            <Description>companies that joined us for the 7th edition of the Worldwide Talks</Description>
          </MenuHeaderWrapper>
          <MenuItemsNumber>
            <Link to={{ screen: 'company' }}>See all</Link>
          </MenuItemsNumber>
        </MenuHeader>
      
      <FlatListCard 
        data={company}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CompanyList 
            data={item}
            onPress={() => handleOpenCompany(item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 24,
        }}
      />


        <MenuHeader>
          <MenuHeaderWrapper>
            <Title>Guest</Title>
            <Description>
              Panels & Discussions held at the 7th fashinnovation Worldwide Talks 2022
            </Description>
          </MenuHeaderWrapper>
          <MenuItemsNumber>
            <Link to={{ screen: 'guest' }}>See all</Link>
          </MenuItemsNumber>
        </MenuHeader>


      <MenuHeader>
        <MenuHeaderWrapper>
          <Title>Schedule & Agenda</Title>
          <Description>
            Panels & Discussions held at the 7th fashinnovation Worldwide Talks 2022
          </Description>
        </MenuHeaderWrapper>
        <MenuItemsNumber>
          <Link to={{ screen: 'schedule' }}>See all</Link>
        </MenuItemsNumber>
      </MenuHeader>

    </Container>
  );
}