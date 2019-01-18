import { EventEmitter } from 'events';
import assign from 'object-assign';

import request from 'request';

import AppDispatcher from '../dispatcher/AppDispatcher';
import StudentActionTypes from '../constants/StudentActionTypes';

var CHANGE_EVENT = 'change';
var SERVER_URL = "http://localhost:3200/students";

var _students = [];

readStudents(updateData);

var StudentStore = assign({}, EventEmitter.prototype, {
  getStudents: function() {
    return _students;
  },

  // Returns student object if found, else, return null
  getStudent: function(id) {
    return _students.find(obj => {
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

StudentStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case StudentActionTypes.CREATE_STUDENT:
      var data = action.data;
      if ( data !== undefined ) {
        createStudent(data, updateData);
      }
    break;
    case StudentActionTypes.READ_STUDENTS:
      readStudents(updateData);
    break;
    case StudentActionTypes.UPDATE_STUDENT:
      var id = action.id;
      var data = action.data;
      if ( id !== undefined && data !== undefined ) {
        updateStudent(id, data, updateData);
      }
    break;
    case StudentActionTypes.DELETE_STUDENT:
      var id = action.id;
      var data = action.data;
      if ( id !== undefined && data !== undefined ) {
        deleteStudent(id, data, updateData);
      }
    break;
    default:
  }
});

export default StudentStore;

function createStudent(data, callback) {
  var url = SERVER_URL + "/create";

  request.post(url, { form: data }, callback);
}

function readStudents(callback) {
  var url = SERVER_URL;

  request.get(url, { json: true }, callback);
}

function updateStudent(id, data, callback) {
  var url = SERVER_URL + `/${id}/update`;

  request.put(url, { form: data }, callback);
}

function deleteStudent(id, callback) {
  var url = SERVER_URL + `/${id}/delete`;

  request.delete(url, { json: true }, callback);
}

function updateData(err, res, body) {
  if (err) {
    return console.log(err);
  }

  // Sort the data alphabetically
  _students = sortData("lastName", body);

  StudentStore.emitChange();
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
