import React from 'react';

import "./Popup.scss";

import StandardButton from '../StandardButton/StandardButton';
import StudentForm from './forms/StudentForm';
import BookForm from './forms/BookForm';
import CodeForm from './forms/CodeForm';

export default function (props, state) {

  var itemType = state.itemType;
  var scope = state.scope;

  var submit;
  var inputForms;

  if (scope === "general") {
    submit = this.handleCreate;
  } else {
    submit = this.handleUpdate;
  }

  if (itemType === "student") {
    inputForms = StudentForm(this.handleValueChange, state.focusItem);
  } else if (itemType === "book") {
    inputForms = BookForm(this.handleValueChange, state.focusItem);
  } else if (itemType === "code") {
    inputForms = CodeForm(this.handleValueChange, state.focusItem);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-form">

        <StandardButton
          onClick={this.closeSelf}
          class="close-button"
          icon=""
        />

        <form onSubmit={submit}>
          {inputForms}

          <input type="submit" value="Submit" />
        </form>

      </div>
    </div>
  );
}
