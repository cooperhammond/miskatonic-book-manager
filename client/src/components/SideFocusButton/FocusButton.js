import Base from './FocusButtonBase';
import Render from './FocusButtonRender';

export default class SideFocusButton extends Base {

  render () {
    return Render.call(this, this.props, this.state);
  }
}
