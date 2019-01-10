import React from 'react';

import "./datadisplaytable.scss";

export default function (props, state) {

  var labels = props.labels.map(function (label) {
    return <th key={label}>{label}</th>;
  });

  var rows = props.rows.map(function (row) {
    return (
      <tr key={row}>
        {row.map(function (element) {
          return <td key={element}>{element}</td>;
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
