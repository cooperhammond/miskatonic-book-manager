import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import BookActionTypes from '../constants/BookActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200/books";

var _books = [];

readBooks(updateData);

var BookStore = assign({}, EventEmitter.prototype, {
  getItems: function() {
    return _books;
  },

  // Returns book object if found, else, return null
  getItem: function(id) {
    return _books.find(obj => {
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

BookStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case BookActionTypes.CREATE_BOOK:
      if ( action.data !== undefined ) {
        createBook(action.data, updateData);
      }
    break;
    case BookActionTypes.READ_BOOKS:
      readBooks(updateData);
    break;
    case BookActionTypes.UPDATE_BOOK:
      if ( action.id !== undefined &&
           action.data !== undefined ) {
        updateBook(action.id, action.data, updateData);
      }
    break;
    case BookActionTypes.DELETE_BOOK:
      if ( action.id !== undefined &&
           action.data !== undefined ) {
        deleteBook(action.id, action.data, updateData);
      }
    break;
    default:
  }
});

export default BookStore;

function createBook(data, callback) {
  var url = SERVER_URL + "/create";

  request.post(url, { form: data }, callback);
}

function readBooks(callback) {
  var url = SERVER_URL;

  request.get(url, { json: true }, callback);
}

function updateBook(id, data, callback) {
  var url = SERVER_URL + `/${id}/update`;

  request.put(url, { form: data }, callback);
}

function deleteBook(id, callback) {
  var url = SERVER_URL + `/${id}/delete`;

  request.delete(url, { json: true }, callback);
}

function updateData(err, res, body) {
  if (err) {
    return console.log(err);
  }

  // Sort the data alphabetically
  _books = sortData("title", body);

  BookStore.emitChange();
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
