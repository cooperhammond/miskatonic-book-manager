import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusConstants from '../constants/FocusConstants';

var FocusActions = {

  switchFocus: function(focusScope, focusName) {
    AppDispatcher.dispatch({
      type: FocusConstants.FOCUS_SWITCHED,
      focusScope: focusScope,
      focusName: focusName,
    });
  },
  addItem: function(itemType, itemProperties) {
    AppDispatcher.dispatch({
      type: FocusConstants.ITEM_ADDED,
      itemType: itemType,
      itemProperties: itemProperties,
    });
  },
};

export default FocusActions;
