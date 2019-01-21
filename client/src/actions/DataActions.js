import AppDispatcher from '../dispatcher/AppDispatcher';
import DataActionTypes from '../constants/DataActionTypes';

var DataActions = {

  createItem: function(itemType, data) {
    AppDispatcher.dispatch({
      type: DataActionTypes.CREATE_ITEM,
      itemType: itemType,
      data: data,
    });
  },
  readItems: function(itemType) {
    AppDispatcher.dispatch({
      type: DataActionTypes.READ_ITEMS,
      itemType: itemType
    });
  },
  updateItem: function(itemType, id, data) {
    AppDispatcher.dispatch({
      type: DataActionTypes.UPDATE_ITEM,
      itemType: itemType,
      id: id,
      data: data,
    });
  },
  deleteItem: function(itemType, id) {
    AppDispatcher.dispatch({
      type: DataActionTypes.DELETE_ITEM,
      itemType: itemType,
      id: id,
    });
  }
};

export default DataActions;
