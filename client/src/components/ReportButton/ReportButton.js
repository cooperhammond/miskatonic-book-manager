import { Component } from 'react';
import PropTypes from 'prop-types';

import Render from './StandardButtonRender';

class ReportButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onClick() {

  }

  onMouseDown() {
    this.setState({
      isPressed: true,
    });
  }

  onMouseUp() {
    this.setState({
      isPressed: false
    });
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default ReportButton;
