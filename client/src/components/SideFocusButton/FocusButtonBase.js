import { Component } from 'react';
import FocusActions from '../../actions/FocusActions';
import FocusStore from '../../stores/FocusStore';

class FocusButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      isHighlighted: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  handleClick() {
    FocusActions.switchFocus(this.props.focusScope, this.props.focusName);
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

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    if ( FocusStore.getDisplayName() === this.props.focusName &&
         FocusStore.getFocusScope() === this.props.focusScope) {
      this.setState({
        isHighlighted: true,
      });
    } else {
      this.setState({
        isHighlighted: false,
      });
    }
  }
}

export default FocusButton;
