import React, { Component } from "react";
import Form from "../../components/Form/Form";
import Map from "../../components/Map/Map";
import "./Layout.css";

class Layout extends Component {
  state = { selectedGeojson: null };
  getSelectedGeojson = (selectedGeojson) => {
    this.setState({ selectedGeojson });
  };
  render() {
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="grid-item">
            <Form getSelectedGeojson={this.getSelectedGeojson} />
          </div>
          <div className="grid-item">
            <Map geojson={this.state.selectedGeojson} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
