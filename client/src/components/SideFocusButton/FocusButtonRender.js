import React from 'react';

export default function (props, state) {

  var classString = 'button';
  var selectionString = 'selector';
  if ( state.isPressed ) {
    classString += ' pressed';
  }
  if ( state.isHighlighted ) {
    classString += ' highlighted';
    selectionString += ' highlighted';
  }

  return (
    <div>
      <div className={selectionString} />
      <div
        className={classString}
        onClick={this.handleClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
      >
        <img className="icon" alt={props.focusName} src={props.icon} />
        <div className={"text"}>
          {props.focusName}
        </div>
      </div>
    </div>
  );
}
