import React from 'react';

import MainSidebar from '../MainSidebar/Sidebar';
import MainFocusBox from '../MainFocusBox/FocusBox';
import ReportButton from '../ReportButton/ReportButton';
import Popup from '../Popup/Popup';

import "./app.scss";


export default function (props, state) {
  return (
    <div>
      <div className='main'>
        <div className='stacked'>
          <MainSidebar />
          <ReportButton />
        </div>
        <MainFocusBox />
      </div>

      {state.showPopup ?
        <Popup />
        : null
      }
    </div>
  );
}
