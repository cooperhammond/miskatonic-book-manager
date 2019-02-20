import React from 'react';

import "./DeleteButton.scss";

export default function (props, state) {

  var classString = "delete-button";
  if ( state.isPressed ) {
    classString += ' pressed';
  }

  return (
    <div>
      <div className={`delete-button-wrapper`} >
        <div
          className={classString}
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}
        >
          <img 
            className="icon" 
            alt="Delete Item" 
            src="assets/icons/garbage.svg" 
          />
        </div>
      </div>

    </div>
  );
}
