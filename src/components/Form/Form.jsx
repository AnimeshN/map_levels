import React, { Component } from "react";
import csvJSON from "../../utils/csvJSON";

class Form extends Component {
  onChangeHandlerGeom = (event) => {
    const selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.props.getSelectedGeojson(JSON.parse(reader.result));
    };
    reader.readAsText(selectedfile);
  };

  onChangeHandlerData = (event) => {
    const selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // this.props.getSelectedGeojson(JSON.parse(reader.result));
      console.log(csvJSON(reader.result));
    };
    reader.readAsText(selectedfile);
  };

  render() {
    return (
      <React.Fragment>
        <input type="file" name="file" onChange={this.onChangeHandlerGeom} />
        <input type="file" name="file" onChange={this.onChangeHandlerData} />
      </React.Fragment>
    );
  }
}

export default Form;
