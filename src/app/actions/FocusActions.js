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

};

export default FocusActions;
