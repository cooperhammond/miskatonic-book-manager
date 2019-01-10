import Render from './FocusBoxRender';
import Base from './FocusBoxBase';

export default class MainFocusBox extends Base {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
