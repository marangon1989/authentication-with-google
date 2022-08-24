import React from 'react';
import { 
  Container, 
  TopHeader,
  Greeting,
  GreetingText,
} from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation, Link } from '@react-navigation/native';

import { useTheme } from 'styled-components/native';

import { ButtonBack } from '@src/components/ButtonBack';

import { useAuth } from '@hooks/auth';


export function Header() {

  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <TopHeader>
        {
          user  ?
          <Greeting>
            <Link to={{ screen: 'home' }}>
              <GreetingText>Welcome, {user.name}!</GreetingText>
            </Link>
          </Greeting>
          : <ButtonBack onPress={handleGoBack} />
        }
        
        <TouchableOpacity>
          <MaterialIcons
            onPress={signOut}
            name='logout' 
            color={COLORS.WHITE_100} 
            size={24} 
          />
        </TouchableOpacity>
      </TopHeader>
    </Container>
  );
}