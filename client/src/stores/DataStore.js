import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import DataConstants from '../constants/DataConstants';

import FocusActions from '../actions/FocusActions';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200";

var _lastItemAdded;

var DataStore = assign({}, EventEmitter.prototype, {

  getLastItemAdded: function() {
    return _lastItemAdded;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

DataStore.dispatchToken = AppDispatcher.register(function(action) {
  console.log(action.type);
  switch(action.type) {
    case DataConstants.ITEM_ADDED:
      var itemType = action.itemType;
      var itemProperties = action.itemProperties;
      if ( itemType !== undefined && itemProperties !== undefined ) {
        console.log(itemType);
        console.log(itemProperties);
        addItem(itemType, itemProperties);
        FocusActions.itemAdded();
        DataStore.emitChange();
      }
    break;
    default:
  }
});

export default DataStore;

function addItem(itemType, itemProperties) {
  var url = SERVER_URL + "/" + itemType.toLowerCase() + '/create';

  request.post(url, { form: itemProperties }, )
}

function reloadItems(err, res, body) {
  if (err) {
    return console.log(err);
  }

  DataStore.emitChange();
}
