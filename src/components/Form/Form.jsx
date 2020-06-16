import React, { Component } from "react";

class Form extends Component {
  onChangeHandler = (event) => {
    const selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.props.getSelectedGeojson(reader.result);
    };
    reader.readAsText(selectedfile);
  };

  render() {
    return (
      <React.Fragment>
        <input type="file" name="file" onChange={this.onChangeHandler} />
      </React.Fragment>
    );
  }
}

export default Form;
