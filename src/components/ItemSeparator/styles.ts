import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Separator = styled.View`
  width: 100%;
  height: ${RFValue(1)}px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;
