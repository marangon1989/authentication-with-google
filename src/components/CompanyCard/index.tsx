import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { 
  Container,
  Content,
  Image,
  Details,
  Name,
  Industry,
  Identification,
} from './styles';

export type CompanyProps = {
  id: string;
  photo_url: string
  name: string;
  industry: string;
  description: string;
  category: string;
}

type Props = TouchableOpacityProps & {
  data: CompanyProps;
}

export function CompanyCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      
      <Content {...rest}>

        <Image source={{uri: data.photo_url}} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>
          <Industry>{data.industry}</Industry>
        </Details>

      </Content>

    </Container>
  );
}