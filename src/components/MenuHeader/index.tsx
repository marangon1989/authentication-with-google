import React from 'react';
import { 
  Header,
  MenuHeaderWrapper,
  MenuItemsNumber,
  Title,
  Description
} from './styles';

type Props = {
  title: string;
  description: string;
  items_number?: string;
}

export function MenuHeader({ title, description, items_number, ...rest }: Props) {
  return (
    <Header { ...rest }>
      <MenuHeaderWrapper>
        <Title>{ title }</Title>
        <Description>{ description }</Description>
      </MenuHeaderWrapper>
      <MenuItemsNumber>{ items_number }</MenuItemsNumber>
    </Header>
  );
}