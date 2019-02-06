import { Component } from 'react';
import PropTypes from 'prop-types';

import Render from './StandardButtonRender';

class StandardButton extends Component {

  static propTypes = {
    class: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      isHovered: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
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

export default StandardButton;
