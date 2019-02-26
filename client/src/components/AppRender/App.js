import Render from './AppRender';
import { Component } from 'react';

import FocusStore from '../../stores/FocusStore';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    var showPopup = FocusStore.showPopup();
    this.setState({
      showPopup: showPopup,
    });
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default App;