import React from 'react';

import "./datadisplaytable.scss";

export default function (props, state) {

  var onItemClick = this.onItemClick;

  var labels = state.labels.map(function (label, index) {
    return <th key={label + index}>{label}</th>;
  });

  var rows = state.rows.map(function (row, index) {
    return (
      <tr data-index={index} key={row + index} onClick={onItemClick}>
        {row.map(function (element, index_) {
          return <td data-index={index} key={element + index_}>{element}</td>;
        })}
      </tr>
    )
  });

  return (
    <table className="focus-table">
      <thead>
        <tr>
          {labels}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
