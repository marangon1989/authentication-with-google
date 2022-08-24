import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  max-height: ${RFValue(56)}px;
  min-height: ${RFValue(56)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BLACK_100};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.WHITE_100};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE_100
}))``;