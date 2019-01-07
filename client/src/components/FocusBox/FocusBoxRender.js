import React from 'react';

import FocusTable from '../FocusTable/FocusTable';

import "./focusbox.scss";

export default function (props, state) {

  return (
    <div className='focusbox floating'>
      <div className='header'>{state.displayName}</div>
      <FocusTable data={state.data} category={state.displayName} />
    </div>
  );
}
