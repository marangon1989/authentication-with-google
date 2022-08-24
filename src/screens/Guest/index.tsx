import React from 'react';

import { Header } from '@src/components/Header';
import { MenuHeader } from '@src/components/MenuHeader';

export function Guest() {
  return (
    <>
      <Header />
      <MenuHeader 
        title='Guest' 
        description='Panels & Discussions held at the 7th fashinnovation Worldwide Talks 2022' 
        items_number={`0 guest`}
      />
    </>
    
  );
}