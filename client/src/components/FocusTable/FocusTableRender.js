import React from 'react';

import "./focustable.scss";

export default function (props, state) {

  var labels = [];
  var accessors = [];
  var rows;

  if (props.category === "STUDENTS") {
    labels = ["Name", "Email", "Codes"];
    accessors = ["name", "email", "codes"];
  } else if (props.category === "BOOKS") {
    labels = ["Title", "Author", "Codes", "Readers"];
    accessors = ["title", "author", "codes"]
  }

  labels = labels.map(function (label) {
    return <th key={label}>{label}</th>;
  });

  if (props.data) {
    rows = props.data.map(
      function (datum) {

        var elements = accessors.map(
          function (accessor) {
            var element = datum[accessor];
            if (typeof element === "object") {
              element = element.length;
            }
            return <td key={element}>{element}</td>;
          }
        )

        return (
          <tr key={datum._id}>
            {elements}
          </tr>
        );
      });
  }

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
