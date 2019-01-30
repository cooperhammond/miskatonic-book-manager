import React from 'react';

import DataDisplayTable from '../../DataDisplayTable/DataDisplayTable';
import StandardButton from '../../StandardButton/StandardButton';
import Popup from '../../Popup/Popup';

export default function (functions, props, state) {
  return (
    <div>

      <div className='header'>{state.displayName}</div>

      <StandardButton
        onClick={functions.togglePopup}
        class="add-button"
        icon="+"
      />

      <DataDisplayTable onItemClick={functions.onItemClick} />

      {state.showPopup ?
        <Popup
          itemType={state.itemType}
          closePopup={functions.togglePopup.bind(functions)}
        />
        : null
      }

    </div>
  )
}
