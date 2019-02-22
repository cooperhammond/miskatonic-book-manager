import { Component } from 'react';

import Render from './ReportButtonRender';

class ReportButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onClick() {
    var url = "http://localhost:3200/report/download";

    setTimeout(() => {
      const response = {
        file: url,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }

  onMouseDown() {
    this.setState({
      isPressed: true,
    });
  }

  onMouseUp() {
    this.setState({
      isPressed: false
    });
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default ReportButton;
