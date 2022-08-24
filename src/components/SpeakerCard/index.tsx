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
  Identification,
  JobTitle,
} from './styles';

export type SpeakerProps = {
  id: string;
  photo_url: string
  name: string;
  job_title: string;
  description: string;
}

type Props = TouchableOpacityProps & {
  data: SpeakerProps;
}

export function SpeakerCard({ data, ...rest }: Props) {
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
          <JobTitle>{data.job_title}</JobTitle>
        </Details>

      </Content>

    </Container>
  );
}