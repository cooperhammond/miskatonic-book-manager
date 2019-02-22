import React from 'react';

export default function (props, state) {

  var classString = "report-button";
  if ( state.isPressed ) {
    classString += ' pressed';
  }

  return (
    <div
      className={classString}
      onClick={props.onClick}
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseLeave={this.onMouseUp}
    >
      Download Report
    </div>
  );
}
