import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Content,
  Image,
  Name,
  JobTitle,
} from './styles';

export type SpeakerListProps = {
  id: string;
  photo_url: string
  name: string;
  job_title: string;
}

type Props = TouchableOpacityProps & {
  data: SpeakerListProps;
}

export function SpeakerList({ data, ...rest }: Props) {
  return (
    <Container>
      <Content {...rest}>
        <Image source={{uri: data.photo_url}} />
        <Name>{data.name}</Name>
        <JobTitle>{data.job_title}</JobTitle>
      </Content>
    </Container>
  );
}