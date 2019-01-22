import React from 'react';

import "./popupform.scss";

import StandardButton from '../StandardButton/StandardButton';

export default function (props, state) {

  var itemType = props.itemType;

  var inputForms;

  if (itemType === "student") {
    inputForms = studentForms(this.handleChange);
  } else if (itemType === "book") {
    inputForms = bookForms(this.handleChange);
  } else if (itemType === "code") {
    inputForms = codeForms(this.handleChange);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-form">

        <StandardButton
          onClick={props.closePopup}
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

var studentForms = function (callback) {
  return (
    <div>

      <div>Add Student</div>

      <label>
        First Name
        <input
          data-key="firstName"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Last Name
        <input
          data-key="lastName"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Email
        <input
          data-key="email"
          type="email"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}

var bookForms = function (callback) {
  return (
    <div>

      <div>Add Book</div>

      <label>
        Title:
        <input
          data-key="title"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Author:
        <input
          data-key="author"
          type="text"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}

var codeForms = function () {

}
