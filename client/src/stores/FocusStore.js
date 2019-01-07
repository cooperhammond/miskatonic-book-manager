import { EventEmitter } from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusConstants from '../constants/FocusConstants';

var CHANGE_EVENT = 'change';

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

function processFocusChange(displayName, focusScope, id) {
  // Write the data to the stored variables
  _displayName = displayName;
  _focusScope = focusScope;

  // Check that the server data doesn't need to be reloaded and that the data
  // is already cached.
  if (_reload === true || !(_displayName in _cacheData)) {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    var url = "http://localhost:3200";

    if (_focusScope === "general") {
      url += "/" + _displayName.toLowerCase();
    } else if (_focusScope === "student") {
      url += "/students/" + id;
    } else if (_focusScope === "book") {
      url += "/books/" + id;
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);

    request.onload = function () {
      var data = JSON.parse(this.response);

      _cacheData[_displayName] = data;
      _focusData = data;
      FocusStore.emitChange();
    }

    // Send request
    request.send();
  } else {
    _focusData = _cacheData[_displayName];
    FocusStore.emitChange();
  }
}

FocusStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    case FocusConstants.FOCUS_SWITCHED:
      var focusName = action.focusName;
      var focusScope = action.focusScope;
      if ( focusName !== undefined && focusScope !== undefined ) {
        processFocusChange(focusName, focusScope);
        //FocusStore.emitChange();
      }
      break;
    default:
  }
});

export default FocusStore;
