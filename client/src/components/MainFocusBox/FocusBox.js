import Render from './FocusBoxRender';

import { Component } from 'react';

import FocusActions from '../../actions/FocusActions'
import FocusStore from '../../stores/FocusStore';

class FocusBox extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    // Bind callback methods to make `this` the correct context.
    this.onItemClick = this.onItemClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  onItemClick (event) {
    var target = event.target;
    var index = target.dataset.index;

    // Switch to a specific view of the item itself
    FocusActions.changeView({
      newScope : "update",
      itemType : FocusStore.getItemType(),
      itemIndex: index,
    });
  }

  onButtonClick() {
    FocusActions.changeView({
      newScope: "create",
    });
  }

  _onChange() {
    var displayName = FocusStore.getGeneralDisplayTitle(FocusStore.getItemType());

    this.setState({
      displayName: displayName,
    });
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  render() {
    return Render.call(this, this.props, this.state);
  }
}

export default FocusBox;
