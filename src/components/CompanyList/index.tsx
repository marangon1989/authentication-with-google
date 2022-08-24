import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Content,
  Image,
  Name,
  Industry
} from './styles';

export type CompanyListProps = {
  id: string;
  photo_url: string
  industry: string;
  name: string;
}

type Props = TouchableOpacityProps & {
  data: CompanyListProps;
}

export function CompanyList({ data, ...rest }: Props) {
  return (
    <Container>
      <Content {...rest}>
        <Image source={{uri: data.photo_url}} />
        <Name>{data.name}</Name>
        <Industry>{data.industry}</Industry>
      </Content>
    </Container>
  );
}