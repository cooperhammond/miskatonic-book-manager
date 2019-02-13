import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusActionTypes from '../constants/FocusActionTypes';

var FocusActions = {

  changeView: function(args) {
    AppDispatcher.dispatch({
      type: FocusActionTypes.VIEW_CHANGED,
      args: args,
    });
  },
  closePopup: function() {
    AppDispatcher.dispatch({
      type: FocusActionTypes.POPUP_CLOSED,
    });
  },
  openPopup: function(action) {
    AppDispatcher.dispatch({
      type: FocusActionTypes.POPUP_OPENED,
      action: action
    });
  }
};

export default FocusActions;
