import Base from './DataDisplayTableBase';
import Render from './DataDisplayTableRender';

export default class DataDisplayTable extends Base {
  render () {
    return Render.call(this, this.props, this.state);
  }
}
