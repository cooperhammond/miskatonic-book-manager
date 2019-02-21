import Render from './DataDisplayTableRender';
import { Component } from 'react';
import PropTypes from 'prop-types';

import FocusStore from '../../stores/FocusStore';
import DataStore from '../../stores/DataStore';

import FocusActions from '../../actions/FocusActions';

class DataDisplayTable extends Component {

  static propTypes = {
    itemType: PropTypes.string,
    data: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      rows: [],
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  _onChange() {
    var itemType = this.props.itemType 
                  ? this.props.itemType
                  : FocusStore.getItemType();
    var rawData = this.props.data 
                  ? this.props.data 
                  : DataStore.getItems(itemType);

    var labels = [];
    var accessors = [];
    var rows = [];

    if (itemType === "student") {
      labels = [
        "Name",
        "Email",
        "Checked Out Books"
      ];
      accessors = [
        (d) => `${d["lastName"]}, ${d["firstName"]}`,
        "email",
        "codes"
      ];
    } else if (itemType === "book") {
      labels = [
        "Title",
        "Total Codes",
        "Total Readers"
      ];
      accessors = [
        "title",
        "codes",
        "readers"
      ];
    } else if (itemType === "code") {
      labels = [
        "Associated Book",
        "Checkout Code",
      ];
      if (!(this.props.itemType === "code" 
            && FocusStore.getItemType() === "student")) {      
        labels[2] = "User";
      }
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
    }
    
    if (rawData && labels !== [] && accessors !== []) {
      // Map the data from raw server info to elements
      for (var datum_i = 0; datum_i < rawData.length; datum_i++) {
        var datum = rawData[datum_i];
        var rowData = [];

        for (var i = 0; i < labels.length; i++) {
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

    if (this._mounted) {
      this.setState({
        labels: labels,
        rows: rows,
        itemType: itemType
      });
    }
  }

  onItemClick (event) {
    var target = event.target;

    var request = {
      newScope    : "update",
      newItemType : this.props.itemType 
                    ? this.props.itemType : 
                    FocusStore.getItemType(),
    };

    if (this.props.data) {
      request.itemId = target.dataset.index;
    } else {
      request.itemIndex = target.dataset.index;
    }

    // Switch to a specific view of the item itself
    FocusActions.changeView(request);
  }

  componentDidMount() {
    this._mounted = true;
    FocusStore.addChangeListener(this._onChange);
    DataStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    this._mounted = false;
    FocusStore.removeChangeListener(this._onChange);
    DataStore.removeChangeListener(this._onChange);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}

export default DataDisplayTable;
