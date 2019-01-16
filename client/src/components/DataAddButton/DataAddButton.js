import Base from './DataAddButtonBase';
import Render from './DataAddButtonRender';

export default class DataAddButton extends Base {

  render () {
    return Render.call(this, this.props, this.state);
  }
}
