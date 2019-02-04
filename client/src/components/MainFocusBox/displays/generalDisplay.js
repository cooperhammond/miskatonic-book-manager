import React from 'react';

import DataDisplayTable from '../../DataDisplayTable/DataDisplayTable';
import StandardButton from '../../StandardButton/StandardButton';

import FocusActions from '../../../actions/FocusActions'

export default function (functions, props, state) {
  return (
    <div>

      <div className='header'>{state.displayName}</div>

      <StandardButton
        onClick={FocusActions.openPopup}
        class="add-button"
        icon="+"
      />

      <DataDisplayTable onItemClick={functions.onItemClick} />

    </div>
  )
}
