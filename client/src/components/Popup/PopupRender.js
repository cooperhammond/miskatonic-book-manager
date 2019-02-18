import React from 'react';

import "./Popup.scss";

import StandardButton from '../StandardButton/StandardButton';
import DataDisplayTable from '../DataDisplayTable/DataDisplayTable';

import StudentForm from './forms/StudentForm';
import BookForm from './forms/BookForm';
import CodeForm from './forms/CodeForm';

export default function (props, state) {

  var itemType = state.itemType;
  var scope = state.scope;

  var submit;
  var inputForms;

  if (scope === "create") {
    submit = this.handleCreate;
  } else if (scope === "update") {
    submit = this.handleUpdate;
  }

  // Do not use .call on these methods
  if (itemType === "student") {
    inputForms = StudentForm(this.handleValueChange, state.data);
  } else if (itemType === "book") {
    inputForms = BookForm(this.handleValueChange, state.data);
  } else if (itemType === "code") {
    inputForms = CodeForm(this.handleValueChange, state.data);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-form" ref={this.scrollRef}>

       <StandardButton
          onClick={this.closeSelf}
          class="close-button"
          icon=""
        />

        <div>{state.displayTitle}</div>

        <form onSubmit={submit}>
          {inputForms}

          <input type="submit" value="Submit" />
        </form>

      </div>

      {scope === "update" ? 
        state.associatedItems.map((items) => {
          return (
            <div className="side-info">
              <div className="associated-item-titles">
                {items.itemTitle}
              </div>
              <DataDisplayTable 
                key={items.itemType}
                itemType={items.itemType}
                data={items.data}
              /> 
            </div>
          );
        })
        : null
      }
    </div>
  );
}
