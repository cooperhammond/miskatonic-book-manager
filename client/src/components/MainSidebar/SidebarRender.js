import React from 'react';

import SideFocusButton from '../SideFocusButton/FocusButton';
import "./sidebar.scss";

export default function () {
  return (
    <div className='sidebar floating'>
      <SideFocusButton
        icon="assets/icons/student.svg"
        displayName="Students"
        itemType="student"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <SideFocusButton
        icon="assets/icons/book.svg"
        displayName="Books"
        itemType="book"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <SideFocusButton
        icon="assets/icons/code.svg"
        displayName="Codes"
        itemType="code"
        focusScope="general"
      />
    </div>
  );
}
