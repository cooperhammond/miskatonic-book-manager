import React from 'react';

import "./datadisplaytable.scss";

export default function (props, state) {

  var labels = props.labels.map(function (label, index) {
    return <th key={label + index}>{label}</th>;
  });

  var rows = props.rows.map(function (row, index) {
    return (
      <tr key={row + index}>
        {row.map(function (element, index_) {
          return <td key={element + index_}>{element}</td>;
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
