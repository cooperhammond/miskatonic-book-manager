import React from 'react';

export default function (props, state) {

  var classString = 'button';
  if ( state.isPressed ) {
    classString += ' pressed';
  }

  return (
    <div>
      <div className="button-wrapper" >
        <div
          className={classString}
          onClick={props.onClick}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}
        >
          <div className="icon">{props.icon}</div>
        </div>
      </div>

    </div>
  );
}
