import React from 'react';
import { 
  Container,
  Title,
} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
}

export function EnviromentButton({ 
  title,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <Container
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
    );
  }
