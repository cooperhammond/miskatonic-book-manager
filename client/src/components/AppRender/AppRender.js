import React from 'react';

import Sidebar from '../Sidebar/Sidebar';
import FocusBox from '../FocusBox/FocusBox';
import "./app.scss";

export default function () {
  return (
    <div className='main'>
      <Sidebar />
      <FocusBox />
    </div>
  );
}
