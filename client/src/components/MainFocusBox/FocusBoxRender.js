import React from 'react';

import generalDisplay from './displays/generalDisplay';
import studentDisplay from './displays/studentDisplay';

import "./focusbox.scss";
import './displays/displaystyles.scss';

export default function (props, state) {

  var display;

  if (state.focusScope === "student") {
    display = studentDisplay(this, props, state);
  } else if (state.focusScope === "book") {

  } else if (state.focusScope === "code") {

  } else {
    display = generalDisplay(this, props, state);
  }

  return (
    <div className="focusbox floating">

      {display}

    </div>
  );
}
