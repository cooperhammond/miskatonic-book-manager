'use strict';

import Base from './FocusButtonBase';
import Render from './FocusButtonRender';

export default class FocusButton extends Base {
  constructor (props) {
    super(props);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}
