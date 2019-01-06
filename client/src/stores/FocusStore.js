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
var _focusScope = _focusScopes[0];
var _displayName = _generalViews[0];
var _focusData;

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

function processFocusChange(displayName, focusScope) {
  // Write the data to the stored variables
  _focusScope = focusScope;
  _displayName = displayName;

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', `http://localhost:3200/${_displayName.toLowerCase()}`,
    true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    _focusData = data;
  }

  // Send request
  request.send();
}

FocusStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    case FocusConstants.FOCUS_SWITCHED:
      var focusName = action.focusName;
      var focusScope = action.focusScope;
      if ( focusName !== undefined && focusScope !== undefined ) {
        processFocusChange(focusName, focusScope);
        FocusStore.emitChange();
      }
      break;
    default:
  }
});

export default FocusStore;
