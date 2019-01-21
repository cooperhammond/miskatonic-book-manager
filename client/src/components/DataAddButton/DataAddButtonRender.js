import React from 'react';

import "./dataaddbutton.scss";

export default function (props, state) {

  var classString = 'add-button';
  if ( state.isPressed ) {
    classString += ' pressed';
  }
  if ( state.isHovered ) {
    classString += ' hovered';
  }

  return (
    <div className="add-button-wrapper" >
      <div
        className={classString}
        onClick={this.handleClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
      >
        <div className="text">+</div>
      </div>
    </div>
  );
}
