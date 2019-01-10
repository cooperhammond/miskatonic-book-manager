import React from 'react';

import MainSidebar from '../MainSidebar/Sidebar';
import MainFocusBox from '../MainFocusBox/FocusBox';
import "./app.scss";

export default function () {
  return (
    <div className='main'>
      <MainSidebar />
      <MainFocusBox />
    </div>
  );
}
