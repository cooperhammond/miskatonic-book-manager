import React from 'react';

import "./Popup.scss";

import StandardButton from '../StandardButton/StandardButton';
import DeleteButton from '../DeleteButton/DeleteButton';
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
    <div className="popup-wrapper" onClick={this.closeSelf}>
      <div className="popup-form" ref={this.scrollRef} 
        onClick={e => e.stopPropagation()}>

        <StandardButton
            onClick={this.closeSelf}
            class="close-button"
            icon=""
        />

        {scope === "update" ?
          <DeleteButton 
            itemType={state.itemType}
            itemId={state.itemId}
          />
         : null
        }

        <div>{state.displayTitle}</div>

        <form onSubmit={submit}>
          {inputForms}

          <input type="submit" value="Submit" />
        </form>

      </div>

      {scope === "update" ? 
        <div className="side-info" onClick={e => e.stopPropagation()}>
          {state.associatedItems.map((items, index) => {
            console.log(items);
            return (
              <div key={items + index}>
                { itemType !== "code" ? 
                  <StandardButton
                    onClick={() => this.addAssociatedItem(items.itemType)}
                    class="add-button"
                    icon="+"
                  />
                  : null
                }  
                <div className="associated-item-tables">
                  <div className="associated-item-titles">
                    {items.itemTitle}
                  </div>
                  <DataDisplayTable 
                    key={items.itemType}
                    itemType={items.itemType}
                    data={items.data}
                  /> 
                </div>
              </div>
            );
          })}
        </div>
        : null
      }
    </div>
  );
}
