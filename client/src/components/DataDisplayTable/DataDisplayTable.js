import { Component } from 'react';
import Render from './DataDisplayTableRender';

export default class DataDisplayTable extends Component {

  render () {
    return Render.call(this, this.props, this.state);
  }
}
