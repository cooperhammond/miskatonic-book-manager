import AppDispatcher from '../dispatcher/AppDispatcher';
import BookActionTypes from '../constants/BookActionTypes';

var BookActions = {

  createBook: function(data) {
    AppDispatcher.dispatch({
      type: BookActionTypes.CREATE_BOOK,
      data: data,
    });
  },
  readBook: function(id) {
    AppDispatcher.dispatch({
      type: BookActionTypes.READ_BOOK,
      id: id
    });
  },
  updateBook: function(id, data) {
    AppDispatcher.dispatch({
      type: BookActionTypes.UPDATE_BOOK,
      id: id,
      data: data,
    });
  },
  deleteBook: function(id) {
    AppDispatcher.dispatch({
      type: BookActionTypes.DELETE_BOOK,
      id: id,
    });
  }
};

export default BookActions;
