import React, { useState, useCallback } from 'react';
import { Alert, FlatList, ScrollView, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';

import { Search } from '@components/Search';
import { CompanyCard, CompanyProps } from '@src/components/CompanyCard';
import { Header } from '@src/components/Header';
import { MenuHeader } from '@src/components/MenuHeader';

import { 
  Container, 
  NewCompanyButton
} from './styles';
import { EnviromentButton } from '@src/components/EnviromentButton';
import { COMPANY_TYPES } from '@src/utils/companyTypes';
import theme from '@src/theme';


export function Company() {
  const [company, setCompany] = useState<CompanyProps[]>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation();
  const { user } = useAuth();

  function fetchCompany(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('companies')
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
        }) as CompanyProps[];

        setCompany(data);

      })
      .catch(() => Alert.alert('Query', 'The query could not be performed.'));
  }

  function fetchCategory(category: string) {
    firestore()
    .collection('companies')
    .where('category', '==', category)
    .get()
    .then((response) => {
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as CompanyProps[];

      setCompany(data);

    });
  }
    
  function handleSearch() {
    fetchCompany(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchCompany('');
  }

  function handleOpen(id: string) {
    navigation.navigate('company_details', { id });
  }

  function handleAdd() {
    navigation.navigate('company_details', {});
  }

  function handleIsActive(color: string) {

  }

  useFocusEffect(useCallback(
    () => {
      fetchCompany('');
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
      <View>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginHorizontal:20,
        marginTop: 20,
        paddingRight:20
      }}
      >
            { 
              COMPANY_TYPES.map(item => {
                return (
                  <EnviromentButton
                    key={item.id}
                    title={item.name}
                    onPress={() => fetchCategory(item.id)}
                    
                  />
                )
              })
            }
      </ScrollView>
      </View>

      <MenuHeader 
        title='Companies' 
        description='companies that joined us for the 7th edition of the Worldwide Talks' 
        items_number={`${company.length} Companies`} 
      />
      

      <Container>
      <FlatList 
        data={company}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CompanyCard 
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
        title="Register Company"
        type="secondary"
        onPress={handleAdd}
      />
      }
      </Container>
    </>
  );
}