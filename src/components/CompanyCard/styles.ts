import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Content  = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
  padding: ${({ theme }) => theme.SPACING.MD};
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  margin-bottom: ${({ theme }) => theme.SPACING.XS};
`;

export const Image  = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  margin-right: ${({ theme }) => theme.SPACING.MD};
`;

export const Details  = styled.View`
  flex: 1;
  align-self: center;
`;

export const Name  = styled.Text`
  flex: 1;
  font-size: ${RFValue(14)}px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Identification  = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Description  = styled.Text`
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(18)}px;
  margin-right:  ${({ theme }) => theme.SPACING.LG};

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_40};
  `}
`;

export const Industry  = styled.Text`
  font-size: ${RFValue(10)}px;
  line-height: ${RFValue(12)}px;
  margin-right: 21px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;