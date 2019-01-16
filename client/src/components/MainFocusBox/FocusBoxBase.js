import { Component } from 'react';

import FocusStore from '../../stores/FocusStore';

class FocusButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      itemType: null,
      labels: [],
      rows: []
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    FocusStore.addChangeListener(this._onChange);
    this._onChange();
  }

  componentWillUnmount() {
    FocusStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    var displayName = FocusStore.getDisplayName().toUpperCase();
    var itemType = displayName.toLowerCase().slice(0, -1);
    var rawData = FocusStore.getFocusData();

    var labels = [];
    var accessors = [];
    var rows = [];

    if (displayName === "STUDENTS") {
      labels = ["Name", "Email", "Codes"];
      accessors = ["name", "email", "codes"];
    } else if (displayName === "BOOKS") {
      labels = ["Title", "Codes", "Readers"];
      accessors = ["title", "codes", "readers"];
    }

    if (rawData) {
      // Map the data from raw server info to elements
      for (var datum_i = 0; datum_i < rawData.length; datum_i++) {
        var datum = rawData[datum_i];
        var rowData = [];

        for (var i = 0; i < accessors.length; i++) {
          var accessor = accessors[i];

          if (typeof accessor === "string") {
            var element = datum[accessor];

            // Check if it's accessing an object, and rather than returning the object,
            // return the size of the object.
            if (typeof element === "object") {
              element = element.length;
            }

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
