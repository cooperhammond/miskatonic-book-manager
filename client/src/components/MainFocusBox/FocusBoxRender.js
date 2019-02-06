import React from 'react';

import DataDisplayTable from '../DataDisplayTable/DataDisplayTable';
import StandardButton from '../StandardButton/StandardButton';

import "./focusbox.scss";

import FocusActions from '../../actions/FocusActions'

export default function (props, state) {

  return (
    <div className="focusbox floating">

      <div className='header'>{state.displayName}</div>

      <StandardButton
        onClick={FocusActions.openPopup}
        class="add-button"
        icon="+"
      />

      <DataDisplayTable onItemClick={this.onItemClick} />

    </div>
  );
}
