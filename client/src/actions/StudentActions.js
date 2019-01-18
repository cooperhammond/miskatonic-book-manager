import AppDispatcher from '../dispatcher/AppDispatcher';
import StudentActionTypes from '../constants/StudentActionTypes';

var StudentActions = {

  createStudent: function(data) {
    AppDispatcher.dispatch({
      type: StudentActionTypes.CREATE_STUDENT,
      data: data,
    });
  },
  readStudents: function() {
    AppDispatcher.dispatch({
      type: StudentActionTypes.READ_STUDENTS,
    });
  },
  updateStudent: function(id, data) {
    AppDispatcher.dispatch({
      type: StudentActionTypes.UPDATE_STUDENT,
      id: id,
      data: data,
    });
  },
  deleteStudent: function(id) {
    AppDispatcher.dispatch({
      type: StudentActionTypes.DELETE_STUDENT,
      id: id,
    });
  }
};

export default StudentActions;
