import { EventEmitter } from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import FocusConstants from '../constants/FocusConstants';

//const fs = require('fs');
//var unflatten = require('flat').unflatten;


var CHANGE_EVENT = 'change';

var _data = {
  "books": null,
  "codes": null,
  "students": null,
}
updateJSON();
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
var _focusData = _data["students"];

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

function updateJSON() {
  // var path = './src/common/data/'

  // _data["books"] = unflatten(JSON.parse(fs.readFileSync(path + 'books.json', 'utf8')));
  // _data["codes"] = unflatten(JSON.parse(fs.readFileSync(path + 'codes.json', 'utf8')));
  // _data["students"] = unflatten(JSON.parse(fs.readFileSync(path + 'students.json', 'utf-8')));
}

function processFocusChange(focusName, focusScope) {
  _focusScope = focusScope;
  _displayName = focusName;

  if ( _focusScope === "general" ) {
    _focusData = _data[focusName]
  } else if ( _focusScope === "student" ) {
    _focusData = _data["students"][_displayName];
  } else if ( _focusScope === "book" ) {
    _focusData = _data["books"][_displayName]
  }
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
