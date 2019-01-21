import Base from './PopupFormBase';
import Render from './PopupFormRender';

export default class PopupForm extends Base {

  render () {
    return Render.call(this, this.props, this.state);
  }
}
