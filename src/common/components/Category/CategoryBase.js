'use strict';

import { Component } from 'react';
import FocusStore from '../../stores/FocusStore';

function getCategoryState() {
  return {
    displayName: FocusStore.getDisplayName(),
    scope: FocusStore.getFocusScope()
  };
}

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: FocusStore.getDisplayName(),
      scope: FocusStore.getFocusScope()
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getCategoryState());
  }
}

module.exports = Category;
