import { Component } from 'react';

import update from 'immutability-helper';

import DataActions from '../../actions/DataActions';
import DataStore from '../../stores/DataStore';

class PopupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };

    // Bind callback methods to make `this` the correct context.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  handleChange(event) {
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

  handleSubmit(event) {
    event.preventDefault(); // prevent reload

    if (this.state.data !== {}) {
      DataActions.createItem(this.props.itemType, this.state.data);
      this.closeSelf();
    }
  }

  closeSelf() {
    this.setState({ data: {} });
    this.props.closePopup();
  }

  escFunction(event){
    if(event.keyCode === 27) {
      this.closeSelf();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);

    if (this.props.itemType === "code") {
      this.setState({
        data: { book: DataStore.getItems("book")[0]._id },
      });
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
}

export default PopupForm;
