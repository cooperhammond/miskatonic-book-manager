import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusActionTypes from '../constants/FocusActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200";

var _focusScopes = [
  "general",
  "student",
  "book",
];
var _generalViews = [
  "Students",
  "Books",
  "Codes"
];
var _cacheData = {};
var _focusScope = _focusScopes[0];
var _displayName = _generalViews[0];
var _focusData;
var _reload = false;

processFocusChange(_displayName, _focusScope);

var FocusStore = assign({}, EventEmitter.prototype, {

  getFocusScope: function() {
    return _focusScope;
  },

  getDisplayName: function() {
    return _displayName;
  },

  getFocusData: function() {
    return _focusData;
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

FocusStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case FocusActionTypes.FOCUS_SWITCHED:
      var focusName = action.focusName;
      var focusScope = action.focusScope;
      if ( focusName !== undefined && focusScope !== undefined ) {
        processFocusChange(focusName, focusScope);
      }
    break;
    case FocusActionTypes.ITEM_ADDED:
      var itemType = action.itemType;
      var itemProperties = action.itemProperties;
      if ( itemType !== undefined && itemProperties !== undefined ) {
        addItem(itemType, itemProperties, reloadItems);
      }
    break;
    default:
  }
});

export default FocusStore;

function processFocusChange(displayName, focusScope, id) {
  // Write the data to the stored variables
  _displayName = displayName;
  _focusScope = focusScope;

  // Check that the server data doesn't need to be reloaded and that the data
  // is already cached.
  if (_reload === true || !(_displayName in _cacheData)) {

    getData(id, updateData);

  } else {
    _focusData = _cacheData[_displayName];
    FocusStore.emitChange();
  }
}

function getData(id, callback) {

  var url = SERVER_URL;

  if (_focusScope === "general" || id === "") {
    url += "/" + _displayName.toLowerCase();
  } else if (_focusScope === "student") {
    url += "/students/" + id;
  } else if (_focusScope === "book") {
    url += "/books/" + id;
  }

  request.get(url, { json: true }, callback)
}

function updateData(err, res, body) {
  if (err) {
    return console.log(err);
  }

  if (_displayName === "Students" ) {
    body = sortData("name", body);
  }

  _cacheData[_displayName] = body;
  _focusData = body;
  _reload = false;
  FocusStore.emitChange();
}

function sortData(key, data) {
  return data.sort(function(a, b) {
    return keySort(key, a, b);
  });
}

function keySort(key, a, b) {
  if(a[key] < b[key]) { return -1; }
  if(a[key] > b[key]) { return 1; }
  return 0;
}

function addItem(itemType, itemProperties, callback) {
  var url = SERVER_URL + "/" + _displayName.toLowerCase() + '/create';

  request.post(url, { form: itemProperties }, callback);
}

function reloadItems(err, res, body) {
  if (err) {
    return console.log(err);
  }
  console.log("this");

  getData("", updateData);
  FocusStore.emitChange();
}
