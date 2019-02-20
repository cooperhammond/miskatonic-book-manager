import { Component } from 'react';
import PropTypes from 'prop-types';

import Render from './DeleteButtonRender';

import DataActions from '../../actions/DataActions';
import FocusActions from '../../actions/FocusActions';

class DeleteButton extends Component {

  static propTypes = {
    itemType: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired
  }

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
    if (window.confirm("Delete this " + this.props.itemType + "?")) {
      DataActions.deleteItem(this.props.itemType, this.props.itemId);
      FocusActions.closePopup();
    }
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

export default DeleteButton;
