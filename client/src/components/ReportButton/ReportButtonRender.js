import React from 'react';

import "./ReportButton.scss";

export default function (props, state) {

  var classString = "report-button floating";
  if ( state.isPressed ) {
    classString += ' pressed';
  }

  return (
    <div className="report-wrapper">
      <div
        className={classString}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
      >
        <div>Download Report</div>
      </div>
    </div>
  );
}
