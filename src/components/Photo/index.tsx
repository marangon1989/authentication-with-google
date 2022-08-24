import React from 'react';

import { 
  Image, 
  Placeholder, 
  PlaceholderTitle 
} from './styles';

import { useAuth } from '@hooks/auth';

type Props = {
  uri: string | null;
}

export function Photo({ uri }: Props) {

  const { user } = useAuth();


  if(uri) {
    return <Image source={{uri}} />
  }

  return (
    <>
      { user?.isAdmin ? (
        <Placeholder>
          <PlaceholderTitle>No photos{'\n'} uploaded</PlaceholderTitle>
        </Placeholder> 
      ) : (
        <PlaceholderTitle />
      )
      }
    </>
  );
}