import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  margin: 0 ${({ theme }) => theme.SPACING.MD} 0 0;
  padding: ${({ theme }) => theme.SPACING.MD};
  margin-left: 0px;
`;

export const Content  = styled.TouchableOpacity`
  width: ${RFValue(140)}px;
`;

export const Image  = styled.Image`
  width: ${RFValue(140)}px;
  height: ${RFValue(140)}px;
  padding: ${({ theme }) => theme.SPACING.MD};
`;

export const Name  = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-top: ${({ theme }) => theme.SPACING.XS};
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Industry  = styled.Text`
  font-size: ${RFValue(10)}px;
  line-height: ${RFValue(12)}px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;