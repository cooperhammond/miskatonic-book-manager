import React from 'react';
import { Component } from 'react';

import Render from './PopupRender';

import update from 'immutability-helper';

import DataActions from '../../actions/DataActions';
import FocusActions from '../../actions/FocusActions';
import FocusStore from '../../stores/FocusStore';
import DataStore from '../../stores/DataStore';

class PopupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scope: null,
      itemType: null,
      itemId: null,
      data: {},
      associatedItems: [],
      displayTitle: ""
    };

    this.scrollRef = React.createRef();

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  _onChange() {
    // To provide default data for the dropdown menus
    var scope = FocusStore.getFocusScope();
    var itemType = FocusStore.getItemType();
    var focusItem = FocusStore.getFocusItem();
    var itemId = focusItem ? focusItem._id : null;
    var defaultItemData = {};
    var associatedItems = [];
    var displayTitle = "";

    if (itemType === "student") {
      displayTitle = focusItem ? "Update Student" : "Add Student"
      defaultItemData = {
        firstName: focusItem ? focusItem.firstName : "",
        lastName: focusItem ? focusItem.lastName : "",
        email: focusItem ? focusItem.email : ""
      }
    } else if (itemType === "book") {
      displayTitle = focusItem ? "Update Book" : "Add Book"
      defaultItemData = {
        title: focusItem ? focusItem.title : "",
        author: focusItem ? focusItem.author : ""
      }
    } else if (itemType === "code") {
      displayTitle = focusItem ? "Update Code" : "Create Code"
      defaultItemData = {
        student: (focusItem ? (focusItem.student ? focusItem.student
                  : "") : ""),
        book: focusItem ? focusItem.book : DataStore.getItems("book")[0]._id
      }
    }

    if ((itemType === "student" || itemType === "book") && focusItem) {
      var associatedCodes = {
        itemType: "code",
        itemTitle: itemType === "student" ? "Student's Books" : "Book's Codes",
        data: [],
      };
      for (let index = 0; index < focusItem.codes.length; index++) {
        associatedCodes.data.push(
          DataStore.getItemById("code", focusItem.codes[index]));
      }
      associatedItems.push(associatedCodes);

      console.log(associatedItems);
    } else if (itemType === "code" && focusItem) {
      var associatedBook = {
        itemType: "book",
        itemTitle: "Books",
        data: [DataStore.getItemById("code", focusItem.book)],
      }
      associatedItems.push(associatedBook);

      if (focusItem.student) {
        var associatedStudent = {
          itemType: "student",
          itemTitle: "Students",
          data: [DataStore.getItemById("student", focusItem.student)],
        }
        associatedItems.push(associatedStudent);
      }
    }

    if (this._mounted) {
      this.scrollRef.current.scrollTo(0, 0);

      this.setState({
        scope: scope,
        itemId: itemId,
        itemType: itemType,
        data: defaultItemData,
        associatedItems: associatedItems,
        displayTitle: displayTitle
      });
    }
  }

  handleValueChange(event) {
    var target = event.target;
    var value = target.value;
    var key = target.dataset.key;

    this.setState({
      data: update(this.state.data, {
        [key]: {$set: value}
      }),
    });
  }

  handleCreate(event) { // Create
    event.preventDefault(); // prevent reload

    if (this.state.data !== {}) {
      DataActions.createItem(this.state.itemType, this.state.data);
      this.closeSelf();
    }
  }

  handleUpdate(event) { // update
    event.preventDefault();

    if (this.state.data !== {}) {
      DataActions.updateItem(this.state.itemType, this.state.itemId,
        this.state.data);
      this.closeSelf();
    }
  }

  componentDidMount() {
    this._mounted = true;
    FocusStore.addChangeListener(this._onChange);
    document.addEventListener("keydown", this.escFunction, false);

    this._onChange();
  }

  componentWillUnmount(){
    this._mounted = false;
    FocusStore.removeChangeListener(this._onChange);
    document.removeEventListener("keydown", this.escFunction, false);
  }

  // Press escape to close the popup window
  escFunction(event){
    if(event.keyCode === 27) {
      this.closeSelf();
    }
  }

  // reset data and close
  closeSelf() {
    FocusActions.closePopup();
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default PopupForm;
