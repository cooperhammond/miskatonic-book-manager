import { Component } from 'react';

import FocusStore from '../../stores/FocusStore';
import DataStore from '../../stores/DataStore';

class FocusButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      itemType: null,
      labels: [],
      rows: [],
      showPopup: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.togglePopup = this.togglePopup.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    DataStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
    DataStore.addChangeListener(this._onChange);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  _onChange() {
    var displayName = FocusStore.getDisplayTitle();
    var itemType = FocusStore.getItemType();
    var rawData = DataStore.getItems(itemType);

    var labels = [];
    var accessors = [];
    var rows = [];

    if (itemType === "student") {
      labels = [
        "Name",
        "Email",
        "Codes"
      ];
      accessors = [
        (d) => `${d["lastName"]}, ${d["firstName"]}`,
        "email",
        "codes"];
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
      // TODO: figure out what to use for labels and accessors here
    }

    if (rawData) {
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
      displayName: displayName,
      itemType: itemType,
      labels: labels,
      rows: rows
    });
  }
}

export default FocusButton;
