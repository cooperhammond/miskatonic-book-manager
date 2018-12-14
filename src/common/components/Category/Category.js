'use strict';

import Base from './CategoryBase';
import Render from './CategoryRender';

export default class Category extends Base {
  constructor (props) {
    super(props);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}
