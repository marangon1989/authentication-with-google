import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  },
})`
  width: 100%;
  padding: 0 ${({ theme }) => theme.SPACING['3XL']};
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-bottom: ${({ theme }) => theme.SPACING.SM};
  margin-top: ${({ theme }) => theme.SPACING.MD};
  text-transform: uppercase;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE_LIGHT};
    color: ${theme.COLORS.BLACK_100};
  `};
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  margin-bottom: 16px;
  padding: 0 32px;
  text-align: center;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `};
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: ${({ theme }) => theme.SPACING.LG};
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.BLACK_100};
  `};
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
`;

export const FooterWrapper = styled.View`
  padding: 0 32px;
  justify-content: space-between;
`;
