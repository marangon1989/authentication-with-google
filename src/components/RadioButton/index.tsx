import React from 'react';
import { TouchableHighlightProps } from 'react-native';

import { 
  Container,
  Title,
  Radio,
  Selected,
  RadioButtonProps 
} from './styles';

type Props = TouchableHighlightProps & RadioButtonProps & {
  title: string;
}

export function RadioButton({ title, selected = false, ...rest }: Props) {
  return (
    <Container selected={selected} { ...rest }>
      <Radio>{selected && <Selected />}</Radio>
      <Title>{ title }</Title>
    </Container>
  );
}