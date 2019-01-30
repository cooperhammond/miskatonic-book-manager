import { Component } from 'react';

import FocusActions from '../../actions/FocusActions'

import FocusStore from '../../stores/FocusStore';

class FocusBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      itemType: null,
      showPopup: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.togglePopup = this.togglePopup.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
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
    var focusScope = FocusStore.getFocusScope();
    var itemType = FocusStore.getItemType();

    this.setState({
      displayName: displayName,
      focusScope: focusScope,
      itemType: itemType
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
}

export default FocusBox;
