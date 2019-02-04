import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import DataActionTypes from '../constants/DataActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200";

var _data = {
  student: [],
  book: [],
  code: [],
};

var _itemTypes = {
  student: "student",
  book   : "book",
  code   : "code"
}

var _itemTypeDomains = {
  student: "students",
  book: "books",
  code: "codes"
}

var _itemSortKeys = {
  student: "lastName",
  book: "title",
  code: (c) => {
    var book = DataStore.getItemById("book", c.book);
    if (book) { return book.title }
  }
}

readItems("student");
readItems("book");
readItems("code");

let DataStore = assign({}, EventEmitter.prototype, {
  getItems: function(itemType) {
    return _data[itemType];
  },

  // Returns code object if found, else, return null
  getItemById: function(itemType, id) {
    return _data[itemType].find(obj => {
      return obj._id === id;
    });
  },

  getItemByIndex: function(itemType, index) {
    return _data[itemType][index];
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
      if ( action.itemType !== undefined &&
           action.id !== undefined &&
           action.data !== undefined ) {
        updateItem(action.itemType, action.id, action.data);
      }
    break;
    case DataActionTypes.DELETE_ITEM:
      if ( action.itemType !== undefined &&
           action.id !== undefined &&
           action.data !== undefined ) {
        deleteItem(action.itemType, action.id, action.data);
      }
    break;
    default:
  }
});

export default DataStore;

function createItem(itemType, data) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/create`;

  var req = {
    requestType: "post",
    itemType: itemType,
    data: data
  }

  request.post(url, { form: data }, function (err, res, body) {
    updateData(err, res, body, req)
  });
}

function readItems(itemType) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}`;

  var req = {
    requestType: "get",
    itemType: itemType,
  }

  request.get(url, { json: true }, function (err, res, body) {
    updateData(err, res, body, req)
  });
}

function updateItem(itemType, id, data) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/${id}/update`;

  var req = {
    requestType: "put",
    itemType: itemType,
    id: id,
    data: data
  }

  console.log(req);

  request.put(url, { form: data }, function (err, res, body) {
    updateData(err, res, body, req);
  });
}

function deleteItem(itemType, id) {
  var url = SERVER_URL + `/${_itemTypeDomains[itemType]}/${id}/delete`;

  var req = {
    requestType: "delete",
    itemType: itemType,
    id: id,
  }

  request.delete(url, { json: true }, function (err, res, body) {
    updateData(err, res, body, req);
  });
}

function updateData(err, res, body, req) {
  if (err) {
    return console.log(err);
  }

  var itemType = req.itemType;
  var requestType = req.requestType;

  if (requestType === "post") {

    if (itemType === _itemTypes.code) {
      if (typeof req.data.student === "string") {
        console.log(body);
        updateItem(_itemTypes.student, req.data.student, {
          addCode: JSON.parse(body).id,
        });
      }
    }

  } else if (requestType === "put") {


    if (itemType === _itemTypes.code) {
      var oldCode = DataStore.getItemById(_itemTypes.code, req.id);

      // Check that there was a student and now there isn't
      if (oldCode.student != null && req.data.student == null) {
        updateItem(_itemTypes.student, req.data.student, {
          removeCode: oldCode.student
        })
      }
    }

  }

  if (requestType === "get") {
    body = sortData(_itemSortKeys[itemType], body);
    _data[itemType] = body;
  } else {
    readItems(itemType);
  }

  DataStore.emitChange();
}

function sortData(key, data) {
  return [].slice.call(data).sort(function(a, b) {
    if (typeof key === "function") {
      return funcSort(key, a, b);
    } else {
      return keySort(key, a, b);
    }
  });
}

function keySort(key, a, b) {
  if (a[key] < b[key]) { return -1; }
  if (a[key] > b[key]) { return 1; }
  return 0;
}

function funcSort(func, a, b) {
  if (func(a) < func(b)) { return -1; }
  if (func(a) > func(b)) {return 1; }
  return 0;
}
