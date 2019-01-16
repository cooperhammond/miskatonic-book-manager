import AppDispatcher from '../dispatcher/AppDispatcher';
import DataConstants from '../constants/DataConstants';

var DataActions = {

  addItem: function(itemType, itemProperties) {
    AppDispatcher.dispatch({
      type: DataConstants.ITEM_ADDED,
      itemType: itemType,
      itemProperties: itemProperties,
    });
  },
};

export default DataActions;
