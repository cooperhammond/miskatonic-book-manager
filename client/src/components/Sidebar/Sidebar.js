import Render from './SidebarRender';

import { Component } from 'react';

export default class Sidebar extends Component {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
