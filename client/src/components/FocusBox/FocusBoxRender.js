import React from 'react';

import "./focusbox.scss";

export default function (props, state) {

  var labels = state.labels.map(function (label) {
    return <th key={label}>{label}</th>;
  });

  var rows = state.rows.map(function (row) {
    return (
      <tr key={row}>
        {row.map(function (element) {
          return <td key={element}>{element}</td>;
        })}
      </tr>
    )
  });

  return (
    <div className='focusbox floating'>
      <div className='header'>{state.displayName}</div>

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

    </div>
  );
}
