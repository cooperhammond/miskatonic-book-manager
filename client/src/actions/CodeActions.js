import AppDispatcher from '../dispatcher/AppDispatcher';
import CodeActionTypes from '../constants/CodeActionTypes';

var CodeActions = {

  createCode: function(data) {
    AppDispatcher.dispatch({
      type: CodeActionTypes.CREATE_CODE,
      data: data,
    });
  },
  readCode: function(id) {
    AppDispatcher.dispatch({
      type: CodeActionTypes.READ_CODE,
      id: id
    });
  },
  updateCode: function(id, data) {
    AppDispatcher.dispatch({
      type: CodeActionTypes.UPDATE_CODE,
      id: id,
      data: data,
    });
  },
  deleteCode: function(id) {
    AppDispatcher.dispatch({
      type: CodeActionTypes.DELETE_CODE,
      id: id,
    });
  }
};

export default CodeActions;
