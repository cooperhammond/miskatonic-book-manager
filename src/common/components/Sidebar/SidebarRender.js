'use strict';

import FocusButton from '../FocusButton/FocusButton';

import React from 'react';

export default function () {
  return (
    <div className='sidebar'>
      <FocusButton
        focusName="Student"
        focusScope="general"
      />
      <FocusButton
        focusName="Book"
        focusScope="general"
      />
      <FocusButton
        focusName="Code"
        focusScope="general"
      />
    </div>
  );
}
