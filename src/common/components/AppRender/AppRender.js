'use strict';

import React from 'react';
import Screen from '../Screen/Screen';
import Formulae from '../Formulae/Formulae';
import Keyboard from '../Keyboard/Keyboard';

export default function () {
  return (
    <div className='main'>
      <Screen />
      <Formulae />
      <Keyboard />
    </div>
  );
}
