import React from 'react';

import "./popupform.scss";

import StandardButton from '../StandardButton/StandardButton';
import studentForm from './forms/studentForm';
import bookForm from './forms/bookForm';
import codeForm from './forms/bookForm';

export default function (props, state) {

  var itemType = props.itemType;

  var inputForms;

  if (itemType === "student") {
    inputForms = studentForm(this.handleChange);
  } else if (itemType === "book") {
    inputForms = bookForm(this.handleChange);
  } else if (itemType === "code") {
    inputForms = codeForm(this.handleChange);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-form">

        <StandardButton
          onClick={this.closeSelf}
          class="close-button"
          icon=""
        />

        <form onSubmit={this.handleSubmit}>
          {inputForms}

          <input type="submit" value="Submit" />
        </form>

      </div>
    </div>
  );
}
