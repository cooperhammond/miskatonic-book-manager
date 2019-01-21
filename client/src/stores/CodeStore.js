import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import CodeActionTypes from '../constants/CodeActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200/codes";

var _codes = [];

readCodes(updateData);

var CodeStore = assign({}, EventEmitter.prototype, {
  getItems: function() {
    return _codes;
  },

  // Returns code object if found, else, return null
  getItem: function(id) {
    return _codes.find(obj => {
      return obj._id === id;
    });
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

CodeStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case CodeActionTypes.CREATE_STUDENT:
      if ( action.data !== undefined ) {
        createCode(action.data, updateData);
      }
    break;
    case CodeActionTypes.READ_STUDENTS:
      readCodes(updateData);
    break;
    case CodeActionTypes.UPDATE_STUDENT:
      if ( action.id !== undefined &&
           action.data !== undefined ) {
        updateCode(action.id, action.data, updateData);
      }
    break;
    case CodeActionTypes.DELETE_STUDENT:
      if ( action.id !== undefined &&
           action.data !== undefined ) {
        deleteCode(action.id, action.data, updateData);
      }
    break;
    default:
  }
});

export default CodeStore;

function createCode(data, callback) {
  var url = SERVER_URL + "/create";

  request.post(url, { form: data }, callback);
}

function readCodes(callback) {
  var url = SERVER_URL;

  request.get(url, { json: true }, callback);
}

function updateCode(id, data, callback) {
  var url = SERVER_URL + `/${id}/update`;

  request.put(url, { form: data }, callback);
}

function deleteCode(id, callback) {
  var url = SERVER_URL + `/${id}/delete`;

  request.delete(url, { json: true }, callback);
}

function updateData(err, res, body) {
  if (err) {
    return console.log(err);
  }

  // Sort the data alphabetically
  _codes = sortData("code", body);

  CodeStore.emitChange();
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
