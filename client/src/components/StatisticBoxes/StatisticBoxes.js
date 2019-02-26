import { Component } from 'react';

import Render from './StatisticBoxesRender';

import DataStore from '../../stores/DataStore';

class StatisticBoxes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentsReading: 0,
      booksCheckedOut: 0,
      unusedCodes: 0,
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    var studentsReading = 0;
    var students = DataStore.getItems("student");
    for (let index = 0; index < students.length; index++) {      
      if (students[index].codes.length > 0) {
        studentsReading += 1;
      }
    }

    var booksCheckedOut = 0;
    var books = DataStore.getItems("book");
    for (let index = 0; index < books.length; index++) {
      booksCheckedOut += books[index].readers;
    }

    var unusedCodes = 0;
    var codes = DataStore.getItems("code");
    for (let index = 0; index < codes.length; index++) {
      if (!codes[index].student) {
        unusedCodes += 1;
      }
    }

    this.setState({
      studentsReading: studentsReading,
      booksCheckedOut: booksCheckedOut,
      unusedCodes: unusedCodes
    });
  }

  componentDidMount() {
    DataStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount(){
    DataStore.removeChangeListener(this._onChange);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default StatisticBoxes;
