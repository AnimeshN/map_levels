import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  state = {
    uploadedGeojson: null,
  };
  onChangeHandler = (event) => {
    const uploadedGeojson = event.target.files[0];
    this.setState({ uploadedGeojson });
  };

  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.uploadedGeojson,
      this.state.uploadedGeojson.name
    );

    // Details of the uploaded file
    console.log(this.state.uploadedGeojson);

    // Request made to the backend api
    // Send formData object
    axios.post("/", formData).then((res) => {
      // then print response status
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <React.Fragment>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <div className="btn btn-primary" onClick={this.onFileUpload}>
          Upload
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
