import { EventEmitter } from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusConstants from '../constants/FocusConstants';

// const fs = require('fs');
// var unflatten = require('flat').unflatten;

var CHANGE_EVENT = 'change';

var _generalViews = [
  "Students",
  "Books",
  "Codes"
];
var _focusScopes = [
  "general",
  "student",
  "book",
];
var _focusScope = _focusScopes[0];
var _displayName = _generalViews[0];

var FocusStore = assign({}, EventEmitter.prototype, {

  getFocusScope: function() {
    return _focusScope;
  },

  getDisplayName: function() {
    return _displayName;
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

function processFocusChange(focusName, focusScope) {
  _focusScope = focusScope;
  _displayName = focusName;
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
