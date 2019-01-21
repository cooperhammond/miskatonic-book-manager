import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import DataActionTypes from '../constants/DataActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200";

var _data = {
  students: [],
  books: [],
  codes: [],
};

var _itemTypeDomains = {
  student: "students",
  book: "books",
  code: "code"
}

var _itemSortKeys = {
  student: "lastName",
  book: "title",
  code: "code"
}

readItems("student");
readItems("book");
readItems("code");

let DataStore = assign({}, EventEmitter.prototype, {
  getItems: function(itemType) {
    return _data[itemType];
  },

  // Returns code object if found, else, return null
  getItem: function(itemType, id) {
    return _data[itemType].find(obj => {
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

DataStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case DataActionTypes.CREATE_ITEM:
      if ( action.itemType !== undefined &&
           action.data !== undefined ) {
        createItem(action.itemType, action.data);
      }
    break;
    case DataActionTypes.READ_ITEMS:
      if ( action.itemType !== undefined ) {
        readItems(action.itemType);
      }
    break;
    case DataActionTypes.UPDATE_ITEM:
      if ( action.itemType !=== undefined &&
           action.id !== undefined &&
           action.data !== undefined ) {
        updateCode(action.itemType, action.id, action.data);
      }
    break;
    case DataActionTypes.DELETE_ITEM:
      if ( action.itemType !== undefined &&
           action.id !== undefined &&
           action.data !== undefined ) {
        deleteCode(action.itemType, action.id, action.data);
      }
    break;
    default:
  }
});

export default CodeStore;

function createItem(itemType, data) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/create`;

  request.post(url, { form: data }, function (err, res, body) {
    updateData(err, res, body, itemType)
  });
}

function readItems(itemType) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}`;

  request.get(url, { json: true }, function (err, res, body) {
    updateData(err, res, body, itemType)
  });
}

function updateItem(itemType, id, data) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/${id}/update`;

  request.put(url, { form: data }, function (err, res, body) {
    updateData(err, res, body, itemType)
  });
}

function deleteItem(itemType, id) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/${id}/delete`;

  request.delete(url, { json: true }, function (err, res, body) {
    updateData(err, res, body, itemType)
  });
}

function updateData(err, res, body, itemType) {
  if (err) {
    return console.log(err);
  }

  body = sortData(_itemSortKeys[itemType], body);

  _data[itemType] = body;

  DataStore.emitChange();
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
