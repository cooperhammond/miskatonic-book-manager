import React from 'react';

import SideFocusButton from '../SideFocusButton/FocusButton';
import "./sidebar.scss";

export default function () {
  return (
    <div className='sidebar floating'>
      <SideFocusButton
        icon="assets/icons/student.svg"
        focusName="Students"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <SideFocusButton
        icon="assets/icons/book.svg"
        focusName="Books"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <SideFocusButton
        icon="assets/icons/code.svg"
        focusName="Codes"
        focusScope="general"
      />
    </div>
  );
}
