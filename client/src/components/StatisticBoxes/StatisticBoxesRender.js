import React from 'react';

import "./StatisticBoxes.scss";

export default function (props, state) {

  return (
    <div className="statistic-box statistic-boxes-wrapper">
      <div className="floating statistic-box students-reading">
        <div className="number">{state.studentsReading}</div>
        <div className="title">Students Reading</div>
      </div>

      <div className="floating statistic-box books-checked-out">
        <div className="number">{state.booksCheckedOut}</div>
        <div className="title">Checked Out Books</div>
      </div>

      <div className="floating statistic-box unused-codes">
        <div className="number">{state.unusedCodes}</div>
        <div className="title">Unused Codes</div>
      </div>
    </div>
  );
}
