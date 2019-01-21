import Base from './StandardButtonBase';
import Render from './StandardButtonRender';

export default class StandardButton extends Base {

  render () {
    return Render.call(this, this.props, this.state);
  }
}
