import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: ${({ theme}) => theme.COLORS.SHAPE};
  width: auto;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: ${({ theme}) => theme.COLORS.BLACK_40};
  font-family:  ${({ theme}) => theme.FONTS.TITLE};
`;
