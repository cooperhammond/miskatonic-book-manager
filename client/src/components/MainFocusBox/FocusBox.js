import Render from './FocusBoxRender';

import { Component } from 'react';

import FocusActions from '../../actions/FocusActions'
import FocusStore from '../../stores/FocusStore';

class FocusBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
    };

    // Bind callback methods to make `this` the correct context.
    this.onItemClick = this.onItemClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  onItemClick (event) {
    var target = event.target;
    var index = target.dataset.index;
    var newScope = FocusStore.getItemType();

    // Switch to a specific view of the item itself
    FocusActions.changeView({
      newScope : newScope,
      itemType : FocusStore.getItemType(),
      itemIndex: index,
    });
  }

  _onChange() {
    var displayName = FocusStore.getDisplayTitle();

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

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default FocusBox;
