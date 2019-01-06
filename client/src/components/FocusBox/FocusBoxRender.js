import React from 'react';

import "./focusbox.scss";

export default function (props, state) {

  var dataList;

  if (state.data) {
    dataList = state.data.map(
      function (datum) {

        return <li key={datum._id}>{datum._id}</li>;
      });
  }

  return (
    <div className='focusbox floating'>
      <div className='header'>{state.displayName}</div>
      <ul>{ dataList }</ul>
    </div>
  );
}
