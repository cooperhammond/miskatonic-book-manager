import Render from './FocusTableRender';

import { Component } from 'react';

export default class FocusTable extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
