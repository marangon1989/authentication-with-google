import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import IconSchedule from '@assets/icon-schedule.svg';

import { useAuth } from '@hooks/auth';

import { 
  Container,
  Content,
  ContentGuest,
  Image,
  Details,
  Title,
  Description,
  Time,
} from './styles';

export type ScheduleProps = {
  id: string;
  photo_url: string
  name: string;
  description: string;
  time: string;
}

type Props = TouchableOpacityProps & {
  data: ScheduleProps;
}

export function ScheduleCard({ data, ...rest }: Props) {
  const { user } = useAuth();

  return (
      <Container>
        
        {
        user?.isAdmin ? (
          <Content {...rest}>
          <Details>
            <IconSchedule width={24} />
            <Title>{data.name}</Title>
          </Details>
            <Time>{data.time <= '12' ? `${data.time} AM EST` : `${data.time} PM EST`}</Time>
            <Description>{data.description}</Description>
          <Image source={{uri: data.photo_url}} />
        </Content>
        ) : (
          <ContentGuest {...rest}>
            <Details>
              <IconSchedule width={24} />
              <Title>{data.name}</Title>
            </Details>
              <Time>{data.time <= '12' ? `${data.time} AM EST` : `${data.time} PM EST`}</Time>
              <Description>{data.description}</Description>
            <Image source={{uri: data.photo_url}} />
          </ContentGuest>
        ) 
        }

      </Container>
  );
}