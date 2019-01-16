import { Component } from 'react';
import FocusActions from '../../actions/FocusActions';

class DataAddButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      isHovered: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  handleClick() {

    var dataInfo = askDataQuestions(this.props.itemType);

    if (dataInfo) {
      FocusActions.addItem(this.props.itemType, dataInfo);
    }
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
}

export default DataAddButton;

function askDataQuestions(itemType) {
  var itemFields = {
    "student": ["name", "email"],
    "book": ["title", "author"],
    "code": ["book"],
  }[itemType.toLowerCase()];

  var itemAnswers = {};

  for (var i = 0; i < itemFields.length; i++) {
    var field = itemFields[i];
    var answer = askQuestion(`Enter ${field} of ${itemType}:`);
    if (answer) {
      itemAnswers[field] = answer;
    } else {
      return null;
    }
  }

  return itemAnswers;
}

function askQuestion(question) {
  var answer = prompt(question);
  if (answer === "") {
    return askQuestion("Please Answer the Question.\n" + question);
  } else if (answer === null) {
    return null;
  } else {
    return answer;
  }
}
