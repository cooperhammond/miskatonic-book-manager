import Render from './DataDisplayTableRender';
import { Component } from 'react';
import PropTypes from 'prop-types';

import FocusStore from '../../stores/FocusStore';
import DataStore from '../../stores/DataStore';

class DataDisplayTable extends Component {

  static propTypes = {
    onItemClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      rows: [],
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    DataStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
    DataStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    var scope = FocusStore.getFocusScope();
    var itemType = FocusStore.getItemType();

    var rawData;
    var labels = [];
    var accessors = [];
    var rows = [];

    if (scope === "general") {

      rawData = DataStore.getItems(itemType);

      if (itemType === "student") {
        labels = [
          "Name",
          "Email",
          "Books"
        ];
        accessors = [
          (d) => `${d["lastName"]}, ${d["firstName"]}`,
          "email",
          "codes"
        ];
      } else if (itemType === "book") {
        labels = [
          "Title",
          "Codes",
          "Readers"
        ];
        accessors = [
          "title",
          "codes",
          "readers"
        ];
      } else if (itemType === "code") {
        labels = [
          "Book",
          "Code",
          "User"
        ];
        accessors = [
          (d) => {
            var book = DataStore.getItemById("book", d.book);
            return book.title;
          },
          "code",
          (d) => {
            if (d.student) {
              var student = DataStore.getItemById("student", d.student);
              return `${student.lastName}, ${student.firstName}`;
            }
            return "None";
          }
        ]
        // TODO: figure out what to use for labels and accessors here
      }

    } else {

      rawData = FocusStore.getFocusItem();

      if (itemType === "student") {
        labels = [
          "Title",
          "Author"
        ];
        accessors = [
          "title",
          "author"
        ];
      } else if (itemType === "book") {
        labels = [
          "Name",
          "Email",
        ];
        accessors = [
          (d) => {
            var student = DataStore.getItemById(itemType, d._id);
            return `${student.lastName}, ${student.firstName}`;
          },
          (d) => DataStore.getItemById(itemType, d._id).email,
        ];
      } else if (itemType === "code") {
        // TODO: figure out what to use for labels and accessors here
      }
    }

    if (rawData && labels !== [] && accessors !== []) {
      // Map the data from raw server info to elements
      for (var datum_i = 0; datum_i < rawData.length; datum_i++) {
        var datum = rawData[datum_i];
        var rowData = [];

        for (var i = 0; i < accessors.length; i++) {
          var element;
          var accessor = accessors[i];

          if (typeof accessor === "string") {
            element = datum[accessor];
            if (typeof element === "object") {
              element = element.length;
            }
            rowData.push(element);
          } else if (typeof accessor === "function") {
            element = accessor(datum);
            rowData.push(element);
          }
        }

        rows.push(rowData);
      }
    }

    this.setState({
      labels: labels,
      rows: rows
    });
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default DataDisplayTable;
