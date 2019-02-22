import React from 'react';

import "./datadisplaytable.scss";

export default function (props, state) {

  var functions = this;

  var labels = state.labels.map(function (label, index) {
    return <th key={label + index}>{label}</th>;
  });

  var rows = state.rows.map(function (row, index) {
    var itemAccessor;

    if (props.data) {
      itemAccessor = props.data[index]._id;
    } else {
      itemAccessor = index;
    }

    return (
      <tr data-index={itemAccessor} key={row + index} onClick={functions.onItemClick}>
        {row.map(function (element, index_) {
          if (validateEmail(element)) {
            return (
              <td key={element+""+index_} onClick={(e) => e.stopPropagation()}>
                <a href={`mailto:${element}`}>{element}</a>
              </td>
            );
          } else {
            return <td data-index={itemAccessor} key={element+""+index_}>{element}</td>;
          }
        })}
      </tr>
    );
  });

  if (rows.length !== 0) {
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
  } else {
    return (
      <div className="no-item-title-wrapper">
        <div className="no-item-title">
          There are no {state.itemType}s 
            {this.props.itemType 
              ? " associated"
              : ""}.
        </div>
      </div>
    );
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}