import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusActionTypes from '../constants/FocusActionTypes';

var FocusActions = {

  switchFocus: function(focusScope, focusName) {
    AppDispatcher.dispatch({
      type: FocusActionTypes.FOCUS_SWITCHED,
      focusScope: focusScope,
      focusName: focusName,
    });
  },
  addItem: function(itemType, itemProperties) {
    AppDispatcher.dispatch({
      type: FocusActionTypes.ITEM_ADDED,
      itemType: itemType,
      itemProperties: itemProperties,
    });
  },
};

export default FocusActions;
