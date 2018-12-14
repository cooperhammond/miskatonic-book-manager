'use strict';

import React from 'react';

export default function (props, state) {
  var text;
  if ( state.scope == "general" ) {
    return (
      <div>Viewing by: </div>
    );
  } else {
    return (
      <div>{state.displayName}</div>
    );
  }
}
