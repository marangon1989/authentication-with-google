import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Image = styled.Image`
    width: ${RFValue(160)}px;
    height: ${RFValue(160)}px;
`;

export const Placeholder = styled.View`
    width: ${RFValue(160)}px;
    height: ${RFValue(160)}px;
    justify-content: center;
    align-items: center;
    border: 1px dashed ${({ theme }) => theme.COLORS.BLACK_100};
`;

export const PlaceholderTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${({ theme }) => theme.COLORS.BLACK_100};
  `};
`;