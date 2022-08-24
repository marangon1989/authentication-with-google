import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Content  = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.SPACING.MD};
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  margin-bottom: ${({ theme }) => theme.SPACING.XS};
`;

export const ContentGuest  = styled.View`
  padding: ${({ theme }) => theme.SPACING.MD};
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  margin-bottom: ${({ theme }) => theme.SPACING.XS};
`;

export const Image  = styled.Image`
  width: ${RFValue(240)}px;
  height: ${RFValue(48)}px;
  margin-bottom: ${({ theme }) => theme.SPACING.SM};
`;

export const Details  = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Title  = styled.Text`
  flex: 1;
  font-size: ${RFValue(14)}px;
  text-transform: uppercase;
  margin-left: ${RFValue(12)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_100};
  `}
`;

export const Time  = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.BLACK_40};
  `}
`;

export const Description  = styled.Text`
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(16)}px;
  margin: 8px 0 24px 0;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `}
`;
