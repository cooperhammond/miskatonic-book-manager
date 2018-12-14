'use strict';

import React from 'react';

export default function (props, state) {

  var classString = 'button';
  if ( state.isPressed ) {
    classString += ' pressed';
  }
  if ( state.isHighlighted ) {
    classString += ' highlighted';
  }

  return (
    <div
      className={classString}
      onClick={this.handleClick}
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseLeave={this.onMouseUp}
    >
      {props.focusName}
    </div>
  );
}
