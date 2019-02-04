import React from 'react';

import DataStore from '../../../stores/DataStore';

export default function (callback, focusItem) {

  var books = DataStore.getItems("book").map(function (book, index) {
    return (
      <option key={book.title + index} value={book._id}>
        {book.title} by {book.author}
      </option>
    );
  });

  var students = DataStore.getItems("student").map(function (student, index) {
    return (
      <option key={student.firstName + index} value={student._id}>
        {student.lastName}, {student.firstName}
      </option>
    );
  })
  students.unshift(
    <option key="no-student" value="">
      No Student
    </option>
  );

  // Default item values are in Popup.js

  return (
    <div>

      <div>Create code</div>

      <label>
        Assign the code to a book:
        <br />
        <select
          data-key="book"
          required={true}
          onChange={callback}
        >
          {books}
        </select>
      </label>

      <br />
      <label>
        Assign the code to a student:
        <br />
        <select
          data-key="student"
          onChange={callback}
        >
          {students}
        </select>
      </label>

    </div>
  )
}
