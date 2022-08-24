import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { 
  ActivityIndicator,
  Alert, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform,
  View 
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/fi-logo.svg';

import { SignInSocialButton } from '@src/components/SignInSocialButton';

import theme from '@src/theme';

import { useAuth } from '@hooks/auth';

import { 
  Container,
  Content,
  Title,
  Description,
  Footer,
  FooterWrapper,
  Header
} from './styles';

export function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try{
      setIsLoading(true);
      return await signInWithGoogle();
    }catch(e) {
      console.log(e);
      Alert.alert('Falha na autenticação', 'Não foi possível conectar a conta Google.');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try{
      setIsLoading(true);
      return await signInWithApple();
    }catch(e) {
      console.log(e);
      Alert.alert('Falha na autenticação', 'Não foi possível conectar a conta Apple.');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <StatusBar style='dark' translucent backgroundColor='transparent' />
        <ImageBackground
          source={require('@assets/bg2.jpg')}
          resizeMode='cover'
          style={{ flex: 1, justifyContent: 'center'}}
        >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Content>

          <Header>
            <LogoSvg 
              width={RFValue(240)}
            />
          </Header>
          <View>
            <Title>THE BIGGEST FASHION & {'\n'}
            INNOVATION EVENT IN THE WORLD</Title>
            <Description>Faça seu login com uma das contas abaixo</Description>
          </View>

          <Footer>
            <FooterWrapper>
              <SignInSocialButton 
                title='Entra com Google'
                svg={GoogleSvg}
                onPress={handleSignInWithGoogle}
              />

              {
                Platform.OS === 'ios' && (
                  <SignInSocialButton 
                    title='Entra com Apple'
                    svg={AppleSvg}
                    onPress={handleSignInWithApple}
                  />
                )
              }

            </FooterWrapper>
            { isLoading && 
              <ActivityIndicator 
                color={theme.COLORS.BLUE} 
                size="small"
                style={{ marginTop: 18 }} 
                />
            }
          </Footer>

          </Content>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Container>
  )
}