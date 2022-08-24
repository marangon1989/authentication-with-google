import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.BLACK_40
}))`
  width: 100%;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.COLORS.WHITE_100};
  font-size: ${RFValue(14)}px;
  padding: ${({ theme }) => theme.SPACING.XS} 0;
  padding-left: ${({ theme }) => theme.SPACING.LG};
  margin-bottom: ${({ theme }) => theme.SPACING.MD};

  ${({ theme })  => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.BLACK_100};
    color: ${theme.COLORS.BLACK_100};
  `}
`;
