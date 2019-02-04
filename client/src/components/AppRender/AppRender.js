import React from 'react';

import MainSidebar from '../MainSidebar/Sidebar';
import MainFocusBox from '../MainFocusBox/FocusBox';
import Popup from '../Popup/Popup';

import "./app.scss";


export default function (props, state) {
  return (
    <div>
      <div className='main'>
        <MainSidebar />
        <MainFocusBox />
      </div>

      {state.showPopup ?
        <Popup />
        : null
      }
    </div>
  );
}
