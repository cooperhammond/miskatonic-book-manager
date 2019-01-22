import { Component } from 'react';

import update from 'immutability-helper';

import DataActions from '../../actions/DataActions';

class PopupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };

    // Bind callback methods to make `this` the correct context.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var target = event.target;
    var value = target.value;
    var key = target.dataset.key;
    this.setState({
      data: update(this.state.data, {
        [key]: {$set: value}
      }),
    });
  }


  handleSubmit(event) {
    event.preventDefault(); // prevent reload

    if (this.state.data !== {}) {
      DataActions.createItem(this.props.itemType, this.state.data);
      this.props.closePopup();
    }
  }
}

export default PopupForm;
