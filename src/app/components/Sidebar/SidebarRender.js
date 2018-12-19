import FocusButton from '../FocusButton/FocusButton';

import React from 'react';

export default function () {
  return (
    <div className='floating sidebar'>
      <FocusButton
        icon="src/assets/icons/student.svg"
        focusName="Students"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <FocusButton
        icon="src/assets/icons/book.svg"
        focusName="Books"
        focusScope="general"
      />
      <hr className="sidebar-line" />
      <FocusButton
        icon="src/assets/icons/code.svg"
        focusName="Codes"
        focusScope="general"
      />
    </div>
  );
}
