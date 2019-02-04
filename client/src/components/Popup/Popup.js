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
      data: {},
    };

    // Bind callback methods to make `this` the correct context.
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  handleValueChange(event) {
    var target = event.target;
    var value = target.value;
    var key = target.dataset.key;

    if (value !== "") {
      this.setState({
        data: update(this.state.data, {
          [key]: {$set: value}
        }),
      });
    }
  }

  handleCreate(event) {
    event.preventDefault(); // prevent reload

    if (this.state.data !== {}) {
      DataActions.createItem(this.state.itemType, this.state.data);
      this.closeSelf();
    }
  }

  handleUpdate(event) {
    event.preventDefault();

    if (this.state.data !== {}) {
      DataActions.updateItem(this.state.itemType, this.state.itemId,
        this.state.data);
      this.closeSelf();
    }
  }

  closeSelf() {
    this.setState({ data: {} });
    FocusActions.closePopup();
  }

  escFunction(event){
    if(event.keyCode === 27) {
      this.closeSelf();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);

    var scope = FocusStore.getFocusScope();
    var itemType = FocusStore.getItemType();
    var defaultItemData = {};

    if (FocusStore.getItemType() === "code") {
      defaultItemData = {
        student: null,
        book: DataStore.getItems("book")[0]._id
      }
    }

    this.setState({
      scope: scope,
      itemType: itemType,
      data: defaultItemData
    });
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default PopupForm;
