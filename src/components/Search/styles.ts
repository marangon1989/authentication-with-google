import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: -16px;
  padding: 0 ${({ theme }) => theme.SPACING.XL};
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.WHITE_100};
    border: 1px solid ${theme.COLORS.WHITE_100};
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  height: ${RFValue(52)}px;
  padding-left: ${({ theme }) => theme.SPACING.SM};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.SPACING.XS};
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BLACK_100};
  margin-left: ${({ theme }) => theme.SPACING.XS};
  border: 1px solid ${({ theme }) => theme.COLORS.BLACK_100};
`;