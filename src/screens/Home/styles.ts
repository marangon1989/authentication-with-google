import styled, { css } from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button } from '@components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
  background-color: ${({ theme }) => theme.COLORS.BLUE};
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingPhoto = styled.Image`
  height: 32px;
  width: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: ${RFValue(16)}px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.WHITE_100};
  `}
`;

export const Banner = styled.Image`
  margin: 24px;
  max-width: ${RFValue(320)}px;
  height: 200px;
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuHeaderWrapper = styled.View`
  width: 74%;
`;

export const MenuItemsNumber = styled.Text`
  font-size: ${RFValue(12)}px;
  text-transform: uppercase;
  
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100}
  `};
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(16)}px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_100};
  `};
`;

export const Description = styled.Text`
  font-size: ${RFValue(10)}px;
  line-height: ${RFValue(12)}px;
  text-transform: uppercase;
  margin-top: 4px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `};
`;

export const NewSpeakerButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;

export const FlatListCard = styled.FlatList`
  width: 100%;
`;
