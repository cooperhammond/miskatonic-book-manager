import React from 'react';

import DataStore from '../../../stores/DataStore';

export default function (callback, data) {

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

      <label>
        Book attached to code:
        <br />
        <select
          data-key="book"
          required={true}
          value={data.book ? data.book : undefined}
          onChange={callback}
        >
          {books}
        </select>
      </label>

      <br />
      <label>
        Student code is assigned to:
        <br />
        <select
          data-key="student"
          value={data.student ? data.student : undefined}
          onChange={callback}
        >
          {students}
        </select>
      </label>

    </div>
  )
}
