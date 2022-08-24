import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button } from '@components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
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

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.WHITE_100};
  `}
`;

export const DeleteLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.WHITE_100};
  `}
`;

export const Upload = styled.View`
  width: 100%;
  justify-content: center;
  padding: 0 24px;
  align-items: center;
  margin: 32px 0;
`;

export const PickImageButton = styled(Button)`
  min-width: ${RFValue(140)}px;
  margin: 16px 0;
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaxCharacters = styled.Text`
  font-size: ${RFValue(10)}px;
  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Name  = styled.Text`
  font-size: ${RFValue(28)}px;
  margin-top: 12px;
  text-align: center;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const JobTitle  = styled.Text`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
  text-align: center;
  margin-top: 6px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Website  = styled.Text`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
  text-align: center;
  margin-top: 6px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Description  = styled.Text`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
  margin-top: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_40};
  `}
`;
