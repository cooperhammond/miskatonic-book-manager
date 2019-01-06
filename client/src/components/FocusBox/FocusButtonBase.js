import { Component } from 'react';

import FocusStore from '../../stores/FocusStore';

class FocusButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      data: null
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      displayName: FocusStore.getDisplayName().toUpperCase(),
      data: FocusStore.getFocusData(),
    });
  }
}

export default FocusButton;
