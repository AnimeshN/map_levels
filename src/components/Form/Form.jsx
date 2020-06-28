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
      this.props.getdata(csvJSON(reader.result));
    };
    reader.readAsText(selectedfile);
  };

  render() {
    return (
      <React.Fragment>
        <input type="file" name="file" onChange={this.onChangeHandlerGeom} />
        <input type="file" name="file" onChange={this.onChangeHandlerData} />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.onClickViz}
        >
          Vizualize
        </button>
      </React.Fragment>
    );
  }
}

export default Form;
