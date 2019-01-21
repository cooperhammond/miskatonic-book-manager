import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusActionTypes from '../constants/FocusActionTypes';

var FocusActions = {

  changeView: function(args) {
    AppDispatcher.dispatch({
      type: FocusActionTypes.VIEW_CHANGED,
      args: args,
    });
  },
};

export default FocusActions;
