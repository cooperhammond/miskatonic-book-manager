import React from 'react';

import DataDisplayTable from '../DataDisplayTable/DataDisplayTable';
import StandardButton from '../StandardButton/StandardButton';
import PopupForm from '../PopupForm/PopupForm';

import "./focusbox.scss";

export default function (props, state) {

  return (
    <div className="focusbox floating">

      <div className='header'>{state.displayName}</div>

      <StandardButton
        onClick={this.togglePopup}
        class="add-button"
        icon="+"
      />

      <DataDisplayTable />

      {state.showPopup ?
        <PopupForm
          itemType={state.itemType}
          closePopup={this.togglePopup.bind(this)}
        />
        : null
      }

    </div>
  );
}
